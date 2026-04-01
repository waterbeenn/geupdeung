import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import type { UseInfiniteScrollParams } from '../types';

export const useInfiniteScroll = ({ onLoadMore, hasMore, loading }: UseInfiniteScrollParams): RefObject<HTMLDivElement | null> => {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasMore || loading) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        const el = sentinelRef.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [hasMore, loading, onLoadMore]);

    return sentinelRef;
};
