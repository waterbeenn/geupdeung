import StockIndexItem from './StockIndexItem';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

const StockIndexList = ({ indexs }) => {
    return (
        <ul className="stock-index-list">
            <Swiper
                slidesPerView={4}
                navigation={true}
                spaceBetween={20}
                modules={[Navigation]}
                className="mySwiper"
            >
                {indexs.map((index) => (
                    <SwiperSlide>
                        <StockIndexItem key={index.id} index={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </ul>
    );
};

export default StockIndexList;
