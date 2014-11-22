/** @jsx React.DOM */
// For PhantomJS. 
// See https://github.com/facebook/react/pull/347#issuecomment-24625365
require( 'es5-shim' );

var React      = require( 'react/addons' )
  , TestUtils  = React.addons.TestUtils
  , byTag      = TestUtils.findRenderedDOMComponentWithTag 
  , byClass    = TestUtils.findRenderedDOMComponentWithClass 
  , byClassAll = TestUtils.scryRenderedDOMComponentsWithClass 
  , Pager      = require( '../../dist/pager' );

describe( "react-pager component", function () {
    it( "should create set of numbered buttons whos length equals to `visiblePages` property", function () {
        var pager = TestUtils.renderIntoDocument(
            <Pager current={3}
                   total={20}
                   visiblePages={5}
                   onPageChanged={function () {}} />
        );
        var numberedPages = byClassAll( pager, 'btn-numbered-page' ).length;
        expect( numberedPages ).toEqual( 5 );
    });
});
