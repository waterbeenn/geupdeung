import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (url = '') => {
    // API 응답 데이터를 저장하는 상태
    const [state, setState] = useState([]);

    // 로딩 상태 (요청 중 true)
    const [loading, setLoading] = useState(true);

    // 에러 메시지 저장
    const [error, setError] = useState(null);

    // 데이터 요청 함수
    const getData = async () => {
        try {
            const res = await axios.get(url);
            setState(res.data); // 응답 데이터 저장
        } catch (err) {
            setError(err.message); // 에러 발생 시 메시지
        } finally {
            setLoading(false); // 무조건 로딩 종료
        }
    };

    // url이 변경될 때마다 데이터 재요청
    useEffect(() => {
        getData();
    }, [url]);

    // 외부 컴포넌트에서 사용할 값  반환
    return {
        state,
        loading,
        error,
    };
};

export default useAxios;
