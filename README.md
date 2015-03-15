# Stateless Pager component
[![NPM version][npm-image]][npm-url]
[![Code Climate][cc-image]][cc-url]
[![Build Status][travis-image]][travis-url]


## Getting started
### browserify
```sh
var Pager = require( 'react-pager' );
```

### Global scripts
dist/pager.min.js is prebuilded for using in global `<script>` tag.
(It's used in JSFiddle demo).


## Usage
```
var Pager = require( 'react-pager' );

var PagerDemo = React.createClass({
    getInitialState: function () {
        return {
            total:        11,
            current:      7,
            visiblePages: 3
        };
    },
    
    handlePageChanged: function ( newPage ) {
        this.setState({ current : newPage });
    },
    
    render: function() {
        return (<Pager total={this.state.total}
                       current={this.state.current}
                       
                       {/* Optional */}
                       titles={{
                           first:   'First',
                           prev:    '\u00AB',
                           prevSet: '...',
                           nextSet: '...',
                           next:    '\u00BB',
                           last:    'Last'
                       }}
                       
                       visiblePages={this.state.visiblePages}
                       onPageChanged={this.handlePageChanged}/>);
    }
});

React.render(<PagerDemo />, document.body);
```


## How it looks like*
```
First | Prev | ... | 6 | 7 | 8 | 9 | ... | Next | Last
```

\* Bootstrap 3.0 is required by default, but you can replace it with your own css.


## Demo
```shell
gulp demo -p 8003 
```
or
```shell
./node_modules/.bin/gulp demo -p 8003
```

[JSFiddle](http://jsfiddle.net/azaviruha/69z2wepo/4060/)


## Tests
```sh
npm test
```

## Changelog
### v1.1.1
* Updated to React 0.13.
* Updated local demo. 

### v1.1.0
* Added `titles` property. See [demo](http://jsfiddle.net/azaviruha/kb3gN/10213/).
* Improved building script.

### v1.0.6
* Fixed `<li class="undefined" ..` in "more" and "less" buttons.
* Added a few unit-tests.


[npm-image]: http://img.shields.io/badge/npm-v1.1.1-green.svg
[npm-url]: https://www.npmjs.org/package/react-pager
[cc-image]: https://codeclimate.com/github/AZaviruha/pager/badges/gpa.svg
[cc-url]: https://codeclimate.com/github/AZaviruha/pager
[travis-image]: https://travis-ci.org/AZaviruha/pager.svg?branch=master
[travis-url]: https://travis-ci.org/AZaviruha/pager
