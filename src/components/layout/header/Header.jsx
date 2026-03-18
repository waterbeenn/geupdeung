"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMarketStatus } from "./MarketStatusHelper";
import { useState, useEffect } from "react";
import "./Header.scss";

const Header = () => {
  const pathname = usePathname();
  const [status, setStatus] = useState(getMarketStatus());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getMarketStatus());
    }, 60000); // 1분마다 갱신
    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getStatusClass = (statusText) => {
    if (statusText.includes("개장 중")) return "open";
    if (statusText.includes("개장 전")) return "before";
    return "closed";
  };
  const getActiveSection = (path) => (pathname === path ? "active" : "");

  return (
    <header className="main-header">
      <div className="header-inner">
        {/* 1. 로고 영역 */}
        <div className="logo">
          <span className="logo-icon">📈</span>
          <Link href="/" className={getActiveSection("/")}>
            <h1>StockDash</h1>
          </Link>
        </div>

        {/* 2. 메뉴 영역 */}
        <nav className={`header-menu ${isMenuOpen ? "mobile-open" : ""}`}>
          <ul>
            <li>
              <Link
                href="/"
                className={getActiveSection("/")}
                onClick={() => setIsMenuOpen(false)}
              >
                홈
              </Link>
            </li>
            <li>
              {/* id="top100"를 찾아감 */}
              <Link
                href="/top100"
                className={getActiveSection("/top100")}
                onClick={() => setIsMenuOpen(false)}
              >
                Top 100
              </Link>
            </li>
            <li>
              <Link
                href="/news"
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
          {/* <div className={`market-status ${getStatusClass(status.usaStatus)}`}>
                        <span className="dot"></span>
                        {status.usaStatus}
                    </div> */}
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
