import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NewsList from '../components/news/NewsList';

export default function News() {
    useEffect(() => { document.title = '경제 뉴스 | StockDash'; }, []);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || null;
    const [inputValue, setInputValue] = useState<string>(query || '');

    const handleSearch = (): void => {
        const trimmed = inputValue.trim();
        if (!trimmed) {
            setSearchParams({});
        } else {
            setSearchParams({ q: trimmed });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <main>
            <div className="news-search-bar">
                <div className="news-search-inner">
                    <span className="news-search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <label htmlFor="news-search-input" className="visually-hidden">뉴스 검색</label>
                    <input
                        id="news-search-input"
                        type="text"
                        className="news-search-input"
                        placeholder="키워드를 입력하고 Enter를 누르세요"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label="뉴스 검색어 입력"
                    />
                    {inputValue && (
                        <button
                            className="news-search-clear"
                            onClick={() => {
                                setInputValue('');
                                setSearchParams({});
                            }}
                            aria-label="검색어 초기화"
                        >
                            ✕
                        </button>
                    )}
                    <button className="news-search-btn" onClick={handleSearch} aria-label="뉴스 검색">
                        검색
                    </button>
                </div>
            </div>

            {query && (
                <div className="search-query-header">
                    <h2><span>{query}</span> 관련 기사</h2>
                </div>
            )}
            <NewsList isFullPage={true} initialDisplay={20} forcedQuery={query} />
        </main>
    );
}
