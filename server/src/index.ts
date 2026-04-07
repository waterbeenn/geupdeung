import { config } from 'dotenv';
import { resolve, join } from 'path';
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

// 정적 파일 제공 (클라이언트 빌드 폴더)
const clientDistPath = join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath, {
    maxAge: '1d',
    etag: false,
}));

app.use('/api/news', newsRouter);
app.use('/api/top100', top100Router);
app.use('/api/trading-day', tradingDayRouter);
app.use('/api/market-index', marketIndexRouter);

// SPA fallback: 매칭되지 않은 경로는 index.html로
app.get('*', (req, res) => {
    res.sendFile(join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT}`);
});
