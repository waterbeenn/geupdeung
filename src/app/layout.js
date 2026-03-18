// src/app/layout.js
import '../reset.css';
import './top100/style.scss';
import './style.scss';
import Header from '../components/layout/header/Header';
import Footer from '../components/layout/footer/Footer';

export const metadata = {
    title: '주식 & 뉴스 앱',
    description: '급등주와 최신 뉴스를 확인하세요',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body suppressHydrationWarning={true}>
                <div className="layout-container">
                    <Header />
                    <main className="content-area">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
