# bareun 교정 API

교정 API는 한국어 문장을 대상으로 맞춤법, 띄어쓰기, 표준어 규정, 외래어 표기, 문장을 검사하여 오류를 자동으로 교정합니다. 교정 결과는 수정된 문장뿐 아니라 교정된 단어와 어구의 상세 정보를 포함합니다.

문장은 입력 텍스트를 바탕으로 교정이 필요한 부분을 분석하고, 교정된 결과를 제공합니다.
교정 범주는 어법, 띄어쓰기, 표준어 등 국립국어원 한국어 어문 규범에 기반합니다.
원문의 각 위치와 대응된 교정 위치를 정확히 표시하여 문맥적 이해를 돕습니다.
사용자가 교정이 부적절하다고 판단하는 경우, 교정 대상 단어를 사용사 사전에 등록할 수 있도록 돕습니다. 이때, 다양한 품사를 기반으로 사용사 사전을 추가할 수 있도록 합니다. 명사, 고유명사, 복합명사, 동사, 형용사, 부사, 관형사, 감탄사가 가능합니다.

## API 엔드포인트

`BAREUN_SERVER_URL/bareun.RevisionService/CorrectError`

## 교정 요청

요청 메시지 정의

// 교정 요청 메시지
message CorrectErrorRequest {
// 입력 문서
Document document = 1;

// 오프셋을 계산하기 위한 인코딩 타입
EncodingType encoding_type = 2;

// 커스텀 사전 도메인 정보, 하나만 지정 가능합니다.
// v4.0에서는 폐기될 예정입니다. 새로운 custom_dict_names를 사용해주세요.
// 새로운 custom_dict_names에 값이 들어있는 경우, 이 값은 무시됩니다.
string custom_domain = 4 [deprecated = true];

// 커스텀 사전 이름들
// CustomDictionaryService를 사용해서 만든 사전을 여러 개 지정한다.
// 하나 이상의 지정할 경우, 먼저 나오는 사전이 우선되어 사용된다.
repeated string custom_dict_names = 5;

// 교정기 적용시 옵션을 지정한다.
RevisionConfig config = 11;
}

// 교정기 설정
// 교정기 설정은 아무런 설정을 하지 않을 경우에 기본값을 설정하는 것을 기준으로
// 설정한다.
// (참고) 이 옵션은 구현 과정에서 지속적으로 추가될 수 있다.
message RevisionConfig {
// split sentence 비활성화하면 문장 단위 분할을 하지 않는다.
bool disable_split_sentence = 1;

// 복합명사 분리 사전 적용 비활성화
bool disable_caret_spacing = 2;

// 보조 용언 띄어쓰기 비활성화
bool disable_vx_spacing = 3;

// 주어진 문장을 기사 등의 제목으로 취급, 기본값 false
bool treat_as_title = 4;

// 제약된 구두점 사용 기능 활성화
bool enable_limited_punctuation = 5;

// 공백을 제거하는 것을 활성화하기
bool enable_cleanup_whitespace = 11;

// 문장 단위 점검 활성화
bool enable_sentence_check = 21;
}
요청 메시지에 대한 설명
변수 서브 변수 설명
document` content 메시지는 여러 문장으로 된 텍스트를 넣습니다. 기본적으로 문장을 분할해줍니다.
language ko_KR을 넣어줍니다. 일반적으로 이 규격은 언어와 그 언어가 쓰이는 나라 정보를 넣어주는 것으로 볼 수 있습니다. 나중에 바른이 북한에서 쓰이는 조선어도 처리할 수 있다고 한다면, ko_KP가 쓰일 수 있을 것입니다.
encoding_type EncodingType은 분석할 때, 각 단어의 위치 정보를 계산하는 방법을 정합니다. "안녕하세요"를 "안녕", "하", "시", "어요"로 구분될 때, "하"의 시작 위치가 6이면 UTF-8 인코딩 방식이고, 2이면 UTF-16 인코딩이거나 UTF-32 인코딩이 됩니다. 기본적으로 파이썬과 같은 언어에서는 UTF32가 쓰입니다. 클라이언트 개발 언어별로 결정되어 있다고 보는 게 맞습니다. C++에서 std::wstring 를 쓰시면 UTF32를 쓰는 것이 맞고, 일반 std::string를 쓰시면 UTF8을 쓰시는 게 맞습니다. 통상적으로 Go언어, C++의 경우에는 UTF-8을 씁니다. 자바의 경우에는 UTF-16이 쓰입니다.
custom_domain 등록한 사용자 사전의 이름을 기입합니다. 폐기되었습니다.
custom_dict_names CustomDictionaryService를 사용해서 만든 사전을 여러 개 지정한다. 하나 이상의 지정할 경우, 먼저 나오는 사전이 우선되어 사용된다.
config disable_split_sentence 문장 단위를 분할하지 않습니다. 기본값이므로 사용하지 않는 것이 좋습니다.
disable_caret_spacing 복합명사의 분리 사전을 적용하지 않습니다. 기본적으로 적용합니다. "인공지능"이라는 붙여 쓴 단어를 만나면, 원 정의가 "인공^자눙"이므로 "인공 지능"으로 분리해 냅니다.
disable_vx_spacing 보조 용언의 띄어쓰기를 최소화 합니다. 기본적으로 보조 용언을 최대한 띄어 씁니다. 이게 기본적인 맞춤법 규칙입니다.
treat_as_title 문장을 제목으로 다룹니다. 제목으로 사용하는 문장에서는 구두점을 비롯한 일부 처리가 달라집니다.
enable_limited_punctuation 제약된 구두점 사용 기능을 활성화합니다. 마침표, 물음표, 줄표 등에 대해서 허용되는 기호만 사용하도록 합니다.
enable_cleanup_whitespace 문장에 포함된 불필요한 공백을 제거합니다. 특히, 문장의 시작이나 끝에 붙어 있는 불필요한 공백을 제거하도록 할 수 있습니다.
enable_sentence_check 문장 내 호응 관계까지 분석합니다.

## 교정 응답

응답 메시지 정의

// 교정의 응답
message CorrectErrorResponse {
// 원래 요청 문서
string origin = 1;
// 교정 문장 문서
string revised = 2;

// 수정된 결과들 하나 이상
repeated RevisedBlock revised_blocks = 3;

// 교정대상에서 지워야할 공백들의 목록
repeated CleanUpRange whitespace_cleanup_ranges = 9;

// 교정된 문장들
repeated RevisedSentence revised_sentences = 11;

// 교정 도움말들에 대한 정보
map<string, ReviseHelp> helps = 12;

// 텍스트의 언어, 만일 언어가 지정되지 않은 경우에는 자동으로 탐지하여 반환한다.
// 언어가 지정된 경우에는 동일한 언어를 반환한다.
// 이때, 언어는 ko_KR 등과 같이 사용한다.
string language = 99;

// 어절의 개수
int32 tokens_count = 100;
}

message RevisedSentence {
string origin = 1;
string revised = 2;
}

// RevisedBlock은 교정 대상인 원문과 수정된 결과, 이유, 사용자 사전 추가 정보를 담고 있다.
//
// - origin: 교정의 원문으로, 교정 대상이 되는 원문의 위치와 범위 정보를 담고 있다.
// - revised: 교정 결과를 포함하며, 여러 개의 교정 후보가 있는 경우 가장 대표적인
// 교정 결과를 포함한다.
// - revisions: 하나 이상의 교정 후보를 포함하며, 각 교정 결과는 점수, 카테고리,
// 도움말 정보를 포함한다.
// - nested: 여러 개의 블럭이 하나로 합쳐지는 경우, 기존의 블럭들은 nested 블럭에
// 포함된다.
// - lemma: 교정 대상에 대해 교정을 하지 않을 수도 있으며, 이를 사용자 사전에
// 추가해야 하는 경우 원형을 밝혀 추가할 수 있도록 한다.
// - pos: 사전에 추가할 경우, 해당 단어의 형태 정보를 포함한다.
//
// [여러 블럭을 합치는 경우]
// 띄어쓰기 및 붙여쓰기가 여러 블럭에 연달아 있는 경우, 그 경계가 계속해서
// 합쳐질 수 있다. 예를 들어, "`하지만아무도도와드리지않았다.`"의 경우,
// "하지만 아무도", "아무도 도와", "도와드리지", "드리지 않았다."처럼 블럭이
// 서로 경계에 닿아 있다. 이 경우 "`하지만아무도도와드리지않았다.`"를 하나의
// 블럭으로 처리한다. 이를 UI에서 계산하여 처리하는 것은 많은 노력이 필요하므로,
// 위의 4가지 경우를 `nested` 블럭에 포함하여 기술하도록 한다.
//
// [사용자 사전 후보 제시]
// 원문에 포함된 교정 블럭에 대한 교정 후보를 제시하는 것이 적절하지 않은 경우,
// 사용자는 이 단어를 새로운 사전에 등록할 수 있다. 이를 위해 등록의 원본을
// 제시한다. 예를 들어, "신박했다"라는 어절에 대해 교정한 경우, lemma로 "신박하"를
// 제시하고 "형용사"로 품사를 제시할 수 있다. 여기에는 띄어 쓴 블럭의 복합명사도
// 포함될 수 있다. 이 경우 "제품^품질관리^체계"처럼 대부분의 UI 처리 단위에서는
// 이를 세부적으로 나눠서 표현할 필요는 없지만, 포함된 블럭을 구분하여 표현하고자
// 하는 경우에도 이를 감안할 수 있다.
message RevisedBlock {
// 교정 원문의 위치 및 원문 정보
// 대부분은 어절 단위이지만, nested가 있는 경우 여러 블럭이 포함될 수 있다.
// 원문의 한 어절에 여러 개의 교정이 있는 경우에는 이를 묶을 수도 있다.
TextSpan origin = 1;
// 교정된 결과물, 여러가지 중에 하나로서 가장 대표적인 경우
string revised = 2;
// 다양한 교정 문장의 예시들
repeated Revision revisions = 3;

// 한 어절에 여러 개의 수정이 이뤄지거나,
// 서로 다른 어절의 수정이 경계를 닿아서 겹치는 경우에는
// 기존의 교정 블럭은 nested에 포함된다.
repeated RevisedBlock nested = 10;

// 사용사 사전에 추가하기 위한 기본 단위, nested가 존재하는 쓸 수 없다.
string lemma = 4;
// 사용사 사전에 추가할 품사
CustomDictPos pos = 5;
}

// 한개의 교정에 대한 정보
message Revision {
// 수정을 제안한 토큰
string revised = 1;
// 수정에 대한 점수, 점수가 높으면 수정의 후보가 높다.
double score = 2;
// RevisionCagetory 정보
RevisionCategory category = 3;
// 수정에 대한 도움말, 인덱스 정보
string help_id = 4;
}

// 교정에 대한 도움말 객체
message ReviseHelp {
// 도움말 ID, 고정된 도움말이 있을 수 있고, 동적으로 생성되는 도움말이 있을 수 있다.
string id = 1;
// 문장 교정의 카테고리
RevisionCategory category = 2;
// 바뀌어야 하는 이유에 대한 섧명
string comment = 3;
// 변경이 될 수 있는 문장들
repeated string examples = 4;
// 관련 규정
string rule_article = 5;
}

// 사용자 사전용 형태소
enum CustomDictPos {
// 해당 없음
POS_UNK = 0;
// 복합명사 사전
POS_NNG = 1;
// 고유명사 사전
POS_NNP = 2;
// 복합명사 분리 사전
POS_NNG_CARET = 3;
// 동사 사전
POS_VV = 4;
// 형용사 사전
POS_VA = 5;
// 관형사 사전
POS_MM = 6;
// 감탄사 사전
POS_IC = 7;
}

// 한국어 문장 교정의 카테고리
enum RevisionCategory {
// 교정 카테고리가 없음
UNKNOWN = 0;
// 교정 유형: 어법에 관한 사항
// 활용, 조사 결합, 구둣점 등
GRAMMER = 1;
// 교정 유형: 어법 단어 단위 규칙에 관한 사항
// 사이시옷, 두음법칙, 한자결합(율,률) 등
WORD = 2;
// 교정 유형: 띄어쓰기에 관한 사항
SPACING = 3;
// 교정 유형: 표준어 일반
STANDARD = 8;
// 교정 유형: 오탈자
TYPO = 9;
// 교정 유형: 외래어 표기법
FOREIGN_WORD = 10;
// 교정 유형: 혼동하기 쉬운 단어
CONFUSABLE_WORDS = 11;
// 교정 유형: 문장 단위 오류
SENTENCE = 12;
// 교정 유형: 확인 필요
CONFIRM = 13;
}

// CleanUpRange 교정대상에서 불필요한 공백을 지워야할 범위
message CleanUpRange {
// 위치
int32 offset = 1;
// 길이
int32 length = 2;
// 지워야할 위치에 대한 추가 정보
enum CleanUpPosition {
// 처음
START = 0;
// 끝
END = 1;
// 중간
MIDDLE = 2;
}
CleanUpPosition position = 3;
}
응답 메시지에 대한 설명
변수 서브 변수 설명
origin 원래 요청 문서의 전체 문장
revised 교정 문서 전체
revised_blocks[] 교정의 블럭을 제시하여 다양한 교정 행위를 수행할 수 있다.
origin 교정대상의 위치를 포함하는 원문의 텍스트
revised 교정된 결과물, 여러가지 중에 하나로서 가장 대표적인 경우
revisions 다양한 교정 예시들, 교정의 카테고리, 도움말 ID 정보를 포함
nested 여러 개의 블럭을 하나로 합친 경우에는 원래의 블럭이 틀리지 않았을 것이므로
이들을 포함하여 내부에 가지도록 한다. 다만 이 nested 블럭은 각각은 개별 수정만을 포함하고 있으므로
제대로 모든 블럭을 다 가지고 있을 수 없다. 고급 사용의 경우, 해당 내용만을 수정에 반영할 수 있도록 하기 위해서 마련되었다.
lemma 사용사 사전에 추가하기 위한 기본 단위, nested가 존재하는 쓸 수 없다.
whitespace_cleanup_ranges[] 교정대상에서 지워야할 공백들의 목록
offset 위치
length 길이
position START, END, MIDDLE 등 3가지 값을 가집니다.
revised_sentences[] 전체 문장 단위 교정, 문장은 자동으로 분리되어서 나타난다.
origin 교정 대상의 문장
revised 교정된 문장
helps{}
id 도움말 ID, 고정된 도움말이 있을 수 있고, 동적으로 생성되는 도움말이 있을 수 있다.
category 교정의 카테고리
comment 바뀌어야 하는 이유에 대한 섧명
examples[] 변경이 될 수 있는 문장들
rule_article 관련 규정
language 텍스트의 언어, 만일 언어가 지정되지 않은 경우에는 자동으로 탐지하여 반환한다.
언어가 지정된 경우에는 동일한 언어를 반환한다. 이때, 언어는 ko_KR 등과 같이 사용한다.
tokens_count 어절의 개수.

## 교정 범주

교정은 다음의 주요 범주로 분류됩니다:

카테고리 설명
GRAMMER 어법에 관한 사항, 활용, 조사 결합, 구둣점 등
WORD 어법 중 단어단위 규칙에 관한 사항, 사이시옷, 두음법칙 등
SPACING 띄어쓰기에 관한 사항
STANDARD 표준어 일반
TYPO 오탈자
FOREIGN_WORD 외래어 표기법
CONFUSABLE_WORDS 혼동하기 쉬운 단어
SENTENCE 문장 단위 오류
CONFIRM 확인 필요

## 교정의 예시

입력

어제도 너무더워서잠이오지를않았다.그런데, 오늘은 더심하네요.
응답

{
"origin": "어제도 너무더워서잠이오지를않았다.그런데, 오늘은 더심하네요.",
"revised": "어제도 너무 더워서 잠이 오지를 않았다. 그런데, 오늘은 더 심하네요.",
"revised*blocks": [
{
"revisions": [
{
"revised": "너무 너무 더워서 잠이 오지를 않았다. 그런데,",
"score": 0.99,
"category": "CONFIRM",
"help_id": "Merged"
}
],
"nested": [
{
"revisions": [
{
"revised": "너무 더워서잠이오지를않았다.그런데,",
"score": 0,
"category": "SPACING",
"help_id": "띄어쓰기*공통"
}
],
"nested": [],
"origin": {
"content": "너무더워서잠이오지를않았다.그런데,",
"begin*offset": 6,
"length": 0
},
"revised": "너무 더워서잠이오지를않았다.그런데,",
"lemma": "",
"pos": "POS_UNK"
},
{
"revisions": [
{
"revised": "더워서 잠이오지를않았다.그런데,",
"score": 0,
"category": "SPACING",
"help_id": "띄어쓰기*공통"
}
],
"nested": [],
"origin": {
"content": "더워서잠이오지를않았다.그런데,",
"begin*offset": 9,
"length": 0
},
"revised": "더워서 잠이오지를않았다.그런데,",
"lemma": "",
"pos": "POS_UNK"
},
{
"revisions": [
{
"revised": "잠이 오지를않았다.그런데,",
"score": 0,
"category": "SPACING",
"help_id": "띄어쓰기*공통"
}
],
"nested": [],
"origin": {
"content": "잠이오지를않았다.그런데,",
"begin*offset": 11,
"length": 0
},
"revised": "잠이 오지를않았다.그런데,",
"lemma": "",
"pos": "POS_UNK"
},
{
"revisions": [
{
"revised": "지를 않았다.그런데,",
"score": 0,
"category": "SPACING",
"help_id": "띄어쓰기*공통"
}
],
"nested": [],
"origin": {
"content": "지를않았다.그런데,",
"begin*offset": 14,
"length": 0
},
"revised": "지를 않았다.그런데,",
"lemma": "",
"pos": "POS_UNK"
},
{
"revisions": [
{
"revised": "다. 그런데,",
"score": 0,
"category": "SPACING",
"help_id": "띄어쓰기*공통"
}
],
"nested": [],
"origin": {
"content": "다.그런데,",
"begin*offset": 18,
"length": 0
},
"revised": "다. 그런데,",
"lemma": "",
"pos": "POS_UNK"
}
],
"origin": {
"content": "너무더워서잠이오지를않았다.그런데,",
"begin_offset": 4,
"length": 18
},
"revised": "너무 너무 더워서 잠이 오지를 않았다. 그런데,",
"lemma": "",
"pos": "POS_UNK"
},
{
"revisions": [
{
"revised": "더 심하네요.",
"score": 0,
"category": "SPACING",
"help_id": "띄어쓰기*공통"
}
],
"nested": [],
"origin": {
"content": "더심하네요.",
"begin*offset": 28,
"length": 0
},
"revised": "더 심하네요.",
"lemma": "",
"pos": "POS_UNK"
}
],
"revised_sentences": [
{
"origin": "어제도 너무더워서잠이오지를않았다.",
"revised": "어제도 너무 더워서 잠이 오지를 않았다."
},
{
"origin": "그런데, 오늘은 더심하네요.",
"revised": "그런데, 오늘은 더 심하네요."
}
],
"helps": {
"Merged": {
"examples": [],
"id": "Merged",
"category": "CONFIRM",
"comment": "여러 개의 수정이 하나로 합쳐져서 표현됩니다. 개별 수정은 확인이 필요합니다.",
"rule_article": ""
},
"띄어쓰기*공통": {
"examples": [
"오늘 날씨 좋다."
],
"id": "띄어쓰기\_공통",
"category": "SPACING",
"comment": "문장의 각 단어는 띄어 씀을 원칙으로 한다.",
"rule_article": "한글맞춤법, 제1장 총칙, 제2항"
}
},
"language": "ko_KR"
}

## 파이썬 클라이언트 예제

from bareunpy import Corrector

# Corrector 초기화

API_KEY = "YOUR-API-KEY" # 본인의 API 키를 입력하세요
HOST = "localhost" # 로컬 서버를 사용하는 경우
PORT = 5656 # 포트 번호
corrector = Corrector(apikey=API_KEY, host=HOST, port=PORT)

# 단일 문장 교정 테스트

print("=== 단일 문장 교정 ===")
single_sentence = "줄기가 얇아서 시들을 것 같은 꽃에물을 주었더니 고은 꽃이 피었다."
response = corrector.correct_error(content=single_sentence, auto_split=True)
print("원문:", response.origin)
print("교정문:", response.revised)

# 여러 문장 교정 테스트

print("\n=== 여러 문장 교정 ===")
multiple_sentences = [
"줄기가 얇아서 시들을 것 같은 꽃에물을 주었더니 고은 꽃이 피었다.",
"오늘은 철이네서 알타리무 다듬던데."
]

responses = corrector.correct_error_list(contents=multiple_sentences, auto_split=True)
for i, res in enumerate(responses):
print(f"\n문장 {i + 1}:")
print("원문:", res.origin)
print("교정문:", res.revised)
출력 결과

=== 단일 문장 교정 ===
원문: 줄기가 얇아서 시들을 것 같은 꽃에물을 주었더니 고은 꽃이 피었다.
교정문: 줄기가 얇아서 시들 것 같은 꽃에 물을 주었더니 고운 꽃이 피었다.

=== 여러 문장 교정 ===

문장 1:
원문: 줄기가 얇아서 시들을 것 같은 꽃에물을 주었더니 고은 꽃이 피었다.
교정문: 줄기가 얇아서 시들 것 같은 꽃에 물을 주었더니 고운 꽃이 피었다.

문장 2:
원문: 오늘은 철이네서 알타리무 다듬던데.
교정문: 오늘은 철이네서 총각무 다듬던데.
