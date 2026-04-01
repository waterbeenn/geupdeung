import axios from 'axios';
import { getEnvValue } from './env';
import { getLatestTradingDay } from './marketCalendar';

const getIndexApiBaseUrl = () => {
    const stockUrl = getEnvValue('STOCK_API_BASE_URL', 'NEXT_PUBLIC_STOCK_API_BASE_URL');
    return stockUrl.replace('GetStockSecuritiesInfoService', 'GetMarketIndexInfoService');
};

const getServiceKey = () =>
    getEnvValue('STOCK_SERVICE_KEY', 'NEXT_PUBLIC_STOCK_SERVICE_KEY');

const normalizeIndex = (item) => ({
    name: item.idxNm?.trim(),
    value: parseFloat(item.clpr).toLocaleString('ko-KR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }),
    vs: parseFloat(item.vs || 0).toFixed(2),
    fltRt: parseFloat(item.fltRt || 0).toFixed(2),
    isUp: parseFloat(item.fltRt || 0) >= 0,
});

const fetchIndexByName = async (baseUrl, serviceKey, basDt, idxNm) => {
    const url = new URL(`${baseUrl}/getStockMarketIndex`);
    url.search = new URLSearchParams({
        serviceKey,
        basDt,
        idxNm,
        numOfRows: '5',
        resultType: 'json',
    }).toString();

    console.log(`[indexService] requesting ${idxNm}:`, url.toString());

    const response = await axios.get(url.toString(), { timeout: 10000 });
    const rawItems = response.data.response?.body?.items?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    console.log(`[indexService] ${idxNm} 응답 idxNm 목록:`, items.map((i) => JSON.stringify(i.idxNm)));

    return (
        items.find((i) => i.idxNm?.trim() === idxNm) ||
        items.find((i) => i.idxNm?.trim().includes(idxNm)) ||
        null
    );
};

export const fetchMarketIndex = async () => {
    const tradingDay = await getLatestTradingDay();
    const baseUrl = getIndexApiBaseUrl();
    const serviceKey = getServiceKey();

    console.log('[indexService] fetching KOSPI + KOSDAQ for:', tradingDay);

    const [kospiRaw, kosdaqRaw] = await Promise.all([
        fetchIndexByName(baseUrl, serviceKey, tradingDay, '코스피'),
        fetchIndexByName(baseUrl, serviceKey, tradingDay, '코스닥'),
    ]);

    console.log('[indexService] kospi raw idxNm:', kospiRaw?.idxNm ?? 'null');
    console.log('[indexService] kosdaq raw idxNm:', kosdaqRaw?.idxNm ?? 'null');

    return {
        tradingDay,
        kospi: kospiRaw ? normalizeIndex(kospiRaw) : null,
        kosdaq: kosdaqRaw ? normalizeIndex(kosdaqRaw) : null,
    };
};
