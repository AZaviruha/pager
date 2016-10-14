/* global window = true */
/* global document = true */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

window.onload = () => {
	ReactDOM.render(React.createElement(App), document.querySelector('#app'));
};
