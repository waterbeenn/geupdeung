const Top100Header = () => {
    return (
        <div className="top100-header">
            <div className="col-rank">순위</div>
            <div className="col-name">종목명</div>
            <div className="col-price">현재가</div>
            <div className="col-change">등락(율)</div>
        </div>
    );
};

export default Top100Header;
