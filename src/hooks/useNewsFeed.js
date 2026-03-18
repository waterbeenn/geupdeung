'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchNews } from '../lib/news/fetchNews';
import { filterNewsItems } from '../lib/news/filterNews';

const createQueryCategory = (forcedQuery, activeCategory) =>
    forcedQuery ? { name: forcedQuery, query: forcedQuery } : activeCategory;

export const useNewsFeed = ({
    activeCategory,
    forcedQuery,
    initialDisplay = 12,
    isFullPage = false,
    limit,
}) => {
    const pageSize = isFullPage ? initialDisplay : limit || initialDisplay;
    const [news, setNews] = useState([]);
    const [start, setStart] = useState(1);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(false);

    const loadNews = useCallback(
        async (nextStart, shouldAppend) => {
            const category = createQueryCategory(forcedQuery, activeCategory);

            if (shouldAppend) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            setError(null);

            try {
                const data = await fetchNews({
                    query: category.query,
                    display: pageSize,
                    start: nextStart,
                });

                const filteredItems = filterNewsItems(data.items || [], category);

                setNews((previousItems) => {
                    const combined = shouldAppend ? [...previousItems, ...filteredItems] : filteredItems;
                    const uniqueItems = Array.from(
                        new Map(combined.map((item) => [item.link, item])).values()
                    );

                    if (isFullPage) {
                        return uniqueItems;
                    }

                    return uniqueItems.slice(0, limit || initialDisplay);
                });

                setHasMore(Boolean(data.hasMore) && filteredItems.length > 0);
                setStart(nextStart);
            } catch {
                setError('뉴스를 불러오는 중 문제가 발생했습니다.');
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        [activeCategory, forcedQuery, initialDisplay, isFullPage, limit, pageSize]
    );

    useEffect(() => {
        setNews([]);
        setStart(1);
        setHasMore(false);
        loadNews(1, false);
    }, [loadNews]);

    const loadMore = useCallback(() => {
        if (loadingMore || !hasMore) {
            return;
        }

        const nextStart = start + pageSize;
        loadNews(nextStart, true);
    }, [hasMore, loadNews, loadingMore, pageSize, start]);

    return {
        news,
        loading,
        loadingMore,
        error,
        hasMore,
        loadMore,
    };
};
