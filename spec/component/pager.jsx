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
    
    it( "should create set of numbered buttons whose length equals to `visiblePages` property", function () {
        var pager         = generatePager( 5, 20, 7 )
          , numberedPages = byClassAll( pager, 'btn-numbered-page' ).length;
        expect( numberedPages ).toEqual( 7 );

        pager         = generatePager( 5, 20, 10 );
        numberedPages = byClassAll( pager, 'btn-numbered-page' ).length;
        expect( numberedPages ).toEqual( 10 );

        pager         = generatePager( 5, 20, 0 );
        numberedPages = byClassAll( pager, 'btn-numbered-page' ).length;
        expect( numberedPages ).toEqual( 0 );
    });


    it( "should disable `fistPage` button if `current` equals to `0`", function () {
        var pager       = generatePager( 0, 20, 5 )
          , btnPrevPage = byClass( pager, 'btn-first-page' );
        expect( btnPrevPage.props.className ).toContain( 'disabled' );

        pager       = generatePager( 1, 20, 5 );
        btnPrevPage = byClass( pager, 'btn-first-page' );
        expect( btnPrevPage.props.className ).not.toContain( 'disabled' );
    });


    it( "should disable `prevPage` button if `current` equals to `0`", function () {
        var pager       = generatePager( 0, 20, 5 )
          , btnPrevPage = byClass( pager, 'btn-prev-page' );
        expect( btnPrevPage.props.className ).toContain( 'disabled' );

        pager       = generatePager( 1, 20, 5 );
        btnPrevPage = byClass( pager, 'btn-prev-page' );
        expect( btnPrevPage.props.className ).not.toContain( 'disabled' );
    });
    

    it( "should disable `nextPage` button if `current` equals to `total-1`", function () {
        var pager       = generatePager( 19, 20, 5 )
          , btnPrevPage = byClass( pager, 'btn-next-page' );
        expect( btnPrevPage.props.className ).toContain( 'disabled' );

        pager       = generatePager( 18, 20, 5 );
        btnPrevPage = byClass( pager, 'btn-next-page' );
        expect( btnPrevPage.props.className ).not.toContain( 'disabled' );
    });
    

    it( "should disable `lastPage` button if `current` equals to `total-1`", function () {
        var pager       = generatePager( 19, 20, 5 )
          , btnPrevPage = byClass( pager, 'btn-last-page' );
        expect( btnPrevPage.props.className ).toContain( 'disabled' );

        pager       = generatePager( 18, 20, 5 );
        btnPrevPage = byClass( pager, 'btn-last-page' );
        expect( btnPrevPage.props.className ).not.toContain( 'disabled' );
    });
    

    it( "should increment active button number after click on `nextPage` button", function () {
        var pager         = generatePager( 3, 20, 5, handler )
          , btnNextPage   = byClass( pager, 'btn-next-page' )
          , numberedPages = byClassAll( pager, 'btn-numbered-page' );
        expect( nth( numberedPages, 'active' ) ).toEqual( 3 );
        
        TestUtils.Simulate.click( byTag( btnNextPage, 'a') );
        function handler ( next ) { expect( next ).toEqual( 4 ); }
    });
    

    it( "should decrement active button number after click on `prevPage` button", function () {
        var pager         = generatePager( 3, 20, 5, handler )
          , btnPrevPage   = byClass( pager, 'btn-prev-page' )
          , numberedPages = byClassAll( pager, 'btn-numbered-page' );
        expect( nth( numberedPages, 'active' ) ).toEqual( 3 );
        
        TestUtils.Simulate.click( byTag( btnPrevPage, 'a') );
        function handler ( next ) { expect( next ).toEqual( 2 ); }
    });


    it( "should return `0` after click on `firstPage` button", function () {
        var pager         = generatePager( 3, 20, 5, handler )
          , btnFirstPage   = byClass( pager, 'btn-first-page' )
          , numberedPages = byClassAll( pager, 'btn-numbered-page' );
        expect( nth( numberedPages, 'active' ) ).toEqual( 3 );
        
        TestUtils.Simulate.click( byTag( btnFirstPage, 'a') );
        function handler ( next ) { expect( next ).toEqual( 0 ); }
    });


    it( "should return `total-1` after click on `lastPage` button", function () {
        var pager         = generatePager( 3, 20, 5, handler )
          , btnLastPage   = byClass( pager, 'btn-last-page' )
          , numberedPages = byClassAll( pager, 'btn-numbered-page' );
        expect( nth( numberedPages, 'active' ) ).toEqual( 3 );
        
        TestUtils.Simulate.click( byTag( btnLastPage, 'a') );
        function handler ( next ) { expect( next ).toEqual( 19 ); }
    });

    function generatePager ( c, t, v, f ) {
        return TestUtils.renderIntoDocument(
            <Pager current={c}
                   total={t}
                   visiblePages={v}
                   onPageChanged={f} />
        );
    }
    
    
    it( "should return `total-1` after click on `lastPage` button", function () {
        var pager         = generatePager( 3, 20, 5, handler )
          , btnLastPage   = byClass( pager, 'btn-last-page' )
          , numberedPages = byClassAll( pager, 'btn-numbered-page' );
        expect( nth( numberedPages, 'active' ) ).toEqual( 3 );
        
        TestUtils.Simulate.click( byTag( btnLastPage, 'a') );
        function handler ( next ) { expect( next ).toEqual( 19 ); }
    });
    

    it( "should render labels for buttons according to `titles` prop", function () {
        var titles = {
            first:   '|<',
            prev:    '<',
            prevSet: '<#',
            nextSet: '#>',
            next:    '>',
            last:    '>|'
        };

        var pager = TestUtils.renderIntoDocument(
            <Pager current={3}
                   total={20}
                   visiblePages={5}
                   titles={titles} />);


        var btnFirstPage  = byClass( pager, 'btn-first-page' )
          , btnPrevPage   = byClass( pager, 'btn-prev-page' )
          //, btnPrevSet    = byClass( pager, 'btn-prev-more' )
          , btnNextPage   = byClass( pager, 'btn-next-page' )
          , btnNextSet    = byClass( pager, 'btn-next-more' )
          , btnLastPage   = byClass( pager, 'btn-last-page' );

        expect( btnFirstPage.getDOMNode().textContent ).toEqual( titles.first );
        expect( btnPrevPage.getDOMNode().textContent ).toEqual( titles.prev );
        expect( btnNextSet.getDOMNode().textContent ).toEqual( titles.nextSet );
        expect( btnNextPage.getDOMNode().textContent ).toEqual( titles.next );
        expect( btnLastPage.getDOMNode().textContent ).toEqual( titles.last );
    });


    function generatePager ( c, t, v, f ) {
        return TestUtils.renderIntoDocument(
            <Pager current={c}
                   total={t}
                   visiblePages={v}
                   onPageChanged={f} />
        );
    }


    function nth ( comps, css ) {
        var res = -1
          , className;

        for ( var i = 0, len = comps.length; i < len; i++ ) {
            className = comps[ i ].props.className;
            if ( typeof className === 'string' )
                if ( className.indexOf( css ) === -1 )
                    res += 1;
                else 
                    return res + 1;
        }
        
        return res;
    }
});
