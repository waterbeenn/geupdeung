import { Router, Request, Response } from 'express';
import { getLatestTradingDay } from '../lib/server/marketCalendar';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const tradingDay = await getLatestTradingDay();
        res.json({ tradingDay });
    } catch (error) {
        console.error('거래일 계산 실패:', error);
        res.status(500).json({ error: '최신 거래일을 계산하지 못했습니다.' });
    }
});

export default router;
