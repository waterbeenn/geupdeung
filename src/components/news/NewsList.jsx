'use client';

import { useState } from 'react';
import { DEFAULT_CATEGORY, NEWS_CATEGORIES } from '../../lib/news/categories';
import { useNewsFeed } from '../../hooks/useNewsFeed';
import NewsItem from './NewsItem';
import { NewsSkeletonList } from './NewsSkeleton';

const NewsList = ({ limit, initialDisplay = 12, isFullPage = false, forcedQuery = null }) => {
    const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
    const { news, loading, loadingMore, error, hasMore, loadMore } = useNewsFeed({
        activeCategory,
        forcedQuery,
        initialDisplay,
        isFullPage,
        limit,
    });

    return (
        <section className="news-section">
            {!forcedQuery && <h2>최신 경제 뉴스</h2>}
            {!limit && !forcedQuery && (
                <div className="news-tabs">
                    {NEWS_CATEGORIES.map((category) => (
                        <button
                            key={category.name}
                            className={`tab-btn ${activeCategory.name === category.name ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            )}
            <div className="news-content-area">
                {error && <div className="error-message">{error}</div>}
                {loading && news.length === 0 ? (
                    <NewsSkeletonList count={isFullPage ? 8 : 4} />
                ) : (
                    <ul className={`news-list ${isFullPage ? 'full-view' : ''}`}>
                        {news.map((item) => (
                            <NewsItem key={item.link} {...item} />
                        ))}
                    </ul>
                )}
                {loadingMore && <NewsSkeletonList count={4} />}
                {isFullPage && !limit && hasMore && (
                    <div className="load-more-container">
                        <button className="load-more-btn" onClick={loadMore} disabled={loadingMore}>
                            {loadingMore
                                ? '불러오는 중...'
                                : forcedQuery
                                    ? `${forcedQuery} 기사 더보기 +`
                                    : '뉴스 더보기 +'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewsList;
