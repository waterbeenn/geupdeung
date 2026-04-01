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

    const response = await axios.get(url.toString(), { timeout: 10000 });
    const rawItems = response.data.response?.body?.items?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

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

    const [kospiRaw, kosdaqRaw] = await Promise.all([
        fetchIndexByName(baseUrl, serviceKey, tradingDay, '코스피'),
        fetchIndexByName(baseUrl, serviceKey, tradingDay, '코스닥'),
    ]);

    return {
        tradingDay,
        kospi: kospiRaw ? normalizeIndex(kospiRaw) : null,
        kosdaq: kosdaqRaw ? normalizeIndex(kosdaqRaw) : null,
    };
};
