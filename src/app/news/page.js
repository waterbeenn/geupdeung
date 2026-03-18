import NewsList from '../../components/news/NewsList';

const getQueryValue = (value) => {
    if (Array.isArray(value)) {
        return value[0] || null;
    }

    return value || null;
};

export default async function Page({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const query = getQueryValue(resolvedSearchParams?.q);

    return (
        <main>
            {query && (
                <div className="search-query-header">
                    <h2><span>{query}</span> 관련 기사</h2>
                </div>
            )}
            <NewsList isFullPage={true} initialDisplay={20} forcedQuery={query} />
        </main>
    );
}
