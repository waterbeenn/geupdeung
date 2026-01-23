import Top100Header from './Top100Header';
import TopItem from './TopItem';
import useAxios from './../../hooks/useAxios';
import { STOCK_API_ENDPOINTS } from '../../assets/api/top100/serviceKeys';
import { getTopGainers } from '../../assets/api/top100/stockApi';
import { useMemo } from 'react';

const Top100List = () => {
    const url = getTopGainers();
    const { state, loading, error } = useAxios(url);

    const topGainers = useMemo(() => {
        const rawItems = state?.response?.body?.items?.item || [];
        if (rawItems.length === 0) return [];

        return [...rawItems]
            .sort((a, b) => parseFloat(b.fltRt) - parseFloat(a.fltRt)) // 등락률(fltRt) 내림차순 정렬
            .slice(0, 100) // 100위까지만 자르기
            .map((item, index) => {
                const rawPercent = Number(item.fltRt);
                const formattedPercent = rawPercent.toFixed(2);
                return {
                    rank: index + 1,
                    name: item.itmsNm,
                    code: item.srtnCd,
                    price: parseInt(item.clpr).toLocaleString(),
                    change: parseInt(item.vs).toLocaleString(),
                    percent: String(formattedPercent),
                    isUp: parseFloat(item.fltRt) > 0,
                };
            });
    }, [state]);

    if (loading) return <div className="loading-state">데이터를 실시간으로 분석 중입니다...</div>;
    if (error) return <div className="error-state">데이터 로드 실패: {error}</div>;

    return (
        <section id="top100" className="top100-section">
            <h2 className="section-title">오늘의 급등주 Top 100</h2>
            <div className="top100-list-container">
                <Top100Header />
                <ul className="top100-items">
                    {topGainers.map((stock) => (
                        <TopItem key={stock.code} {...stock} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Top100List;
