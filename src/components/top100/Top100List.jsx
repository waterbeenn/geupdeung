"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTop100Stocks } from "../../hooks/useTop100Stocks";
import Modal from "../shared/Modal";
import NewsList from "../news/NewsList";
import Top100Header from "./Top100Header";
import { Top100SkeletonList } from "./Top100Skeleton";
import TopItem from "./TopItem";

const formatTradingDay = (tradingDay) => {
  if (!tradingDay || tradingDay.length !== 8) {
    return tradingDay;
  }

  return `${tradingDay.slice(0, 4)}.${tradingDay.slice(4, 6)}.${tradingDay.slice(6, 8)}`;
};

const Top100List = ({ limit = 100 }) => {
  const router = useRouter();
  const { items, tradingDay, loading, error } = useTop100Stocks(limit);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState("");

  const handleStockClick = (name) => {
    setSelectedStock(name);
    setIsModalOpen(true);
  };

  if (error) {
    return <div className="error-state">데이터 로드 실패: {error}</div>;
  }

  return (
    <section id="top100" className="top100-section">
      <h2 className="section-title">오늘의 급등주 Top 100</h2>
      {tradingDay && (
        <p className="section-caption">
          기준 거래일: {formatTradingDay(tradingDay)}
        </p>
      )}
      <div className="top100-list-container">
        <Top100Header />
        <ul className="top100-items">
          {loading ? (
            <Top100SkeletonList count={limit > 20 ? 15 : limit} />
          ) : (
            items.map((stock) => (
              <TopItem
                key={stock.code}
                {...stock}
                onItemClick={handleStockClick}
              />
            ))
          )}
        </ul>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStock}
      >
        <NewsList
          isFullPage={false}
          initialDisplay={10}
          forcedQuery={selectedStock}
        />
        <div
          className="modal-more-wrapper"
          style={{ textAlign: "center", marginTop: "1.5rem" }}
        >
          <button
            className="load-more-btn"
            onClick={() =>
              router.push(`/news?q=${encodeURIComponent(selectedStock)}`)
            }
          >
            {selectedStock} 뉴스 전체 보기
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Top100List;
