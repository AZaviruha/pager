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

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * ## Constants
 */
var BASE_SHIFT = 0,
    TITLE_SHIFT = 1,
    TITLES = {
    first: 'First',
    prev: '«',
    prevSet: '...',
    nextSet: '...',
    next: '»',
    last: 'Last'
};

/**
 * ## Constructor
 */

var Pager = (function (_Component) {
    _inherits(Pager, _Component);

    function Pager(props) {
        var _this = this;

        _classCallCheck(this, Pager);

        _get(Object.getPrototypeOf(Pager.prototype), 'constructor', this).call(this, props);

        this.handleFirstPage = function () {
            if (_this.isPrevDisabled()) return;
            _this.handlePageChanged(BASE_SHIFT);
        };

        this.handlePreviousPage = function () {
            if (_this.isPrevDisabled()) return;
            _this.handlePageChanged(_this.props.current - TITLE_SHIFT);
        };

        this.handleNextPage = function () {
            if (_this.isNextDisabled()) return;
            _this.handlePageChanged(_this.props.current + TITLE_SHIFT);
        };

        this.handleLastPage = function () {
            if (_this.isNextDisabled()) return;
            _this.handlePageChanged(_this.props.total - TITLE_SHIFT);
        };

        this.handleMorePrevPages = function () {
            var blocks = _this.calcBlocks();
            _this.handlePageChanged(blocks.current * blocks.size - TITLE_SHIFT);
        };

        this.handleMoreNextPages = function () {
            var blocks = _this.calcBlocks();
            _this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
        };

        this.handlePageChanged = function (el) {
            var handler = _this.props.onPageChanged;
            if (handler) handler(el);
        };

        this.calcBlocks = function () {
            var props = _this.props,
                total = props.total,
                blockSize = props.visiblePages,
                current = props.current + TITLE_SHIFT,
                blocks = Math.ceil(total / blockSize),
                currBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

            return {
                total: blocks,
                current: currBlock,
                size: blockSize
            };
        };

        this.isPrevDisabled = function () {
            return _this.props.current <= BASE_SHIFT;
        };

        this.isNextDisabled = function () {
            return _this.props.current >= _this.props.total - TITLE_SHIFT;
        };

        this.isPrevMoreHidden = function () {
            var blocks = _this.calcBlocks();
            return blocks.total === TITLE_SHIFT || blocks.current === BASE_SHIFT;
        };

        this.isNextMoreHidden = function () {
            var blocks = _this.calcBlocks();
            return blocks.total === TITLE_SHIFT || blocks.current === blocks.total - TITLE_SHIFT;
        };

        this.visibleRange = function () {
            var blocks = _this.calcBlocks(),
                start = blocks.current * blocks.size,
                delta = _this.props.total - start,
                end = start + (delta > blocks.size ? blocks.size : delta);
            return [start + TITLE_SHIFT, end + TITLE_SHIFT];
        };

        this.getTitles = function (key) {
            var pTitles = _this.props.titles || {};
            return pTitles[key] || TITLES[key];
        };

        this.renderIcons = function (name) {
            var useTag = '<use xlink:href="#dt-icons-' + name + '" />';

            return _react2['default'].createElement('svg', { className: 'pagination-btn-icon', dangerouslySetInnerHTML: { __html: useTag } });
        };

        this.renderPages = function (pair) {
            var self = _this;

            return range(pair[0], pair[1]).map(function (el, idx) {
                var current = el - TITLE_SHIFT,
                    onClick = self.handlePageChanged.bind(null, current),
                    isActive = self.props.current === current;

                return _react2['default'].createElement(
                    Page,
                    { key: idx, isActive: isActive,
                        className: 'pagination-btn',
                        onClick: onClick },
                    el
                );
            });
        };
    }

    _createClass(Pager, [{
        key: 'render',
        value: function render() {
            var titles = this.getTitles;

            return _react2['default'].createElement(
                'nav',
                { className: 'pagination' },
                _react2['default'].createElement(
                    Page,
                    { className: 'pagination-btn',
                        key: 'pagination-prev-page',
                        isDisabled: this.isPrevDisabled(),
                        onClick: this.handleFirstPage },
                    this.renderIcons('chevron-double-left')
                ),
                _react2['default'].createElement(
                    Page,
                    { className: 'pagination-btn',
                        key: 'pagination-first-page',
                        isDisabled: this.isPrevDisabled(),
                        onClick: this.handlePreviousPage },
                    this.renderIcons('chevron-left')
                ),
                _react2['default'].createElement(
                    Page,
                    { className: 'pagination-btn pagination-btn-more',
                        key: 'pagination-prev-more',
                        isHidden: this.isPrevMoreHidden(),
                        onClick: this.handleMorePrevPages },
                    titles('prevSet')
                ),
                this.renderPages(this.visibleRange()),
                _react2['default'].createElement(
                    Page,
                    { className: 'pagination-btn pagination-btn-more',
                        key: 'pagination-next-more',
                        isHidden: this.isNextMoreHidden(),
                        onClick: this.handleMoreNextPages },
                    titles('nextSet')
                ),
                _react2['default'].createElement(
                    Page,
                    { className: 'pagination-btn',
                        key: 'pagination-last-page',
                        isDisabled: this.isNextDisabled(),
                        onClick: this.handleNextPage },
                    this.renderIcons('chevron-right')
                ),
                _react2['default'].createElement(
                    Page,
                    { className: 'pagination-btn',
                        key: 'pagination-next-page',
                        isDisabled: this.isNextDisabled(),
                        onClick: this.handleLastPage },
                    this.renderIcons('chevron-double-right')
                )
            );
        }

        /**
         * ### renderPages()
         * Renders block of pages' buttons with numbers.
         * @param {Number[]} range - pair of [start, from], `from` - not inclusive.
         * @return {React.Element[]} - array of React nodes.
         */
    }], [{
        key: 'propTypes',
        value: {
            current: _react.PropTypes.number.isRequired,
            total: _react.PropTypes.number.isRequired,
            visiblePages: _react.PropTypes.number.isRequired,
            titles: _react.PropTypes.object,

            onPageChanged: _react.PropTypes.func,
            onPageSizeChanged: _react.PropTypes.func
        },

        /* ========================= HANDLERS =============================*/
        enumerable: true
    }]);

    return Pager;
})(_react.Component);

var Page = function Page(_ref) {
    var isHidden = _ref.isHidden;
    var isActive = _ref.isActive;
    var className = _ref.className;
    var onClick = _ref.onClick;
    var children = _ref.children;
    var key = _ref.key;

    if (isHidden) return null;

    var baseCss = className ? className + ' ' : '',
        css = baseCss + (isActive ? 'active' : '') + (isDisabled ? ' disabled' : '');

    return _react2['default'].createElement(
        'button',
        { key: key, className: css, onClick: onClick },
        children
    );
};

function range(start, end) {
    var res = [];
    for (var i = start; i < end; i++) {
        res.push(i);
    }

    return res;
}

exports['default'] = Pager;
module.exports = exports['default'];

/**
 * Chooses page, that is one before min of currently visible
 * pages.
 */

/**
 * Chooses page, that is one after max of currently visible
 * pages.
 */

/* ========================= HELPERS ==============================*/
/**
 * Calculates "blocks" of buttons with page numbers.
 */

/* ========================= RENDERS ==============================*/