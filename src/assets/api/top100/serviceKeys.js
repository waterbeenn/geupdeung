const BASE_URL = import.meta.env.VITE_STOCK_API_BASE_URL;
const SERVICE_KEY = import.meta.env.VITE_STOCK_SERVICE_KEY;

export const STOCK_API_ENDPOINTS = {
    // 주식 시세 정보
    GET_PRICE_INFO: `${BASE_URL}/getStockPriceInfo?serviceKey=${SERVICE_KEY}`,
    // 주식 발행 정보
    GET_ISSUE_INFO: `${BASE_URL}/getStockIssueInfo?serviceKey=${SERVICE_KEY}`,
};
