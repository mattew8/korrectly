# Korrectly 🔍

복사/붙여넣기 없이 웹페이지에서 바로 맞춤법을 검사하고 수정할 수 있는 크롬 확장 프로그램입니다.

## 소개

Korrectly는 기존 맞춤법 검사기와 달리, 별도의 사이트 방문이나 복사/붙여넣기 없이 웹페이지에서 바로 맞춤법을 검사하고 수정할 수 있습니다. 사이드 패널을 통해 작업 화면을 방해하지 않고 맞춤법을 검사하며, 수정이 필요한 부분을 하나씩 확인하고 선택적으로 반영할 수 있어 고유명사 등이 강제로 변경되는 것을 방지합니다.

## 주요 기능

![2024-12-276 09 23-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/5721ea92-8988-4fd0-8851-3d73d3a57f36)

- ✨ 복사/붙여넣기 없이 웹페이지에서 바로 맞춤법 검사
- 🔄 사이드 패널을 통한 작업 화면 방해 없는 교정 제안
- 📝 수정 필요 부분 하나씩 확인하고 선택적 반영 가능

## 설치 방법

1. Chrome 웹 스토어에서 'Korrectly' 검색 또는 [링크](https://chromewebstore.google.com/detail/korrectly-%ED%95%9C%EA%B5%AD%EC%96%B4-%EB%A7%9E%EC%B6%A4%EB%B2%95-%EA%B2%80%EC%82%AC%EA%B8%B0/bblnbbhgemlmbmlhijmpnkclfnhfchpm)를 통해 설치
2. 브라우저 우측 상단의 확장 프로그램 아이콘 클릭으로 활성화

### 개발자 모드 설치

1. 이 저장소를 클론 또는 다운로드
2. 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 OpenAI API 키를 추가:
   ```env
   OPENAI_API_KEY='your-api-key-here'
   ```
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
