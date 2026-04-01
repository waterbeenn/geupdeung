
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="main-footer">
            <div className="footer-container">
                <div className="footer-info">
                    <h3 className="footer-logo">
                        Stock <span>Dash</span>
                    </h3>
                    <p className="footer-desc">
                        최신 경제 뉴스 및 급등주를 한눈에 파악할 수 있는 대시보드입니다.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h4>Data Source</h4>
                        <ul>
                            <li>Naver Search API</li>
                            <li>공공데이터포털</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© {currentYear} Stock Dash. All rights reserved.</p>
                    <p className="disclaimer">
                        본 서비스에서 제공하는 정보는 투자 참고용이며, 투자에 대한 책임은 본인에게
                        있습니다.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
