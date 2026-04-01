import { Router, Request, Response } from 'express';
import { fetchMarketIndex } from '../lib/server/indexService';
import { cache, TTL } from '../lib/cache';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const cacheKey = 'market-index';

    const cached = cache.get(cacheKey);
    if (cached) {
        return res.json(cached);
    }

    try {
        const data = await fetchMarketIndex();
        cache.set(cacheKey, data, TTL.TOP100);
        res.json(data);
    } catch (error) {
        console.error('시장 지수 fetch 실패:', error);
        res.status(500).json({ error: '시장 지수 데이터를 불러오지 못했습니다.' });
    }
});

export default router;
