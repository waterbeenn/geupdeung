const StockIndexItem = ({ index }) => {
    const { name, price } = index;
    return (
        <li className="stock-index-item">
            <div className="placeholder">
                <span className="name">{name}</span>

                <span className="price">$ {price}</span>
            </div>
        </li>
    );
};

export default StockIndexItem;
