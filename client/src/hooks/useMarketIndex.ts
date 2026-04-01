import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import type { MarketIndexData, UseMarketIndexReturn } from '../types';

const CACHE_KEY = 'swr_market_index';

interface CacheData {
    kospi: MarketIndexData | null;
    kosdaq: MarketIndexData | null;
    tradingDay: string | null;
}

const readCache = (): CacheData | null => {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        return raw ? (JSON.parse(raw) as CacheData) : null;
    } catch {
        return null;
    }
};

const writeCache = (data: CacheData): void => {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {}
};

export const useMarketIndex = (): UseMarketIndexReturn => {
    const cached = readCache();

    const [kospi, setKospi] = useState<MarketIndexData | null>(cached?.kospi ?? null);
    const [kosdaq, setKosdaq] = useState<MarketIndexData | null>(cached?.kosdaq ?? null);
    const [tradingDay, setTradingDay] = useState<string | null>(cached?.tradingDay ?? null);
    const [loading, setLoading] = useState<boolean>(!cached);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState<number>(0);

    useEffect(() => {
        let isMounted = true;

        const fetchIndex = async (): Promise<void> => {
            setError(null);
            if (!readCache()) setLoading(true);

            try {
                const { data } = await axios.get<CacheData>('/api/market-index');
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
