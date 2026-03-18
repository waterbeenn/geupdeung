import axios from 'axios';

export const fetchNews = async ({ query, display, start }) => {
    const response = await axios.get('/api/news', {
        params: {
            query,
            display,
            start,
        },
    });

    return response.data;
};
