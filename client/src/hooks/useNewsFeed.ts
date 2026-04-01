import { useCallback, useEffect, useState } from 'react';
import { fetchNews } from '../lib/news/fetchNews';
import { filterNewsItems } from '../lib/news/filterNews';
import type { NewsItem, NewsCategory, UseNewsFeedParams, UseNewsFeedReturn } from '../types';

const createQueryCategory = (forcedQuery: string | null | undefined, activeCategory: NewsCategory): NewsCategory =>
    forcedQuery ? { name: forcedQuery, query: forcedQuery } : activeCategory;

const readCache = (key: string): NewsItem[] | null => {
    try {
        const raw = sessionStorage.getItem(key);
        return raw ? (JSON.parse(raw) as NewsItem[]) : null;
    } catch {
        return null;
    }
};

const writeCache = (key: string, data: NewsItem[]): void => {
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
    } catch {}
};

export const useNewsFeed = ({
    activeCategory,
    forcedQuery,
    initialDisplay = 12,
    isFullPage = false,
    limit,
}: UseNewsFeedParams): UseNewsFeedReturn => {
    const pageSize = isFullPage ? initialDisplay : limit ?? initialDisplay;
    const cacheKey = `swr_news_${forcedQuery ?? activeCategory?.name ?? ''}`;
    const cached = readCache(cacheKey);

    const [news, setNews] = useState<NewsItem[]>(cached ?? []);
    const [start, setStart] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(!cached);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [retryCount, setRetryCount] = useState<number>(0);

    const loadNews = useCallback(
        async (nextStart: number, shouldAppend: boolean): Promise<void> => {
            const category = createQueryCategory(forcedQuery, activeCategory);
            if (shouldAppend) {
                setLoadingMore(true);
            } else {
                if (!readCache(cacheKey)) setLoading(true);
            }
            setError(null);

            try {
                const data = await fetchNews({
                    query: category.query,
                    display: pageSize,
                    start: nextStart,
                });

                const filteredItems = filterNewsItems(data.items ?? [], category);

                setNews((prev) => {
                    const combined = shouldAppend ? [...prev, ...filteredItems] : filteredItems;
                    const unique = Array.from(
                        new Map(combined.map((item) => [item.link, item])).values()
                    );
                    const result = isFullPage ? unique : unique.slice(0, limit ?? initialDisplay);
                    if (!shouldAppend) writeCache(cacheKey, result);
                    return result;
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
        [activeCategory, cacheKey, forcedQuery, initialDisplay, isFullPage, limit, pageSize]
    );

    useEffect(() => {
        setNews(readCache(cacheKey) ?? []);
        setStart(1);
        setHasMore(false);
        loadNews(1, false);
    }, [loadNews, retryCount]);

    const loadMore = useCallback((): void => {
        if (loadingMore || !hasMore) return;
        loadNews(start + pageSize, true);
    }, [hasMore, loadNews, loadingMore, pageSize, start]);

    const retry = useCallback(() => setRetryCount((c) => c + 1), []);

    return { news, loading, loadingMore, error, hasMore, loadMore, retry };
};
