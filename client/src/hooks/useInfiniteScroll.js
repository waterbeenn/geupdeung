import { useEffect, useRef } from 'react';

export const useInfiniteScroll = ({ onLoadMore, hasMore, loading }) => {
    const sentinelRef = useRef(null);

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
