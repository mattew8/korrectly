import useSpellingCheckWords from '../utils/use-spelling-check-words';

const SpellingCheckSidePanelPage = () => {
  const targetWords = useSpellingCheckWords();
  return <div>{targetWords.join(', ')}</div>;
};

export default SpellingCheckSidePanelPage;
