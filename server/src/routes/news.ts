import { Router, Request, Response } from 'express';
import axios from 'axios';
import { normalizeNewsItems } from '../lib/news/normalizeNews';
import { cache, TTL } from '../lib/cache';

const router = Router();

const parsePositiveNumber = (value: string | undefined, fallback: number, max: number): number => {
    const parsed = Number.parseInt(value || `${fallback}`, 10);
    if (!Number.isFinite(parsed) || parsed < 1) return fallback;
    return Math.min(parsed, max);
};

router.get('/', async (req: Request, res: Response) => {
    const query = (req.query.query as string) || '경제';
    const display = parsePositiveNumber(req.query.display as string, 12, 100);
    const start = parsePositiveNumber(req.query.start as string, 1, 1000);
    const cacheKey = `news:${query}:${start}:${display}`;

    const cached = cache.get(cacheKey);
    if (cached) {
        return res.json(cached);
    }

    try {
        const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
            params: { query, display, start, sort: 'date' },
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
            },
            timeout: 10000,
        });

        const total = Number(response.data.total || 0);
        const items = normalizeNewsItems(response.data.items || []);
        const data = {
            query,
            total,
            start,
            display,
            hasMore: start + display <= Math.min(total, 1000),
            items,
        };

        cache.set(cacheKey, data, TTL.NEWS);
        res.json(data);
    } catch (error) {
        console.error('뉴스 데이터 fetch 실패:', error);
        res.status(500).json({ error: '뉴스 로드 실패' });
    }
});

export default router;
