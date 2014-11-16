/** @jsx React.DOM */

/**
 * # Stateless Pager component
 *
 * ## Usage
 * ```
 * <Pager current={3}
 *        total={20}
 *        visiblePages={5}
 *        onPageChanged={this.handlePageChanged} />
 * ```
 *
 * ## How it looks like
 * ```
 * First | Prev | ... | 6 | 7 | 8 | 9 | ... | Next | Last
 * ```
 *
 */

var React = require( 'react' );


/**
 * ## Constants
 */
var BASE_SHIFT  = 0
  , TITLE_SHIFT = 1;


/**
 * ## Constructor
 */
var Pager = React.createClass({
    propTypes: {
        current:               React.PropTypes.number.isRequired,
        total:                 React.PropTypes.number.isRequired,
        visiblePages:       React.PropTypes.number.isRequired,

        onPageChanged:         React.PropTypes.func,
        onPageSizeChanged:     React.PropTypes.func
    },
    

    /* ========================= HANDLERS =============================*/
    handleFirstPage: function () {
        if ( this.isPrevDisabled() ) return;
        this.handlePageChanged( BASE_SHIFT );
    },
    
    handlePreviousPage: function () {
        if ( this.isPrevDisabled() ) return;
        this.handlePageChanged( this.props.current - TITLE_SHIFT );
    },

    handleNextPage: function () {
        if ( this.isNextDisabled() ) return;
        this.handlePageChanged( this.props.current + TITLE_SHIFT );
    },

    handleLastPage: function () {
        if ( this.isNextDisabled() ) return;
        this.handlePageChanged( this.props.total - TITLE_SHIFT );
    },
    
    /**
     * Chooses page, that is one before min of currently visible
     * pages.
     */
    handleMorePrevPages: function () {
        var blocks = this.calcBlocks();
        this.handlePageChanged( blocks.current * blocks.size - TITLE_SHIFT );
    },

    /**
     * Chooses page, that is one after max of currently visible
     * pages.
     */
    handleMoreNextPages: function () {
        var blocks = this.calcBlocks();
        this.handlePageChanged( (blocks.current + TITLE_SHIFT) * blocks.size );
    },

    handlePageChanged: function ( el ) {
        var handler = this.props.onPageChanged;
        if ( handler ) handler( el );
    },
    

    /* ========================= HELPERS ==============================*/
    /**
     * Calculates "blocks" of buttons with page numbers.
     */
    calcBlocks: function () {
        var props      = this.props
          , total      = props.total
          , blockSize  = props.visiblePages
          , current    = props.current + TITLE_SHIFT

          , blocks     = Math.ceil( total / blockSize ) 
          , currBlock  = Math.ceil( current / blockSize ) - TITLE_SHIFT;
        
        return {
            total:    blocks,
            current:  currBlock,
            size:     blockSize
        };
    },

    isPrevDisabled: function () {
        return this.props.current <= BASE_SHIFT;
    },

    isNextDisabled: function () {
        return this.props.current >= ( this.props.total - TITLE_SHIFT );
    },

    isPrevMoreHidden: function () {
        var blocks = this.calcBlocks();
        return ( blocks.total === TITLE_SHIFT ) 
               || ( blocks.current === BASE_SHIFT );
    },

    isNextMoreHidden: function () {
        var blocks = this.calcBlocks();
        return ( blocks.total === TITLE_SHIFT ) 
               || ( blocks.current === (blocks.total - TITLE_SHIFT) );
    },

    visibleRange: function () {
        var blocks  = this.calcBlocks()
          , start   = blocks.current * blocks.size
          , delta   = this.props.total - start
          , end     = start + ( (delta > blocks.size) ? blocks.size : delta );
        return [ start + TITLE_SHIFT, end + TITLE_SHIFT ];
    },

    
    /* ========================= RENDERS ==============================*/
    render: function () {
        return (
            <nav>
                <ul className="pagination">
                    <Page className="btn-first-page"
                          isDisabled={this.isPrevDisabled()} 
                          onClick={this.handleFirstPage}>{'First'}</Page>

                    <Page className="btn-prev-page"
                          isDisabled={this.isPrevDisabled()} 
                          onClick={this.handlePreviousPage}>{'\u00AB'}</Page>

                    <Page isHidden={this.isPrevMoreHidden()}
                          onClick={this.handleMorePrevPages}>...</Page>

                    {this.renderPages( this.visibleRange() )}

                    <Page isHidden={this.isNextMoreHidden()}
                          onClick={this.handleMoreNextPages}>...</Page>

                    <Page className="btn-next-page"
                          isDisabled={this.isNextDisabled()}
                          onClick={this.handleNextPage}>{'\u00BB'}</Page>

                    <Page className="btn-last-page"
                          isDisabled={this.isNextDisabled()}
                          onClick={this.handleLastPage}>{'Last'}</Page>
                </ul>
            </nav>
        );
    },


    /**
     * ### renderPages()
     * Renders block of pages' buttons with numbers.
     * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
     * @return {React.Element[]} - array of React nodes.
     */
    renderPages: function ( pair ) {
        var self = this;
        
        return range( pair[0], pair[1] ).map(function ( el, idx ) {
            var current = el - TITLE_SHIFT
              , onClick = self.handlePageChanged.bind(null, current)
              , isActive = (self.props.current === current);

            return (<Page key={idx} isActive={isActive}
                          onClick={onClick}>{el}</Page>);
        });
    }
});



var Page = React.createClass({
    render: function () {
        if ( this.props.isHidden ) return null;

        var css = (this.props.className || '')
                  + (this.props.isActive ? 'active' : '')
                  + (this.props.isDisabled ? ' disabled' : '');

        return (
            <li key={this.props.key} className={css}>
                <a onClick={this.props.onClick}>{this.props.children}</a>
            </li>
        );
    }
});    



function range ( start, end ) {
    var res = [];
    for ( var i = start; i < end; i++ ) {
        res.push( i );
    }

    return res; 
}

module.exports = Pager;
