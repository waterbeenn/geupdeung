import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../.env') });
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import newsRouter from './routes/news';
import top100Router from './routes/top100';
import tradingDayRouter from './routes/tradingDay';
import marketIndexRouter from './routes/marketIndex';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
}));

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.' },
});
app.use(globalLimiter);

app.use(express.json());

app.use('/api/news', newsRouter);
app.use('/api/top100', top100Router);
app.use('/api/trading-day', tradingDayRouter);
app.use('/api/market-index', marketIndexRouter);

app.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT}`);
});
