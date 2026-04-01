import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTop100Stocks } from "../../hooks/useTop100Stocks";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import "../../top100.scss";
import Modal from "../shared/Modal";
import NewsList from "../news/NewsList";
import Top100Header from "./Top100Header";
import { Top100SkeletonList } from "./Top100Skeleton";
import TopItem from "./TopItem";

const PAGE_SIZE = 20;

const formatTradingDay = (tradingDay: string): string => {
  if (!tradingDay || tradingDay.length !== 8) return tradingDay;
  return `${tradingDay.slice(0, 4)}.${tradingDay.slice(4, 6)}.${tradingDay.slice(6, 8)}`;
};

interface Top100ListProps {
  limit?: number;
}

const Top100List = ({ limit = 100 }: Top100ListProps) => {
  const navigate = useNavigate();
  const { items, tradingDay, loading, error, retry } = useTop100Stocks(limit);
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<string>("");

  const visibleItems = useMemo(() => items.slice(0, displayCount), [items, displayCount]);
  const hasMore = !loading && displayCount < items.length;

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + PAGE_SIZE, limit));
  }, [limit]);

  const sentinelRef = useInfiniteScroll({ onLoadMore: loadMore, hasMore, loading });

  const handleStockClick = (name: string): void => {
    setSelectedStock(name);
    setIsModalOpen(true);
  };

  if (error) {
    return (
      <div className="empty-state">
        <p className="empty-state-icon">⚠️</p>
        <p className="empty-state-text">{error}</p>
        <button className="retry-btn" onClick={retry}>다시 시도</button>
      </div>
    );
  }

  return (
    <section id="top100" className="top100-section">
      <h2 className="section-title">오늘의 급등주 Top 100</h2>
      {tradingDay && (
        <p className="section-caption">기준 거래일: {formatTradingDay(tradingDay)}</p>
      )}
      <div className="top100-list-container">
        <Top100Header />
        <ul className="top100-items">
          {loading ? (
            <Top100SkeletonList count={15} />
          ) : items.length === 0 ? (
            <li className="empty-state">
              <p className="empty-state-icon">📭</p>
              <p className="empty-state-text">급등주 데이터가 없습니다.</p>
            </li>
          ) : (
            visibleItems.map((stock) => (
              <TopItem key={stock.code} {...stock} onItemClick={handleStockClick} />
            ))
          )}
        </ul>
        <div ref={sentinelRef} />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedStock}>
        <NewsList isFullPage={false} initialDisplay={10} forcedQuery={selectedStock} />
        <div className="modal-more-wrapper" style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button
            className="load-more-btn"
            onClick={() => navigate(`/news?q=${encodeURIComponent(selectedStock)}`)}
          >
            {selectedStock} 뉴스 전체 보기
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Top100List;
