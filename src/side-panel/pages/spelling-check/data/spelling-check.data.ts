export const EXAMPLE_SENTENCE = `이번 겨울 에는 친구들과 여행을 가기로했어요.
여행지는 바닷가 근처로 정해졌는데요 정말 기대되요.
출발 전 날에는 필요한 짐 을 미리 챙길 생각이에요.
따뜻한 옷 이랑 얇은 옷도 같이 챙겨야 겠어요.
먹을거리도 준비 해야하는데 과자와 음료수는 필수죠.
그리고 캠핑 장비도 몇 가지 빌려야 될거같아요.
여행 가는 날 아침에는 일찍 일어나야 해요 늦잠 자면 큰일이거든요.
버스를 타고 가면서 친구들이랑 간식 을 먹으며 수다 떨 예정이에요.
도착 하면 사진 도 많이 찍고 좋은 추억을 만들고 싶어요.
이번 여행이 오래 기억에 남는 멋진 시간이 되었으면 좋겠어요.`;

export const EXAMPLE_RESULT = [
  {
    sentence: '이번 겨울 에는 친구들과 여행을 가기로했어요.',
    result: [
      {
        input: '겨울 에는',
        output: '겨울에는',
        etype: 'error',
      },
      {
        input: '가기로했어요',
        output: '가기로 했어요',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '여행지는 바닷가 근처로 정해졌는데요 정말 기대되요.',
    result: [
      {
        input: '기대되요',
        output: '기대돼요',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '출발 전 날에는 필요한 짐 을 미리 챙길 생각이에요.',
    result: [
      {
        input: '짐 을',
        output: '짐을',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '따뜻한 옷 이랑 얇은 옷도 같이 챙겨야 겠어요.',
    result: [
      {
        input: '옷 이랑',
        output: '옷이랑',
        etype: 'error',
      },
      {
        input: '챙겨야 겠어요',
        output: '챙겨야겠어요',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '먹을거리도 준비 해야하는데 과자와 음료수는 필수죠.',
    result: [
      {
        input: '준비 해야하는데',
        output: '준비해야 하는데',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '그리고 캠핑 장비도 몇 가지 빌려야 될거같아요.',
    result: [
      {
        input: '될거같아요',
        output: '될 것 같아요',
        etype: 'error',
      },
    ],
  },
  {
    sentence:
      '여행 가는 날 아침에는 일찍 일어나야 해요 늦잠 자면 큰일이거든요.',
    result: [
      {
        input: '해요 늦잠',
        output: '해요. 늦잠',
        etype: 'error',
      },
    ],
  },
  {
    sentence:
      '버스를 타고 가면서 친구들이랑 간식 을 먹으며 수다 떨 예정이에요.',
    result: [
      {
        input: '간식 을',
        output: '간식을',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '도착 하면 사진 도 많이 찍고 좋은 추억을 만들고 싶어요.',
    result: [
      {
        input: '도착 하면',
        output: '도착하면',
        etype: 'error',
      },
      {
        input: '사진 도',
        output: '사진도',
        etype: 'error',
      },
    ],
  },
  {
    sentence: '이번 여행이 오래 기억에 남는 멋진 시간이 되었으면 좋겠어요.',
    result: [],
  },
];
