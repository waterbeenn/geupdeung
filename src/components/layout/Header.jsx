import './Header.scss';

const Header = () => {
    return (
        <header className="main-header">
            <div className="header-inner">
                {/* 1. 로고 영역 */}
                <div className="logo">
                    <span className="logo-icon">📈</span>
                    <h1>StockDash</h1>
                </div>

                {/* 2. 메뉴 영역 */}
                <nav className="header-menu">
                    <ul>
                        <li>
                            <a href="#main-banner">시장지수</a>
                        </li>
                        <li>
                            {/* id="top100"를 찾아감 */}
                            <a href="#top100">Top 100</a>
                        </li>
                        <li>
                            <a href="#news">뉴스/공시</a>
                        </li>
                    </ul>
                </nav>

                {/* 3. 마켓 스테이터스 */}
                <div className="status">
                    <div className="market-status">
                        {/* 국내 장 기준으로 시간에 따라 장 개장 중 / 장 마감으로 표현 */}
                        <span className="dot"></span>장 개장 중
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
