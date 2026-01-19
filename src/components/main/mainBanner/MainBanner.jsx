import StockIndexList from './../../stockdetail/stockindex/StockIndexList';
const MainBanner = ({ indexs }) => {
    return (
        <div>
            {/* 인덱스 리스트 + 차트 */}
            <StockIndexList indexs={indexs} />
        </div>
    );
};

export default MainBanner;
