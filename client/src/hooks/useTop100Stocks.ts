import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import type { Top100Item, UseTop100StocksReturn } from '../types';

const CACHE_KEY = 'swr_top100';

interface CacheData {
    items: Top100Item[];
    tradingDay: string;
}

const readCache = (): CacheData | null => {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        return raw ? (JSON.parse(raw) as CacheData) : null;
    } catch {
        return null;
    }
};

const writeCache = (data: CacheData): void => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {}
};

export const useTop100Stocks = (limit = 100): UseTop100StocksReturn => {
    const cached = readCache();

    const [items, setItems] = useState<Top100Item[]>(cached?.items ?? []);
    const [tradingDay, setTradingDay] = useState<string>(cached?.tradingDay ?? '');
    const [loading, setLoading] = useState<boolean>(!cached);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState<number>(0);

    useEffect(() => {
        let isMounted = true;

        const fetchTop100 = async (): Promise<void> => {
            if (!readCache()) setLoading(true);
            setError(null);

            try {
                const response = await axios.get<{ items: Top100Item[]; tradingDay: string }>('/api/top100', { params: { limit } });
                if (!isMounted) return;

                const fresh: CacheData = {
                    items: response.data.items ?? [],
                    tradingDay: response.data.tradingDay ?? '',
                };
                setItems(fresh.items);
                setTradingDay(fresh.tradingDay);
                writeCache(fresh);
            } catch {
                if (!isMounted) return;
                if (!readCache()) setError('급등주 데이터를 불러오지 못했습니다.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchTop100();
        return () => { isMounted = false; };
    }, [limit, retryCount]);

    const retry = useCallback(() => setRetryCount((c) => c + 1), []);

    return { items, tradingDay, loading, error, retry };
};
