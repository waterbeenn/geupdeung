import { NavLink } from 'react-router-dom';
import { getMarketStatus } from './MarketStatusHelper';
import { useState, useEffect } from 'react';
import './Header.scss';

const Header = () => {
    const [status, setStatus] = useState(getMarketStatus());
    useEffect(() => {
        const timer = setInterval(() => {
            setStatus(getMarketStatus());
        }, 60000); // 1분마다 갱신
        return () => clearInterval(timer);
    }, []);
    const getStatusClass = (statusText) => {
        if (statusText.includes('개장 중')) return 'open';
        if (statusText.includes('개장 전')) return 'before';
        return 'closed';
    };

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
                            <NavLink to="/" end>시장지수</NavLink>
                        </li>
                        <li>
                            {/* id="top100"를 찾아감 */}
                            <NavLink to="/top100">Top 100</NavLink>
                        </li>
                        <li>
                            <NavLink to="/news">뉴스/공시</NavLink>
                        </li>
                    </ul>
                </nav>

                {/* 3. 마켓 스테이터스 */}
                <div className="status-container">
                    <div className={`market-status ${getStatusClass(status.korStatus)}`}>
                        {/* 국내 장 기준으로 시간에 따라 장 개장 중 / 장 마감으로 표현 */}
                        <span className="dot"></span>
                        {status.korStatus}
                    </div>
                    <div className={`market-status ${getStatusClass(status.usaStatus)}`}>
                        <span className="dot"></span>
                        {status.usaStatus}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
