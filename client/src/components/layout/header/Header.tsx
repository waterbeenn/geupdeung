import { Link, useLocation } from "react-router-dom";
import { getMarketStatus } from "./MarketStatusHelper";
import { useState, useEffect } from "react";
import type { MarketStatus } from "../../../types";
import "./Header.scss";

const Header = () => {
  const { pathname } = useLocation();
  const [status, setStatus] = useState<MarketStatus>(getMarketStatus());
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getMarketStatus());
    }, 60000); // 1분마다 갱신
    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getStatusClass = (statusText: string): string => {
    if (statusText.includes("개장 중")) return "open";
    if (statusText.includes("개장 전")) return "before";
    return "closed";
  };
  const getActiveSection = (path: string): string =>
    pathname === path ? "active" : "";

  return (
    <header className="main-header">
      <div className="header-inner">
        {/* 1. 로고 영역 */}
        <div className="logo">
          <img
            src="/logo.png"
            alt=""
            className="logo-icon"
            aria-hidden="true"
            style={{ height: "clamp(1rem, 4vw, 1.35rem)", width: "auto" }}
          />
          <Link to="/" className={getActiveSection("/")}>
            <h1>급등이</h1>
          </Link>
        </div>

        {/* 2. 메뉴 영역 */}
        <nav className={`header-menu ${isMenuOpen ? "mobile-open" : ""}`}>
          <ul>
            <li>
              <Link
                to="/"
                className={getActiveSection("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                to="/top100"
                className={getActiveSection("/top100")}
                onClick={() => setIsMenuOpen(false)}
              >
                Top 100
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className={getActiveSection("/news")}
                onClick={() => setIsMenuOpen(false)}
              >
                뉴스/공시
              </Link>
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
        </div>

        {/* 4. 모바일 햄버거 버튼 */}
        <button
          className={`hamburger-btn ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="메뉴 열기"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
