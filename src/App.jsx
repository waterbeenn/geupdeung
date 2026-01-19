import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/main/index';
import NewsPage from './pages/news/index';
import Top100Page from './pages/top100/index';

const App = () => {
    return (
        <BrowserRouter>
            <>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/top100" element={<Top100Page />} />
                    </Route>
                </Routes>
            </>
        </BrowserRouter>
    );
};

export default App;
