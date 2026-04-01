import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';

const CACHE_KEY = 'swr_top100';

const readCache = () => {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const writeCache = (data) => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {}
};

export const useTop100Stocks = (limit = 100) => {
    const cached = readCache();

    const [items, setItems] = useState(cached?.items || []);
    const [tradingDay, setTradingDay] = useState(cached?.tradingDay || '');
    const [loading, setLoading] = useState(!cached);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const fetchTop100 = async () => {
            if (!readCache()) setLoading(true);
            setError(null);

            try {
                const response = await axios.get('/api/top100', { params: { limit } });
                if (!isMounted) return;

                const fresh = {
                    items: response.data.items || [],
                    tradingDay: response.data.tradingDay || '',
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
