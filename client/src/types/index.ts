// Top100
export interface Top100Item {
    rank: number;
    name: string;
    code: string;
    price: number;
    priceText: string;
    change: number;
    changeText: string;
    percent: number;
    percentText: string;
    isUp: boolean;
}

// News
export interface NewsCategory {
    name: string;
    query: string;
}

export interface NewsItem {
    link: string;
    originallink: string;
    title: string;
    description: string;
    pubDate: string;
    pubDateTimestamp: number;
}

// Market Index
export interface MarketIndexData {
    name: string;
    value: string;
    vs: string;
    fltRt: string;
    isUp: boolean;
}

// API raw types
export interface RawTop100Item {
    itmsNm: string;
    srtnCd: string;
    clpr: string | number;
    fltRt: string | number;
    vs: string | number;
}

export interface RawNewsItem {
    link: string;
    originallink: string;
    title: string;
    description: string;
    pubDate: string;
}

export interface NewsApiResponse {
    items: NewsItem[];
    hasMore: boolean;
    query: string;
    total: number;
    start: number;
    display: number;
}

// Fetch params
export interface FetchNewsParams {
    query: string;
    display: number;
    start: number;
}

// Hook return types
export interface UseTop100StocksReturn {
    items: Top100Item[];
    tradingDay: string;
    loading: boolean;
    error: string | null;
    retry: () => void;
}

export interface UseMarketIndexReturn {
    kospi: MarketIndexData | null;
    kosdaq: MarketIndexData | null;
    tradingDay: string | null;
    loading: boolean;
    error: string | null;
    retry: () => void;
}

export interface UseNewsFeedParams {
    activeCategory: NewsCategory;
    forcedQuery?: string | null;
    initialDisplay?: number;
    isFullPage?: boolean;
    limit?: number;
}

export interface UseNewsFeedReturn {
    news: NewsItem[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => void;
    retry: () => void;
}

export interface UseInfiniteScrollParams {
    onLoadMore: () => void;
    hasMore: boolean;
    loading: boolean;
}

// Market status
export interface MarketStatus {
    korStatus: string;
    usaStatus: string;
}
