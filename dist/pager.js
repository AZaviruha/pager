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

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	/**
  * ## Constants
  */
	var BASE_SHIFT = 0;
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

	var Pager = function (_React$Component) {
		_inherits(Pager, _React$Component);

		function Pager(props) {
			_classCallCheck(this, Pager);

			var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this, props));

			_this.handleFirstPage = _this.handleFirstPage.bind(_this);
			_this.handlePreviousPage = _this.handlePreviousPage.bind(_this);
			_this.handleNextPage = _this.handleNextPage.bind(_this);
			_this.handleLastPage = _this.handleLastPage.bind(_this);
			_this.handleMorePrevPages = _this.handleMorePrevPages.bind(_this);
			_this.handleMoreNextPages = _this.handleMoreNextPages.bind(_this);
			_this.handlePageChanged = _this.handlePageChanged.bind(_this);
			return _this;
		}

		/* ========================= HELPERS ==============================*/


		_createClass(Pager, [{
			key: 'getTitles',
			value: function getTitles(key) {
				return (this.props.titles || TITLES)[key];
			}
		}, {
			key: 'calcBlocks',
			value: function calcBlocks() {
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
			}
		}, {
			key: 'isPrevDisabled',
			value: function isPrevDisabled() {
				return this.props.current <= BASE_SHIFT;
			}
		}, {
			key: 'isNextDisabled',
			value: function isNextDisabled() {
				return this.props.current >= this.props.total - TITLE_SHIFT;
			}
		}, {
			key: 'isPrevMoreHidden',
			value: function isPrevMoreHidden() {
				var blocks = this.calcBlocks();
				return blocks.total === TITLE_SHIFT || blocks.current === BASE_SHIFT;
			}
		}, {
			key: 'isNextMoreHidden',
			value: function isNextMoreHidden() {
				var blocks = this.calcBlocks();
				return blocks.total === TITLE_SHIFT || blocks.current === blocks.total - TITLE_SHIFT;
			}
		}, {
			key: 'visibleRange',
			value: function visibleRange() {
				var blocks = this.calcBlocks();
				var start = blocks.current * blocks.size;
				var delta = this.props.total - start;
				var end = start + (delta > blocks.size ? blocks.size : delta);

				return [start + TITLE_SHIFT, end + TITLE_SHIFT];
			}
		}, {
			key: 'handleFirstPage',
			value: function handleFirstPage() {
				if (!this.isPrevDisabled()) {
					this.handlePageChanged(BASE_SHIFT);
				}
			}
		}, {
			key: 'handlePreviousPage',
			value: function handlePreviousPage() {
				if (!this.isPrevDisabled()) {
					this.handlePageChanged(this.props.current - TITLE_SHIFT);
				}
			}
		}, {
			key: 'handleNextPage',
			value: function handleNextPage() {
				if (!this.isNextDisabled()) {
					this.handlePageChanged(this.props.current + TITLE_SHIFT);
				}
			}
		}, {
			key: 'handleLastPage',
			value: function handleLastPage() {
				if (!this.isNextDisabled()) {
					this.handlePageChanged(this.props.total - TITLE_SHIFT);
				}
			}
		}, {
			key: 'handleMorePrevPages',
			value: function handleMorePrevPages() {
				var blocks = this.calcBlocks();
				this.handlePageChanged(blocks.current * blocks.size - TITLE_SHIFT);
			}
		}, {
			key: 'handleMoreNextPages',
			value: function handleMoreNextPages() {
				var blocks = this.calcBlocks();
				this.handlePageChanged((blocks.current + TITLE_SHIFT) * blocks.size);
			}
		}, {
			key: 'handlePageChanged',
			value: function handlePageChanged(num) {
				var handler = this.props.onPageChanged;
				if (handler) handler(num);
			}
		}, {
			key: 'renderPages',
			value: function renderPages(pair) {
				var _this2 = this;

				return range(pair[0], pair[1]).map(function (num, idx) {
					var current = num - TITLE_SHIFT;
					var onClick = _this2.handlePageChanged.bind(_this2, current);
					var isActive = _this2.props.current === current;

					return _react2.default.createElement(
						Page,
						{
							key: idx,
							index: idx, isActive: isActive,
							className: 'btn-numbered-page',
							onClick: onClick
						},
						num
					);
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var titles = this.getTitles.bind(this);

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
		}]);

		return Pager;
	}(_react2.default.Component);

	Pager.propTypes = {
		current: _react2.default.PropTypes.number.isRequired,
		total: _react2.default.PropTypes.number.isRequired,
		visiblePages: _react2.default.PropTypes.number.isRequired,
		titles: _react2.default.PropTypes.object,
		onPageChanged: _react2.default.PropTypes.func
	};

	var Page = function Page(props) {
		if (props.isHidden) return null;

		var baseCss = props.className ? props.className + ' ' : '';
		var css = baseCss + (props.isActive ? 'active' : '') + (props.isDisabled ? ' disabled' : '');

		return _react2.default.createElement(
			'li',
			{ key: props.index, className: css },
			_react2.default.createElement(
				'a',
				{ onClick: props.onClick },
				props.children
			)
		);
	};

	Page.propTypes = {
		isHidden: _react2.default.PropTypes.boolean,
		isActive: _react2.default.PropTypes.boolean,
		isDisabled: _react2.default.PropTypes.boolean,
		className: _react2.default.PropTypes.string
	};

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
