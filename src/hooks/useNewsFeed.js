'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNews } from '../lib/news/fetchNews';
import { filterNewsItems } from '../lib/news/filterNews';

const createQueryCategory = (forcedQuery, activeCategory) =>
    forcedQuery ? { name: forcedQuery, query: forcedQuery } : activeCategory;

const dedupeByLink = (items) => Array.from(new Map(items.map((item) => [item.link, item])).values());

export const useNewsFeed = ({
    activeCategory,
    forcedQuery,
    initialDisplay = 12,
    isFullPage = false,
    limit,
}) => {
    const pageSize = isFullPage ? initialDisplay : limit || initialDisplay;
    const category = createQueryCategory(forcedQuery, activeCategory);

    const { data, status, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['news', category.name, category.query, pageSize],
        queryFn: ({ pageParam }) => fetchNews({ query: category.query, display: pageSize, start: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const filteredCount = filterNewsItems(lastPage.items || [], category).length;
            if (!lastPage.hasMore || filteredCount === 0) {
                return undefined;
            }

            return lastPage.start + pageSize;
        },
    });

    const uniqueItems = data
        ? dedupeByLink(data.pages.flatMap((page) => filterNewsItems(page.items || [], category)))
        : [];
    const news = isFullPage ? uniqueItems : uniqueItems.slice(0, pageSize);

    return {
        news,
        loading: status === 'pending',
        loadingMore: isFetchingNextPage,
        error: status === 'error' ? '뉴스를 불러오는 중 문제가 발생했습니다.' : null,
        hasMore: Boolean(hasNextPage),
        loadMore: fetchNextPage,
    };
};
