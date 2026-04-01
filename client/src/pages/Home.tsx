import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTop100Stocks } from '../hooks/useTop100Stocks';
import { useMarketIndex } from '../hooks/useMarketIndex';
import Top100List from '../components/top100/Top100List';
import NewsList from '../components/news/NewsList';
import MarketSummary from '../components/home/MarketSummary';

export default function Home() {
    useEffect(() => { document.title = 'StockDash - 급등주 & 경제 뉴스 대시보드'; }, []);
    const navigate = useNavigate();
    const { items, tradingDay, loading } = useTop100Stocks(100);
    const { kospi, kosdaq, loading: indexLoading } = useMarketIndex();

    return (
        <main className="home-page">
            <MarketSummary
                items={items}
                tradingDay={tradingDay}
                loading={loading}
                kospi={kospi}
                kosdaq={kosdaq}
                indexLoading={indexLoading}
            />

            <div className="home-dashboard">
                <section className="home-col">
                    <Top100List limit={20} />
                    <div className="section-wrapper">
                        <button className="btn-more" onClick={() => navigate('/top100')}>
                            급등주 전체보기 →
                        </button>
                    </div>
                </section>

                <section className="home-col">
                    <NewsList initialDisplay={10} />
                    <div className="section-wrapper">
                        <button className="btn-more" onClick={() => navigate('/news')}>
                            뉴스 전체보기 →
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}
