import Header from './Header';
import Footer from './Footer';
import './Layout.scss';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Header />
            <main className="content-area">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
