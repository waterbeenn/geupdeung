import { STOCK_API_ENDPOINTS } from './serviceKeys';

export const getTopGainers = () => {
    const rows = 200;
    const FltRt = 5;
    const today = new Date(Date.now() - 86400000).toISOString().slice(0, 10).replace(/-/g, '');
    console.log(today);
    return `${STOCK_API_ENDPOINTS.GET_PRICE_INFO}&numOfRows=${rows}&beginFltRt=${FltRt}&basDt=${today}&resultType=json`;
};
