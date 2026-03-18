import { NextResponse } from 'next/server';
import { getLatestTradingDay } from '../../../lib/server/marketCalendar';

export async function GET() {
    try {
        const tradingDay = await getLatestTradingDay();
        return NextResponse.json({ tradingDay });
    } catch (error) {
        console.error('거래일 계산 실패:', error);
        return NextResponse.json(
            { error: '최신 거래일을 계산하지 못했습니다.' },
            { status: 500 }
        );
    }
}
