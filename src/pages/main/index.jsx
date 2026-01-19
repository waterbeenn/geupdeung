import MainBanner from './../../components/main/mainBanner/MainBanner';
import Top100List from './../../components/top100/Top100List';
import '../../reset.css';
import './style.scss';
import { useState } from 'react';
import indexData from '../../assets/api/indexs/indexData';

const MainPage = () => {
    const [indexs] = useState(indexData);
    return (
        <>
            <MainBanner indexs={indexs}/>
            <Top100List />
        </>
    );
};

export default MainPage;
