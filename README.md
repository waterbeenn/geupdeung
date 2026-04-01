# Geupdeung

국내 급등주와 경제 뉴스를 보여주는 Next.js 포트폴리오 프로젝트입니다.  
실시간 데이터가 아니며, 개장일 기준 하루 전 데이터를 보여줍니다.
예를 들어 금요일 데이터는 월요일에 보이게 됩니다. (개선 예정)

## 핵심 포인트

- 뉴스와 급등주를 한 화면에서 빠르게 확인할 수 있습니다.
- 외부 API 호출은 브라우저가 아니라 Next.js 내부 API가 담당합니다.
- UI, 상태 관리, 데이터 가공, 서버 로직을 분리해 구조를 읽기 쉽게 만들었습니다.

## 왜 이렇게 나눴는가

- `src/app`
  - Next.js 라우트와 내부 API 진입점입니다.
  - 페이지와 서버 경계를 가장 먼저 보이게 하기 위해 따로 둡니다.

- `src/components`
  - 실제 화면 조각입니다.
  - "무엇을 보여주는가"에 집중시키기 위해 데이터 호출 로직을 최대한 빼 두었습니다.

- `src/hooks`
  - 화면이 쓰는 상태와 fetch 흐름을 묶습니다.
  - 컴포넌트를 가볍게 유지하고, 뉴스/급등주 흐름을 재사용하기 쉽게 하기 위한 분리입니다.

- `src/lib`
  - 데이터 가공과 서버 유틸입니다.
  - API 응답 정규화, 필터링, 거래일 계산처럼 UI와 직접 관계없는 로직을 모아 둡니다.

## 파일 구조

```text
src/
  app/
    api/
      news/          # 네이버 뉴스 프록시
      top100/        # 급등주 데이터 제공
      trading-day/   # 최신 거래일 계산 결과 제공
    news/            # 뉴스 페이지
    top100/          # 급등주 페이지
    layout.js        # 공통 레이아웃
    page.js          # 홈
  components/
    layout/          # Header, Footer
    news/            # 뉴스 UI
    shared/          # 공용 UI
    top100/          # 급등주 UI
  hooks/
    useNewsFeed.js   # 뉴스 목록 상태/추가 로드
    useTop100Stocks.js
  lib/
    news/            # 뉴스 정규화, 필터링, 카테고리
    server/          # 서버 전용 유틸
    top100/          # 급등주 응답 정규화
```

## 데이터 흐름

- 뉴스
  - `components/news` -> `hooks/useNewsFeed` -> `/api/news` -> Naver API

- 급등주
  - `components/top100` -> `hooks/useTop100Stocks` -> `/api/top100` -> 공공데이터 API

이 구조를 택한 이유는, 브라우저가 외부 API 키나 응답 구조를 직접 알지 않게 하기 위해서입니다.

## 실행

- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## 환경변수

- `STOCK_API_BASE_URL`
- `HOLIDAY_API_BASE_URL`
- `STOCK_SERVICE_KEY`
- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`

예시는 `.env.example`에 있습니다.
