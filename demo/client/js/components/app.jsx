/** @jsx React.DOM */

var React = require( 'react' )
/* , RB    = require( 'react-bootstrap' ) */
  , Pager = require( '../../../../../dist/pager' );

var App = React.createClass({
    getInitialState: function () {
        return {
            total:       11,
            current:     7,
            visiblePage: 3
        };
    },
    
    handlePageChanged: function ( newPage ) {
        this.setState({ current : newPage });
    },
    
    render: function() {
        return (<Pager total={this.state.total}
                       current={this.state.current}
                       visiblePages={this.state.visiblePage}
                       titles={{first: '<|', last: '>|'}}
                       onPageChanged={this.handlePageChanged}/>);
    }
});


module.exports = App;
