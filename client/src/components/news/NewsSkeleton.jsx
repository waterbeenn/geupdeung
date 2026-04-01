const NewsSkeleton = () => {
    return (
        <li className="news-item skeleton">
            <div className="skeleton-link">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
                <div className="skeleton-date"></div>
            </div>
        </li>
    );
};

export const NewsSkeletonList = ({ count = 6 }) => {
    return (
        <ul className="news-list">
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <NewsSkeleton key={i} />
                ))}
        </ul>
    );
};
