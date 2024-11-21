안녕하세요, '구디사는 개발자 9Diin' 입니다. <br />
<br />
해당 프로젝트는 NEXT.js (14버전)과 Supabase, 그리고 Markdown Editor 라이브러리를 사용하여 CRUD(Create, Read, Update, Delete) 기능을 구현한 나만의 TODO-LIST 및 TODO-BOARD를 구현해보는 예제 프로젝트입니다. <br />
<br />
해당 프로젝트는 전적으로 Shadcn UI 디자인 시스템을 사용하여 UI/UX 개발을 진행하였습니다. <br />
해당 프로젝트의 디자인은 전적으로 필자(구디사는 개발자)의 개인 작업물이며, 무단 복제 배포를 금지합니다. <br />
<br />
그러나 `코드의 재사용 및 배포는 전적으로 모든 영역에서 허용`합니다. 감사합니다. <br />
그러면 프로젝트 개발을 위한 `프로젝트 생성`, `개발환경 세팅` 등과 같은 각 단계별 커리큘럼을 작성해보도록 하겠습니다.

---

### 프로젝트 환경설정

1. Shadcn UI 공식문서의 CLI를 통해 NEXT.js 프로젝트를 생성합니다. 하기에 작성한 명령어를 통해 설치해줍니다. 또한, 모든 기본 설정을 통해 진행하였습니다. <br />
   단, 컬러 테마는 본인의 취향에 맞게 선택해주십시오.

-   npx shadcn@latest init
-   전반적인 폰트는 Google Font의 `Noto Sans KR` 폰트를 사용했습니다. (feat. app > layout.tsx 파일 참조)
-   필수 컴포넌트 설치

    -   `npx shadcn@latest add alert-dialog`
    -   `npx shadcn@latest add button`
    -   `npx shadcn@latest add calendar`
    -   `npx shadcn@latest add card`
    -   `npx shadcn@latest add checkbox`
    -   `npx shadcn@latest add dialog`
    -   `npx shadcn@latest add input`
    -   `npx shadcn@latest add popover`
    -   `npx shadcn@latest add progress`
    -   `npx shadcn@latest add toast`
    -   `npx shadcn@latest add separator`

-   SASS/SCSS 설치: `npm i sass`
-   React 마크다운 에디터 설치: `npm i @uiw/react-markdown-editor`
-   Supabase 연동을 위한 라이브러리 설치: `npm install @supabase/supabase-js`

2. 프로젝트 구조

-   App Router 기반 페이지 라우팅이 이루어지니 만큼 `app` 폴더 하위에는 페이지에 관련된 파일이 위치합니다.
-   `public` 폴더를 따로 생성하여 assets와 styles 폴더를 생성하였습니다.
    -   assets: 정적 자원을 관리합니다. (예: 이미지, 아이콘, 폰트 등)
    -   styles: CSS 파일을 관리합니다. (해당 프로젝트는 교육과정이니 만큼 Tailwind CSS와 SCSS를 섞어 진행합니다.)
-   `components` 폴더에서는 해당 프로젝트에서 Base UI되는 컴포넌트들이 설치되어 관리됩니다. ui 폴더 참고해주세요.
-   Supabase 연동을 위한 개인의 API_KEY와 BASE_URL은 `.env.local` 파일에서 관리되기 때문에 깃허브에 따로 업로드 되지 않습니다. Supabase 공식문서를 참고하세요.

---

### 커리큘럼

1. 프로젝트 생성 및 프로젝트 환경설정 (feat. Shadcn UI로 베이스 UI 컴포넌트 설치)

    - `#1-install` branch를 참고해주세요.

2. Init Page(최초 진입 페이지) UI 개발하기

    - `#2-init-page-ui` branch를 참고해주세요.

3. Board Unique Page By Id(Board ID에 따른 동적 라우팅 페이지) UI 개발하기

    - `#3-board-page-ui` branch를 참고해주세요.

4. Supabase 연동하기

    - `#4-connect-supabase` branch를 참고하세요.

5. Init Page 기능 개발하기
    - Add New Page 버튼 클릭 시, TASK 생성 및 Supabase 연동하기
    - TASK 생성 후, USER의 TODO-BOARD 텍스트 아래의 데이터 조회하기 (feat. useGetAllTask 훅 사용)
    - `#5-dev-init` branch를 참고하세요.
