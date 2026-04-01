import { useEffect } from 'react';
import Top100List from '../components/top100/Top100List';

export default function Top100() {
    useEffect(() => { document.title = '급등주 Top 100 | StockDash'; }, []);
    return (
        <main>
            <Top100List limit={100} />
        </main>
    );
}
