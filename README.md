# Stateless Pager component
[![Code Climate][cc-image]][cc-url]
[![Build Status][travis-image]][travis-url]<br />
[![NPM version][npm-stats]][npm-url]


## Getting started

```javascript
import React from 'react';
import { render } from 'react-dom';
import Pager from 'react-pager';

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
				titles={{ first: '<|', last: '>|' }}
				className="pagination-sm pull-right"
				onPageChanged={this.handlePageChanged}
			/>
		);
	}
}

window.onload = () => {
	render(React.createElement(App), document.querySelector('#app'));
};

```

## How it looks like*

![First | Prev | ... | 6 | 7 | 8 | 9 | ... | Next | Last](./img/pager-default.png)

\* Bootstrap 3.0 is required by default, but you can replace it with your own css.


## Demo

Just open `demo/index.html` in your browser.
Or see interactive demo [here](http://azaviruha.github.io/demo/react-pager/).



## Tests

```sh
npm test
```

## Changelog

### v1.3.0
* @kallaspriit fixed [#16](https://github.com/AZaviruha/pager/issues/16)
* Updates devDependencies
* Move building procedure to Docker

### v1.2.1
* Fixed [#12](https://github.com/AZaviruha/pager/issues/12)

### v1.2.0
* Rewrited all to ES6.
* Switched from gulp + browserify to webpack.
* Now officially supports only React >= 15.0.0

### v1.1.4
* Updated to React 15. Thanks to contributors!

### v1.1.1
* Updated to React 0.13.
* Updated local demo. 

### v1.1.0
* Added `titles` property. See [demo](http://jsfiddle.net/azaviruha/kb3gN/10213/).
* Improved building script.

### v1.0.6
* Fixed `<li class="undefined" ..` in "more" and "less" buttons.
* Added a few unit-tests.


## Contributors

See [contributors](https://github.com/AZaviruha/pager/graphs/contributors).


[npm-stats]: https://nodei.co/npm/react-pager.png?compact=true
[npm-url]: https://www.npmjs.org/package/react-pager
[cc-image]: https://codeclimate.com/github/AZaviruha/pager/badges/gpa.svg
[cc-url]: https://codeclimate.com/github/AZaviruha/pager
[travis-image]: https://travis-ci.org/AZaviruha/pager.svg?branch=master
[travis-url]: https://travis-ci.org/AZaviruha/pager
