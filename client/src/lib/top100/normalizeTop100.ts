import type { RawTop100Item, Top100Item } from '../../types';

const toNumber = (value: string | number): number => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

export const normalizeTop100Items = (items: RawTop100Item[] = []): Top100Item[] =>
    [...items]
        .sort((left, right) => toNumber(right.fltRt) - toNumber(left.fltRt))
        .map((item, index) => {
            const percent = toNumber(item.fltRt);
            const change = toNumber(item.vs);
            const price = toNumber(item.clpr);

            return {
                rank: index + 1,
                name: item.itmsNm,
                code: item.srtnCd,
                price,
                priceText: price.toLocaleString('ko-KR'),
                change,
                changeText: Math.abs(change).toLocaleString('ko-KR'),
                percent,
                percentText: percent.toFixed(2),
                isUp: percent > 0,
            };
        });
