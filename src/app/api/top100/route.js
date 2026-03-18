import { NextResponse } from 'next/server';
import { fetchTop100Stocks } from '../../../lib/server/top100Service';

const parseLimit = (value) => {
    const parsed = Number.parseInt(value || '100', 10);
    if (!Number.isFinite(parsed)) {
        return 100;
    }

    return Math.min(Math.max(parsed, 1), 100);
};

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams.get('limit'));

    try {
        const data = await fetchTop100Stocks(limit);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Top100 데이터 fetch 실패:', error);
        return NextResponse.json(
            { error: '급등주 데이터를 불러오지 못했습니다.' },
            { status: 500 }
        );
    }
}
