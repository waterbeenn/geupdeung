import axios from 'axios';
import { getEnvValue } from './env';

const holidayMonthCache = new Map();

const getHolidayApiBaseUrl = () =>
    getEnvValue('HOLIDAY_API_BASE_URL', 'NEXT_PUBLIC_HOLIDAY_API_BASE_URL');

const getServiceKey = () =>
    getEnvValue('STOCK_SERVICE_KEY', 'NEXT_PUBLIC_STOCK_SERVICE_KEY');

export const formatTradingDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
};

const getMonthHolidays = async (year, month) => {
    const cacheKey = `${year}${month}`;
    if (holidayMonthCache.has(cacheKey)) {
        return holidayMonthCache.get(cacheKey);
    }

    const response = await axios.get(`${getHolidayApiBaseUrl()}/getRestDeInfo`, {
        params: {
            serviceKey: getServiceKey(),
            solYear: year,
            solMonth: month,
            _type: 'json',
            numOfRows: 100,
        },
        timeout: 10000,
    });

    const rawItems = response.data.response?.body?.items?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];
    const holidays = new Set(items.map((item) => String(item.locdate)));

    holidayMonthCache.set(cacheKey, holidays);
    return holidays;
};

export const isHoliday = async (date) => {
    const dateString = typeof date === 'string' ? date : formatTradingDate(date);
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const holidays = await getMonthHolidays(year, month);
    return holidays.has(dateString);
};

export const getLatestTradingDay = async (referenceDate = new Date()) => {
    const target = new Date(referenceDate);
    target.setDate(target.getDate() - 1);

    while (true) {
        const isWeekend = target.getDay() === 0 || target.getDay() === 6;

        if (isWeekend) {
            target.setDate(target.getDate() - 1);
            continue;
        }

        const tradingDay = formatTradingDate(target);
        if (await isHoliday(tradingDay)) {
            target.setDate(target.getDate() - 1);
            continue;
        }

        return tradingDay;
    }
};
