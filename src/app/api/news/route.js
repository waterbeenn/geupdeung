import { NextResponse } from 'next/server';
import axios from 'axios';
import { normalizeNewsItems } from '../../../lib/news/normalizeNews';

const parsePositiveNumber = (value, fallback, max) => {
    const parsed = Number.parseInt(value || `${fallback}`, 10);

    if (!Number.isFinite(parsed) || parsed < 1) {
        return fallback;
    }

    return Math.min(parsed, max);
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '경제';
    const display = parsePositiveNumber(searchParams.get('display'), 12, 100);
    const start = parsePositiveNumber(searchParams.get('start'), 1, 1000);

    try {
        const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
            params: {
                query,
                display,
                start,
                sort: 'date',
            },
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
            },
            timeout: 10000,
        });

        const total = Number(response.data.total || 0);
        const items = normalizeNewsItems(response.data.items || []);

        return NextResponse.json({
            query,
            total,
            start,
            display,
            hasMore: start + display <= Math.min(total, 1000),
            items,
        });
    } catch (error) {
        console.error('뉴스 데이터 fetch 실패:', error);
        return NextResponse.json({ error: '뉴스 로드 실패' }, { status: 500 });
    }
}
