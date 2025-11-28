import ReactDOM from 'react-dom/client';
import ContentScript from './content-script/ContentScript';

const appContainer = document.createElement('div');
appContainer.id = 'korrectly-root';
document.body.appendChild(appContainer);

const root = document.getElementById('korrectly-root');
if (root) {
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(<ContentScript />);
}
