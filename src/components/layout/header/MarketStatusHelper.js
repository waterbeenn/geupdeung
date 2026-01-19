// 시장 상태를 판별하는 함수
export const getMarketStatus = () => {
    const now = new Date();

    // 1. 한국 시장 상태 (KST: UTC+9)
    const korTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Seoul',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'short',
    })
        .formatToParts(now)
        .reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});

    const korHour = parseInt(korTime.hour);
    const korMinute = parseInt(korTime.minute);
    const isKorWeekend = ['Sat', 'Sun'].includes(korTime.weekday);

    let korStatus = '국내 장 마감';
    if (!isKorWeekend) {
        const totalMinutes = korHour * 60 + korMinute;
        if (totalMinutes >= 540 && totalMinutes < 930)
            korStatus = '국내 장 개장 중'; // 09:00 ~ 15:30
        else if (totalMinutes < 540) korStatus = '국내 장 개장 전';
    }

    // 2. 미국 시장 상태 (EST/EDT: New York)
    // 서머타임은 Intl API가 자동으로 계산해줍니다.
    const usaTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'short',
    })
        .formatToParts(now)
        .reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});

    const usaHour = parseInt(usaTime.hour);
    const usaMinute = parseInt(usaTime.minute);
    const isUsaWeekend = ['Sat', 'Sun'].includes(usaTime.weekday);

    let usaStatus = '미국 장 마감';
    if (!isUsaWeekend) {
        const totalMinutes = usaHour * 60 + usaMinute;
        if (totalMinutes >= 570 && totalMinutes < 960)
            usaStatus = '미국 장 개장 중'; // 09:30 ~ 16:00 (현지시간)
        else if (totalMinutes < 570) usaStatus = '미국 장 개장 전';
    }

    return { korStatus, usaStatus };
};
