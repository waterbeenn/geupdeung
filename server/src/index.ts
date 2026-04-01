import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(__dirname, '../../.env') });
import express from 'express';
import cors from 'cors';
import newsRouter from './routes/news';
import top100Router from './routes/top100';
import tradingDayRouter from './routes/tradingDay';
import marketIndexRouter from './routes/marketIndex';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/news', newsRouter);
app.use('/api/top100', top100Router);
app.use('/api/trading-day', tradingDayRouter);
app.use('/api/market-index', marketIndexRouter);

app.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT}`);
});
