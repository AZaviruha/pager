# Stateless Pager component
[![NPM version][npm-image]][npm-url]
[![Code Climate][cc-image]][cc-url]

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
* [JSFiddle](http://jsfiddle.net/azaviruha/kb3gN/7743/)
* [Local](https://github.com/AZaviruha/demo-master-detail)


## TODO
* Write tests

[npm-image]: http://img.shields.io/badge/npm-v1.0.4-green.svg
[npm-url]: https://www.npmjs.org/package/react-pager
[cc-image]: https://codeclimate.com/github/AZaviruha/pager/badges/gpa.svg
[cc-url]: https://codeclimate.com/github/AZaviruha/pager
