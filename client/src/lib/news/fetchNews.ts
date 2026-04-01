import axios from 'axios';
import type { FetchNewsParams, NewsApiResponse } from '../../types';

export const fetchNews = async ({ query, display, start }: FetchNewsParams): Promise<NewsApiResponse> => {
    const response = await axios.get<NewsApiResponse>('/api/news', {
        params: {
            query,
            display,
            start,
        },
    });

    return response.data;
};
