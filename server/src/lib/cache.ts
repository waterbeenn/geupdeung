interface CacheEntry<T> {
    data: T;
    expiresAt: number;
}

class MemoryCache {
    private store = new Map<string, CacheEntry<unknown>>();

    get<T>(key: string): T | null {
        const entry = this.store.get(key);
        if (!entry) return null;
        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return entry.data as T;
    }

    set<T>(key: string, data: T, ttlMs: number): void {
        this.store.set(key, { data, expiresAt: Date.now() + ttlMs });
    }
}

export const cache = new MemoryCache();

export const TTL = {
    TOP100: 10 * 60 * 1000,  // 10분 (거래 데이터는 하루 단위)
    NEWS:    5 * 60 * 1000,  // 5분
};
