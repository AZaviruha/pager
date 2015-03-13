/** @jsx React.DOM */

var $      = require( 'jquery' )
  , React  = require( 'react' )
  , App    = require( './components/compiled/app' );

$(function () {
    React.render( <App />, document.body );
});
