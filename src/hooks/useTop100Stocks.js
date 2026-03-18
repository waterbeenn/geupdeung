'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTop100Stocks = (limit = 100) => {
    const [items, setItems] = useState([]);
    const [tradingDay, setTradingDay] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchTop100 = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('/api/top100', {
                    params: {
                        limit,
                    },
                });

                if (!isMounted) {
                    return;
                }

                setItems(response.data.items || []);
                setTradingDay(response.data.tradingDay || '');
            } catch {
                if (!isMounted) {
                    return;
                }

                setError('급등주 데이터를 불러오지 못했습니다.');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchTop100();

        return () => {
            isMounted = false;
        };
    }, [limit]);

    return {
        items,
        tradingDay,
        loading,
        error,
    };
};
