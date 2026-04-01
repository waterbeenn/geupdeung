import { stripHtmlTags } from './normalizeNews';

const normalizeToken = (value) => value.replace('/', ' ').replace(/\+/g, ' ').trim().toLowerCase();

export const filterNewsItems = (items = [], category) => {
    if (!category || category.name === '전체') {
        return items;
    }

    const tokens = [category.name, ...category.query.split(' ')]
        .map(normalizeToken)
        .filter(Boolean);

    return items.filter((item) => {
        const content = `${stripHtmlTags(item.title)} ${stripHtmlTags(item.description)}`.toLowerCase();
        return tokens.some((token) => content.includes(token));
    });
};
