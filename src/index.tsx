import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import './styles/App.css';
import './styles/index.css';
import App from './routes/Routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
