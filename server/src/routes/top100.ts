import { Router, Request, Response } from 'express';
import { fetchTop100Stocks } from '../lib/server/top100Service';
import { cache, TTL } from '../lib/cache';

const router = Router();

const parseLimit = (value: string | undefined): number => {
    const parsed = Number.parseInt(value || '100', 10);
    if (!Number.isFinite(parsed)) return 100;
    return Math.min(Math.max(parsed, 1), 100);
};

router.get('/', async (req: Request, res: Response) => {
    const limit = parseLimit(req.query.limit as string);
    const cacheKey = `top100:${limit}`;

    const cached = cache.get(cacheKey);
    if (cached) {
        return res.json(cached);
    }

    try {
        const data = await fetchTop100Stocks(limit);
        cache.set(cacheKey, data, TTL.TOP100);
        res.json(data);
    } catch (error) {
        console.error('Top100 데이터 fetch 실패:', error);
        res.status(500).json({ error: '급등주 데이터를 불러오지 못했습니다.' });
    }
});

export default router;
