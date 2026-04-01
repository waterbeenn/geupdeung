import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const CACHE_KEY = 'swr_market_index';

const readCache = () => {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const writeCache = (data) => {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {}
};

export const useMarketIndex = () => {
    const cached = readCache();

    const [kospi, setKospi] = useState(cached?.kospi || null);
    const [kosdaq, setKosdaq] = useState(cached?.kosdaq || null);
    const [tradingDay, setTradingDay] = useState(cached?.tradingDay || null);
    const [loading, setLoading] = useState(!cached);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const fetchIndex = async () => {
            setError(null);
            if (!readCache()) setLoading(true);

            try {
                const { data } = await axios.get('/api/market-index');
                if (!isMounted) return;

                setKospi(data.kospi);
                setKosdaq(data.kosdaq);
                setTradingDay(data.tradingDay);
                writeCache(data);
            } catch {
                if (!isMounted) return;
                setError('시장 지수를 불러오지 못했습니다.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchIndex();

        return () => {
            isMounted = false;
        };
    }, [retryCount]);

    const retry = useCallback(() => setRetryCount((c) => c + 1), []);

    return { kospi, kosdaq, tradingDay, loading, error, retry };
};
