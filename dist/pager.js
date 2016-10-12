(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'react'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('react'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.react);
		global.pager = mod.exports;
	}
})(this, function (exports, _react) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/**
  * ## Constants
  */
	var BASE_SHIFT = 0; /**
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

	var TITLE_SHIFT = 1;

	var TITLES = {
		first: 'First',
		prev: '\xAB',
		prevSet: '...',
		nextSet: '...',
		next: '\xBB',
		last: 'Last'
	};

	/**
  * ## Constructor
  */
	var Pager = _react2.default.createClass({
		displayName: 'Pager',

		propTypes: {
			current: _react2.default.PropTypes.number.isRequired,
			total: _react2.default.PropTypes.number.isRequired,
			visiblePages: _react2.default.PropTypes.number.isRequired,
			titles: _react2.default.PropTypes.object,

			onPageChanged: _react2.default.PropTypes.func,
			onPageSizeChanged: _react2.default.PropTypes.func
		},

		getTitles: function getTitles(key) {
			return (this.props.titles || TITLES)[key];
		},
		calcBlocks: function calcBlocks() {
			var props = this.props;
			var total = props.total;
			var blockSize = props.visiblePages;
			var current = props.current + TITLE_SHIFT;
			var blocks = Math.ceil(total / blockSize);
			var currBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

			return {
				total: blocks,
				current: currBlock,
				size: blockSize
			};
		},
		isPrevDisabled: function isPrevDisabled() {
			return this.props.current <= BASE_SHIFT;
		},
		isNextDisabled: function isNextDisabled() {
			return this.props.current >= this.props.total - TITLE_SHIFT;
		},
		isPrevMoreHidden: function isPrevMoreHidden() {
			var blocks = this.calcBlocks();
			return blocks.total === TITLE_SHIFT || blocks.current === BASE_SHIFT;
		},
		isNextMoreHidden: function isNextMoreHidden() {
			var blocks = this.calcBlocks();
			return blocks.total === TITLE_SHIFT || blocks.current === blocks.total - TITLE_SHIFT;
		},
		visibleRange: function visibleRange() {
			var blocks = this.calcBlocks();
			var start = blocks.current * blocks.size;
			var delta = this.props.total - start;
			var end = start + (delta > blocks.size ? blocks.size : delta);

			return [start + TITLE_SHIFT, end + TITLE_SHIFT];
		},
		handleFirstPage: function handleFirstPage() {
			if (!this.isPrevDisabled()) {
				this.handlePageChanged(BASE_SHIFT);
			}
		},
		handlePreviousPage: function handlePreviousPage() {
			if (!this.isPrevDisabled()) {
				this.handlePageChanged(this.props.current - TITLE_SHIFT);
			}
		},
		handleNextPage: function handleNextPage() {
			if (!this.isNextDisabled()) {
				this.handlePageChanged(this.props.current + TITLE_SHIFT);
			}
		},
		handleLastPage: function handleLastPage() {
			if (!this.isNextDisabled()) {
				this.handlePageChanged(this.props.total - TITLE_SHIFT);
			}
		},
		handleMorePrevPages: function handleMorePrevPages() {
			var blocks = this.calcBlocks();
			this.handlePageChanged(blocks.current * blocks.size - TITLE_SHIFT);
		},
		handleMoreNextPages: function handleMoreNextPages() {
			var blocks = this.calcBlocks();
			this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
		},
		handlePageChanged: function handlePageChanged(el) {
			var handler = this.props.onPageChanged;
			if (handler) handler(el);
		},
		renderPages: function renderPages(pair) {
			var _this = this;

			return range(pair[0], pair[1]).map(function (el, idx) {
				var current = el - TITLE_SHIFT;
				var onClick = _this.handlePageChanged.bind(null, current);
				var isActive = _this.props.current === current;

				return _react2.default.createElement(
					Page,
					{
						key: idx,
						index: idx, isActive: isActive,
						className: 'btn-numbered-page',
						onClick: onClick
					},
					el
				);
			});
		},
		render: function render() {
			var titles = this.getTitles;

			return _react2.default.createElement(
				'nav',
				null,
				_react2.default.createElement(
					'ul',
					{ className: 'pagination' },
					_react2.default.createElement(
						Page,
						{
							className: 'btn-first-page',
							key: 'btn-first-page',
							isDisabled: this.isPrevDisabled(),
							onClick: this.handleFirstPage
						},
						titles('first')
					),
					_react2.default.createElement(
						Page,
						{
							className: 'btn-prev-page',
							key: 'btn-prev-page',
							isDisabled: this.isPrevDisabled(),
							onClick: this.handlePreviousPage
						},
						titles('prev')
					),
					_react2.default.createElement(
						Page,
						{
							className: 'btn-prev-more',
							key: 'btn-prev-more',
							isHidden: this.isPrevMoreHidden(),
							onClick: this.handleMorePrevPages
						},
						titles('prevSet')
					),
					this.renderPages(this.visibleRange()),
					_react2.default.createElement(
						Page,
						{
							className: 'btn-next-more',
							key: 'btn-next-more',
							isHidden: this.isNextMoreHidden(),
							onClick: this.handleMoreNextPages
						},
						titles('nextSet')
					),
					_react2.default.createElement(
						Page,
						{
							className: 'btn-next-page',
							key: 'btn-next-page',
							isDisabled: this.isNextDisabled(),
							onClick: this.handleNextPage
						},
						titles('next')
					),
					_react2.default.createElement(
						Page,
						{
							className: 'btn-last-page',
							key: 'btn-last-page',
							isDisabled: this.isNextDisabled(),
							onClick: this.handleLastPage
						},
						titles('last')
					)
				)
			);
		}
	});

	var Page = _react2.default.createClass({
		displayName: 'Page',
		render: function render() {
			var props = this.props;

			if (props.isHidden) return null;

			var baseCss = props.className ? props.className + ' ' : '';
			var css = baseCss + (props.isActive ? 'active' : '') + (props.isDisabled ? ' disabled' : '');

			return _react2.default.createElement(
				'li',
				{ key: this.props.index, className: css },
				_react2.default.createElement(
					'a',
					{ onClick: this.props.onClick },
					this.props.children
				)
			);
		}
	});

	function range(start, end) {
		var res = [];
		for (var i = start; i < end; i++) {
			res.push(i);
		}

		return res;
	}

	exports.default = Pager;
});
//# sourceMappingURL=pager.js.map
