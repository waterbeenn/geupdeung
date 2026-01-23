import { useEffect, useState } from 'react';

const usePagination = (data = [], perPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    // 총 페이지 수
    const totalPage = Math.ceil(data.length / perPage);

    // 현재 페이지 인덱스 계산
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    // 현재 페이지 데이터
    const currentData = data.slice(start, end);

    // 페이지 이동 함수
    const goFirst = () => setCurrentPage(1);
    const goLast = () => setCurrentPage(totalPage);
    const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPage));

    // 데이터 변경 시 현재 페이지 업데이트처리
    useEffect(() => {
        if (currentPage > totalPage) {
            setCurrentPage(1);
        }
    }, [data, totalPage, currentPage]);

    return {
        currentPage,
        totalPage,
        currentData,
        setCurrentPage,
        goFirst,
        goPrev,
        goNext,
        goLast,
    };
};

export default usePagination;
