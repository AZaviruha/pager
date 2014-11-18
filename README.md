# Stateless Pager component
[![NPM version][npm-image]][npm-url]

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

[npm-image]: https://img.shields.io/npm/v/mz.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/react-pager
