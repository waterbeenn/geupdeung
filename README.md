# 🚀 급등이 (Stock Rising)

> [cite_start]공공데이터 API를 활용한 당일 급등주 Top 100 정보 및 주식 상세 데이터 제공 서비스 [cite: 1]

## 🛠 Tech Stack

-   **Library:** React, Javascript
-   **Styling:** CSS Modules
-   **State Management:** React Hooks
-   [cite_start]**Data:** 공공데이터포털 주식 시세 API [cite: 1]

---

## 🏗 컴포넌트 설계 (Component Architecture)

### 1. 메인 페이지 (MainPage)

[cite_start]당일 기준 급등주 리스트와 주요 시장 지수를 확인하는 페이지입니다. [cite: 1]

-   [cite_start]**`MainBanner`**: 지수 차트를 보여주는 섹션 [cite: 1]
    -   [cite_start]**`StockIndexList`**: 지수 이름이 들어간 아이템의 상위 묶음 [cite: 1]
    -   [cite_start]**`StockIndexItem`**: S&P500 등 개별 지수 항목 [cite: 1]
    -   [cite_start]**`IndexChart`**: 선택된 지수의 차트가 뿌려지는 곳 [cite: 1]
-   [cite_start]**`Content`**: 당일 기준 급등주 리스트 섹션 [cite: 1]
    -   [cite_start]**`Top100List`**: `TopItem`의 상위 묶음 [cite: 1]
    -   [cite_start]**`TopItem`**: 각 급등주 데이터를 뿌려주는 컴포넌트 [cite: 1]

---

### 2. 상세 페이지 (StockDetailPage)

[cite_start]선택된 종목의 상세 정보와 관련 뉴스를 제공하는 페이지입니다. [cite: 1, 2]

-   [cite_start]**`SubBanner`**: 선택된 주식의 이름, 차트 정보 섹션 [cite: 1]
    -   [cite_start]**`StockTitle`**: 주식 이름, 가격, 전일 대비 등락폭 표시 [cite: 1]
    -   [cite_start]**`StockDate`**: 차트 주기 선택 리스트 (60분, 일, 주, 월, 년) [cite: 1]
    -   [cite_start]**`StockChart`**: 선택한 날짜 기준으로 차트가 보여지는 곳 [cite: 1, 2]
-   [cite_start]**`SubContent`**: 상세 콘텐츠 섹션 [cite: 2]
    -   [cite_start]**`News`**: 해당 주식 관련 기사가 보여지는 영역 [cite: 2]
        -   [cite_start]**`NewsList`**: 뉴스 아이템의 상위 묶음 [cite: 2]
        -   [cite_start]**`NewsItem`**: 각 개별 기사 데이터를 뿌려주는 컴포넌트 [cite: 2]

---

## 📂 프로젝트 구조 (Folder Structure)

```text
src/
 ┣ 📂 components/
 ┃  ┣ 📂 layout/          # 공통 레이아웃 (Layout, Header, Footer)
 ┃  ┣ 📂 common/          # 재사용 컴포넌트 (StockChart, Loading)
 ┃  ┣ 📂 Main/            # 메인 페이지용 컴포넌트
 ┃  ┗ 📂 StockDetail/     # 상세 페이지용 컴포넌트
 ┣ 📂 pages/              # 실제 라우팅 페이지 (MainPage, StockDetailPage)
 ┣ 📂 hooks/              # API 호출 로직 (useTop100.js 등)
 ┣ 📄 App.jsx             # Router 설정 및 Layout 적용
 ┗ 📄 main.jsx            # 엔트리 포인트
```
