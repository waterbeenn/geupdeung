import { useState } from 'react';
import { DEFAULT_CATEGORY, NEWS_CATEGORIES } from '../../lib/news/categories';
import { useNewsFeed } from '../../hooks/useNewsFeed';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import NewsItem from './NewsItem';
import { NewsSkeletonList } from './NewsSkeleton';

const NewsList = ({ limit, initialDisplay = 12, isFullPage = false, forcedQuery = null }) => {
    const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY);
    const { news, loading, loadingMore, error, hasMore, loadMore, retry } = useNewsFeed({
        activeCategory,
        forcedQuery,
        initialDisplay,
        isFullPage,
        limit,
    });

    const canInfiniteScroll = isFullPage && !limit;
    const sentinelRef = useInfiniteScroll({
        onLoadMore: loadMore,
        hasMore: canInfiniteScroll && hasMore,
        loading: loadingMore,
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
                {error ? (
                    <div className="empty-state">
                        <p className="empty-state-icon">⚠️</p>
                        <p className="empty-state-text">{error}</p>
                        <button className="retry-btn" onClick={retry}>다시 시도</button>
                    </div>
                ) : loading && news.length === 0 ? (
                    <NewsSkeletonList count={isFullPage ? 8 : 4} />
                ) : news.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-state-icon">🔍</p>
                        <p className="empty-state-text">
                            {forcedQuery
                                ? `"${forcedQuery}" 관련 뉴스가 없습니다.`
                                : '뉴스가 없습니다.'}
                        </p>
                    </div>
                ) : (
                    <ul className={`news-list ${isFullPage ? 'full-view' : ''}`}>
                        {news.map((item) => (
                            <NewsItem key={item.link} {...item} />
                        ))}
                    </ul>
                )}
                {loadingMore && <NewsSkeletonList count={4} />}
                {canInfiniteScroll && <div ref={sentinelRef} />}
            </div>
        </section>
    );
};

export default NewsList;
