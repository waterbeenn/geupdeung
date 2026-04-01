const Top100Skeleton = () => {
    return (
        <li className="top100-item skeleton">
            <div className="rank"></div>
            <div className="name-group">
                <div className="skeleton-bar name"></div>
                <div className="skeleton-bar code"></div>
            </div>
            <div className="price">
                <div className="skeleton-bar"></div>
            </div>
            <div className="change-group">
                <div className="skeleton-bar"></div>
                <div className="skeleton-bar short"></div>
            </div>
        </li>
    );
};

export const Top100SkeletonList = ({ count = 10 }) => {
    return (
        <>
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <Top100Skeleton key={i} />
                ))}
        </>
    );
};
