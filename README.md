# Korrectly 🔍

복사/붙여넣기 없이 웹페이지에서 바로 맞춤법을 검사하고 수정할 수 있는 크롬 확장 프로그램입니다.

## 소개

Korrectly는 기존 맞춤법 검사기와 달리, 별도의 사이트 방문이나 복사/붙여넣기 없이 웹페이지에서 바로 맞춤법을 검사하고 수정할 수 있습니다. 사이드 패널을 통해 작업 화면을 방해하지 않고 맞춤법을 검사하며, 수정이 필요한 부분을 하나씩 확인하고 선택적으로 반영할 수 있어 고유명사 등이 강제로 변경되는 것을 방지합니다.

## 주요 기능

![2024-12-276 09 23-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/5721ea92-8988-4fd0-8851-3d73d3a57f36)

- ✨ 복사/붙여넣기 없이 웹페이지에서 바로 맞춤법 검사
- 🔄 사이드 패널을 통한 작업 화면 방해 없는 교정 제안
- 📝 수정 필요 부분 하나씩 확인하고 선택적 반영 가능

## 프로젝트 구조

이 프로젝트는 크롬 익스텐션 특성을 고려하여 각 실행 컨텍스트를 명확히 분리하고, 내부적으로 FSD(Feature-Sliced Design) 아키텍처를 적용하여 설계되었습니다.

### 컨텍스트 분리

크롬 익스텐션의 각 실행 컨텍스트는 독립적으로 동작하며, `common` 모듈을 제외하고는 서로 결합되지 않습니다:

```
src/
├── common/              # 모든 컨텍스트에서 공유하는 모듈
│   ├── chrome-extension-messaging/
│   ├── database/
│   ├── router/
│   └── types/
├── content-script/      # 웹페이지에 주입되는 컨텐츠 스크립트
│   └── index.tsx        # Entry point
├── side-panel/          # 사이드 패널 UI
│   └── index.tsx        # Entry point
└── service-worker/      # 백그라운드 서비스 워커
    └── index.ts         # Entry point
```

### FSD 아키텍처

각 컨텍스트 폴더 내부에는 FSD 아키텍처가 적용되어 있으며, 레이어별 의존 방향이 강제됩니다:

```
{context}/
├── app/         # 애플리케이션 초기화 및 전역 설정
├── pages/       # 페이지 단위 컴포넌트
├── features/    # 독립적인 기능 모듈
└── shared/      # 컨텍스트 내부 공유 유틸리티
```

각 슬라이스 내부는 목적에 따라 세그먼트로 구성됩니다:

- `ui/` - 사용자 인터페이스 컴포넌트
- `model/` - 상태 관리 및 비즈니스 로직
- `lib/` - 유틸리티 함수
- `api/` - API 통신 로직

이러한 구조를 통해 각 컨텍스트의 독립성을 유지하면서도, 일관된 코드 구조와 명확한 의존성 관리를 실현합니다.

### 아키텍처 규칙 강제

위에서 설명한 아키텍처 원칙들은 ESLint의 `import/no-restricted-paths` 규칙을 통해 자동으로 검증됩니다:

- **컨텍스트 간 격리**: 각 컨텍스트(content-script, side-panel, service-worker)는 `common` 모듈을 제외하고 다른 컨텍스트의 모듈을 import할 수 없습니다. 예를 들어, content-script에서 side-panel의 모듈을 사용하려 하면 ESLint 에러가 발생합니다.

- **FSD 레이어 의존성**: 각 레이어는 정해진 방향으로만 의존할 수 있습니다. 예를 들어, features 레이어는 shared와 entities만 import할 수 있으며, pages 레이어를 import하려 하면 에러가 발생합니다.

이를 통해 개발 단계에서 아키텍처 위반을 즉시 감지하고 방지할 수 있습니다.

## 설치 방법

1. Chrome 웹 스토어에서 'Korrectly' 검색 또는 [링크](https://chromewebstore.google.com/detail/korrectly-%ED%95%9C%EA%B5%AD%EC%96%B4-%EB%A7%9E%EC%B6%A4%EB%B2%95-%EA%B2%80%EC%82%AC%EA%B8%B0/bblnbbhgemlmbmlhijmpnkclfnhfchpm)를 통해 설치
2. 브라우저 우측 상단의 확장 프로그램 아이콘 클릭으로 활성화

### 개발자 모드 설치

1. 이 저장소를 클론 또는 다운로드
2. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 bareun API 설정을 추가:
   ```env
   BAREUN_SERVER_URL='https://api.bareun.ai/'
   BAREUN_API_KEY='your-bareun-api-key-here'
   ```
   - bareun API 키는 [bareun AI](https://bareun.ai/)에서 발급받을 수 있습니다.
3. 의존성 패키지 설치 및 빌드:
   ```bash
   yarn install
   yarn build
   ```
4. Chrome 브라우저에서 `chrome://extensions` 접속
5. 우측 상단의 '개발자 모드' 활성화
6. '압축해제된 확장 프로그램을 로드합니다' 클릭
7. 빌드된 `dist` 폴더 선택

## 사용 방법

1. 확장 프로그램을 설치합니다.
2. 우상단 확장 프로그램 -> Korrectly를 클릭해 실행합니다.
3. 웹페이지에서 맞춤법과 문법을 검사할 영역을 선택합니다.
4. 검사 시작하기 클릭 시, 선택한 영역의 맞춤법과 문법을 검사합니다.
5. 검사 결과는 오류 부분에 밑줄로 표시됩니다.
6. 밑줄 친 부분을 클릭하면 교정 제안을 확인하고 선택적으로 반영할 수 있습니다.

## 라이선스

MIT License

## 문의하기

버그 제보나 기능 제안은 [이슈](https://github.com/mattew8/korrectly/issues)를 통해 남겨주세요.
