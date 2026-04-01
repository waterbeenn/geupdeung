import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found">
            <p className="not-found-code">404</p>
            <h2>페이지를 찾을 수 없습니다</h2>
            <p className="not-found-desc">요청하신 주소가 존재하지 않거나 이동되었습니다.</p>
            <Link to="/" className="not-found-home">홈으로 돌아가기</Link>
        </div>
    );
}
