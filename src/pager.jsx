/**
 * # Stateless Pager component
 *
 * ## Usage
 * ```
 * <Pager current={3}
 *        total={20}
 *        visiblePages={5}
 *        onPageChanged={this.handlePageChanged}
 *        titles={{
 *            first:   "First",
 *            prev:    "Prev",
 *            prevSet: "<<<",
 *            nextSet: ">>>",
 *            next:    "Next",
 *            last:    "Last"
 *        }} />
 * ```
 *
 * ## How it looks like
 * ```
 * First | Prev | ... | 6 | 7 | 8 | 9 | ... | Next | Last
 * ```
 *
 */

import React, {Component, PropTypes} from 'react';


/**
 * ## Constants
 */
const BASE_SHIFT  = 0
  , TITLE_SHIFT = 1
  , TITLES = {
        first:   'First',
        prev:    '\u00AB',
        prevSet: '...',
        nextSet: '...',
        next:    '\u00BB',
        last:    'Last'
    };

/**
 * ## Constructor
 */
class Pager extends Component {
    constructor(props) {
      super(props);
    }
    static propTypes = {
        current:               PropTypes.number.isRequired,
        total:                 PropTypes.number.isRequired,
        visiblePages:          PropTypes.number.isRequired,
        titles:                PropTypes.object,

        onPageChanged:         PropTypes.func,
        onPageSizeChanged:     PropTypes.func
    }


    /* ========================= HANDLERS =============================*/
    handleFirstPage = () => {
        if ( this.isPrevDisabled() ) return;
        this.handlePageChanged( BASE_SHIFT );
    }

    handlePreviousPage = () => {
        if ( this.isPrevDisabled() ) return;
        this.handlePageChanged( this.props.current - TITLE_SHIFT );
    }

    handleNextPage = () => {
        if ( this.isNextDisabled() ) return;
        this.handlePageChanged( this.props.current + TITLE_SHIFT );
    }

    handleLastPage = () => {
        if ( this.isNextDisabled() ) return;
        this.handlePageChanged( this.props.total - TITLE_SHIFT );
    }

    /**
     * Chooses page, that is one before min of currently visible
     * pages.
     */
    handleMorePrevPages = () => {
        var blocks = this.calcBlocks();
        this.handlePageChanged( blocks.current * blocks.size - TITLE_SHIFT );
    }

    /**
     * Chooses page, that is one after max of currently visible
     * pages.
     */
    handleMoreNextPages = () => {
        var blocks = this.calcBlocks();
        this.handlePageChanged( (blocks.current + TITLE_SHIFT) * blocks.size );
    }

    handlePageChanged = (el) => {
        var handler = this.props.onPageChanged;
        if ( handler ) handler( el );
    }


    /* ========================= HELPERS ==============================*/
    /**
     * Calculates "blocks" of buttons with page numbers.
     */
    calcBlocks = () => {
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
    }

    isPrevDisabled = () => {
        return this.props.current <= BASE_SHIFT;
    }

    isNextDisabled = () => {
        return this.props.current >= ( this.props.total - TITLE_SHIFT );
    }

    isPrevMoreHidden = () => {
        var blocks = this.calcBlocks();
        return ( blocks.total === TITLE_SHIFT )
               || ( blocks.current === BASE_SHIFT );
    }

    isNextMoreHidden = () => {
        var blocks = this.calcBlocks();
        return ( blocks.total === TITLE_SHIFT )
               || ( blocks.current === (blocks.total - TITLE_SHIFT) );
    }

    visibleRange = () => {
        var blocks  = this.calcBlocks()
          , start   = blocks.current * blocks.size
          , delta   = this.props.total - start
          , end     = start + ( (delta > blocks.size) ? blocks.size : delta );
        return [ start + TITLE_SHIFT, end + TITLE_SHIFT ];
    }


    getTitles = (key) => {
        var pTitles = this.props.titles || {};
        return pTitles[ key ] || TITLES[ key ];
    }

    /* ========================= RENDERS ==============================*/
    renderIcons = (name) => {
      var useTag = '<use xlink:href="#dt-icons-' + name + '" />';

      return <svg className="pagination-btn-icon" dangerouslySetInnerHTML={{__html: useTag}} />
    }

    render() {
        var titles = this.getTitles;

        return (
            <nav className="pagination">
              <Page className="pagination-btn"
                    key="pagination-prev-page"
                    isDisabled={this.isPrevDisabled()}
                    onClick={this.handleFirstPage}>{this.renderIcons('chevron-double-left')}</Page>

              <Page className="pagination-btn"
                    key="pagination-first-page"
                    isDisabled={this.isPrevDisabled()}
                    onClick={this.handlePreviousPage}>{this.renderIcons('chevron-left')}</Page>

              <Page className="pagination-btn pagination-btn-more"
                    key="pagination-prev-more"
                    isHidden={this.isPrevMoreHidden()}
                    onClick={this.handleMorePrevPages}>{titles('prevSet')}</Page>

              {this.renderPages( this.visibleRange() )}

              <Page className="pagination-btn pagination-btn-more"
                    key="pagination-next-more"
                    isHidden={this.isNextMoreHidden()}
                    onClick={this.handleMoreNextPages}>{titles('nextSet')}</Page>

              <Page className="pagination-btn"
                    key="pagination-last-page"
                    isDisabled={this.isNextDisabled()}
                    onClick={this.handleNextPage}>{this.renderIcons('chevron-right')}</Page>

              <Page className="pagination-btn"
                    key="pagination-next-page"
                    isDisabled={this.isNextDisabled()}
                    onClick={this.handleLastPage}>{this.renderIcons('chevron-double-right')}</Page>
            </nav>
        );
    }


    /**
     * ### renderPages()
     * Renders block of pages' buttons with numbers.
     * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
     * @return {React.Element[]} - array of React nodes.
     */
    renderPages = (pair) => {
        var self = this;

        return range( pair[0], pair[1] ).map(function ( el, idx ) {
            var current = el - TITLE_SHIFT
              , onClick = self.handlePageChanged.bind(null, current)
              , isActive = (self.props.current === current);

            return (<Page key={idx} isActive={isActive}
                          className="pagination-btn"
                          onClick={onClick}>{el}</Page>);
        });
    }
}



const Page = ({isHidden, isActive, className, onClick, children, key}) => {
    if ( isHidden ) return null;

    const baseCss = className ? className + ' ' : ''
      , css     = baseCss
                  + (isActive ? 'active' : '')
                  + (isDisabled ? ' disabled' : '');

    return (
        <button key={key} className={css} onClick={onClick}>
          {children}
        </button>
    );
}



function range ( start, end ) {
    var res = [];
    for ( var i = start; i < end; i++ ) {
        res.push( i );
    }

    return res;
}

export default Pager;
