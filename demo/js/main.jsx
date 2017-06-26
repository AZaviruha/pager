/* global window = true */
/* global document = true */

import React from 'react';
import { render } from 'react-dom';
import Pager from '../../dist/pager.js';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.handlePageChanged = this.handlePageChanged.bind(this);

		this.state = {
			total:       11,
			current:     7,
			visiblePage: 3,
		};
	}

	handlePageChanged(newPage) {
		this.setState({ current : newPage });
	}

	render() {
		return (
			<Pager
				total={this.state.total}
				current={this.state.current}
				visiblePages={this.state.visiblePage}
				titles={{ first: '<|', last: '|>' }}
				onPageChanged={this.handlePageChanged}
			/>
		);
	}
}


window.onload = () => {
	render(React.createElement(App), document.querySelector('#app'));
};
