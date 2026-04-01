import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import ErrorBoundary from './components/shared/ErrorBoundary';
import PageSpinner from './components/shared/PageSpinner';
import Home from './pages/Home';

const Top100 = lazy(() => import('./pages/Top100'));
const News = lazy(() => import('./pages/News'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <div className="layout-container">
                    <Header />
                    <main className="content-area">
                        <Suspense fallback={<PageSpinner />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/top100" element={<Top100 />} />
                                <Route path="/news" element={<News />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </ErrorBoundary>
    );
}
