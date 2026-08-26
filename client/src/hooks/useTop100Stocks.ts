import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { Top100Item, UseTop100StocksReturn } from '../types';

interface Top100Response {
    items: Top100Item[];
    tradingDay: string;
}

const fetchTop100 = async (limit: number): Promise<Top100Response> => {
    const response = await axios.get<Top100Response>('/api/top100', { params: { limit } });
    return {
        items: response.data.items ?? [],
        tradingDay: response.data.tradingDay ?? '',
    };
};

export const useTop100Stocks = (limit = 100): UseTop100StocksReturn => {
    const { data, status, refetch } = useQuery({
        queryKey: ['top100', limit],
        queryFn: () => fetchTop100(limit),
    });

    return {
        items: data?.items ?? [],
        tradingDay: data?.tradingDay ?? '',
        loading: status === 'pending',
        error: status === 'error' ? '급등주 데이터를 불러오지 못했습니다.' : null,
        retry: () => {
            refetch();
        },
    };
};
