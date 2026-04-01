import axios from "axios";
import { normalizeTop100Items } from "../top100/normalizeTop100";
import { getEnvValue } from "./env";
import { getLatestTradingDay } from "./marketCalendar";

const getStockApiBaseUrl = () =>
  getEnvValue("STOCK_API_BASE_URL", "NEXT_PUBLIC_STOCK_API_BASE_URL");

const getServiceKey = () =>
  getEnvValue("STOCK_SERVICE_KEY", "NEXT_PUBLIC_STOCK_SERVICE_KEY");

export const fetchTop100Stocks = async (limit = 100) => {
  const tradingDay = await getLatestTradingDay();
  const requestUrl = new URL(`${getStockApiBaseUrl()}/getStockPriceInfo`);
  requestUrl.search = new URLSearchParams({
    serviceKey: getServiceKey(),
    numOfRows: "200",
    beginFltRt: "5",
    basDt: tradingDay,
    resultType: "json",
  }).toString();

  const response = await axios.get(
    requestUrl.toString(),
    {
      timeout: 10000,
    },
  );

  const rawItems = response.data.response?.body?.items?.item;
  const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];
  const normalizedItems = normalizeTop100Items(items).slice(0, limit);

  return {
    tradingDay,
    items: normalizedItems,
    total: normalizedItems.length,
  };
};
