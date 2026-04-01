const NAMED_HTML_ENTITIES = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
};

export const decodeHtmlEntities = (value = '') =>
    value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, code) => {
        const normalizedCode = code.toLowerCase();
        const decodeCodePoint = (parsed) => {
            if (!Number.isInteger(parsed) || parsed < 0 || parsed > 0x10ffff) {
                return entity;
            }

            try {
                return String.fromCodePoint(parsed);
            } catch {
                return entity;
            }
        };

        if (normalizedCode.startsWith('#x')) {
            return decodeCodePoint(Number.parseInt(normalizedCode.slice(2), 16));
        }

        if (normalizedCode.startsWith('#')) {
            return decodeCodePoint(Number.parseInt(normalizedCode.slice(1), 10));
        }

        return NAMED_HTML_ENTITIES[normalizedCode] ?? entity;
    });

export const stripHtmlTags = (value = '') => decodeHtmlEntities(value.replace(/<[^>]*>/g, '')).trim();

const toTimestamp = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

export const normalizeNewsItems = (items = []) => {
    const sorted = [...items]
        .map((item) => ({
            link: item.link,
            originallink: item.originallink,
            title: stripHtmlTags(item.title),
            description: stripHtmlTags(item.description),
            pubDate: item.pubDate,
            pubDateTimestamp: toTimestamp(item.pubDate),
        }))
        .sort((left, right) => right.pubDateTimestamp - left.pubDateTimestamp);

    return Array.from(new Map(sorted.map((item) => [item.link, item])).values());
};
