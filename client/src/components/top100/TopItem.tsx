import type { Top100Item } from '../../types';

interface TopItemProps extends Top100Item {
    onItemClick: (name: string) => void;
}

const TopItem = ({ rank, name, code, priceText, changeText, percent, percentText, onItemClick }: TopItemProps) => {
    const statusClass = percent > 0 ? 'up' : percent < 0 ? 'down' : 'zero';

    return (
        <li
            className="top100-item"
            onClick={() => onItemClick(name)}
            onKeyDown={(e) => e.key === 'Enter' && onItemClick(name)}
            role="button"
            tabIndex={0}
            aria-label={`${name} 관련 뉴스 보기`}
        >
            <div className="rank">{rank}</div>
            <div className="name-group">
                <span className="name">{name}</span>
                <span className="code">{code}</span>
            </div>
            <div className="price">{priceText}</div>
            <div className={`change-group ${statusClass}`}>
                <span className="change">
                    {percent > 0 ? '▲' : percent < 0 ? '▼' : ''}
                    {changeText} 원
                </span>
                <span className="percent">
                    {percent > 0 ? '+' : ''}
                    {percentText}%
                </span>
            </div>
        </li>
    );
};

export default TopItem;
