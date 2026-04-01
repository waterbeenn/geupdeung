import { useMemo } from 'react';

const IndexCard = ({ label, data, loading }) => {
    const isUp = data ? parseFloat(data.fltRt) >= 0 : null;
    const sign = isUp ? '▲' : '▼';
    const colorClass = isUp ? 'up' : 'down';

    return (
        <div className={`summary-card index-card ${label === '코스피' ? 'kospi' : 'kosdaq'}`}>
            <span className="summary-card-label">{label}</span>
            {loading || !data ? (
                <span className="summary-card-value">—</span>
            ) : (
                <>
                    <span className="summary-card-value">{data.value}</span>
                    <span className={`summary-card-sub ${colorClass}`}>
                        {sign} {Math.abs(parseFloat(data.fltRt)).toFixed(2)}%
                    </span>
                </>
            )}
        </div>
    );
};

const MarketSummary = ({ items, tradingDay, loading, kospi, kosdaq, indexLoading }) => {
    const stats = useMemo(() => {
        if (!items.length) return null;
        const avgPercent = (
            items.reduce((sum, i) => sum + i.percent, 0) / items.length
        ).toFixed(2);
        const top = items[0];
        return { avgPercent, top };
    }, [items]);

    const formatDay = (d) =>
        d && d.length === 8
            ? `${d.slice(0, 4)}.${d.slice(4, 6)}.${d.slice(6, 8)}`
            : d;

    return (
        <div className="market-summary">
            <div className="market-summary-header">
                <span className="market-summary-title">📊 시장 요약</span>
                {tradingDay && (
                    <span className="market-summary-date">{formatDay(tradingDay)} 기준</span>
                )}
            </div>
            <div className="market-summary-cards">
                <IndexCard label="코스피" data={kospi} loading={indexLoading} />
                <IndexCard label="코스닥" data={kosdaq} loading={indexLoading} />

                <div className="summary-card avg">
                    <span className="summary-card-label">평균 등락률</span>
                    <span className="summary-card-value">
                        {loading ? '—' : `+${stats?.avgPercent ?? 0}%`}
                    </span>
                </div>

                <div className="summary-card top">
                    <span className="summary-card-label">1위 종목</span>
                    <span className="summary-card-value">
                        {loading ? '—' : (stats?.top ? `${stats.top.name} +${stats.top.percentText}%` : '—')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MarketSummary;
