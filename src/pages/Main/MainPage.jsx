import Layout from '../../components/layout/Layout';
import MainBanner from './MainBanner';
import Top100List from './Top100List';
import '../../reset.css';

const MainPage = () => {
    return (
        <div>
            <Layout>
                <MainBanner />
                <Top100List />
            </Layout>
        </div>
    );
};

export default MainPage;
