import Top100List from '../../components/top100/Top100List';

export default function Page() {
    return (
        <main>
            <Top100List limit={100} />
        </main>
    );
}
