const TopItem = ({ rank, name, code, price, change, percent, isUp }) => {
    const numericPercent = parseFloat(percent);
    const statusClass = numericPercent > 0 ? 'up' : numericPercent < 0 ? 'down' : 'zero';

    return (
        <li className="top100-item">
            <div className="rank">{rank}</div>
            <div className="name-group">
                <span className="name">{name}</span>
                <span className="code">{code}</span>
            </div>
            <div className="price">{price}</div>
            <div className={`change-group ${statusClass}`}>
                <span className="change">
                    {numericPercent > 0 ? '▲' : numericPercent < 0 ? '▼' : ''}
                    {change} 원
                </span>
                <span className="percent">
                    {numericPercent > 0 ? '+' : ''}
                    {percent}%
                </span>
            </div>
        </li>
    );
};

export default TopItem;
