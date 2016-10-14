/* global describe: true */
/* global it: true */
/* global expect: true */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Pager from '../../src/pager.jsx';


describe('react-pager component', () => {
	it('should create set of numbered buttons whose length equals to `visiblePages` property', () => {
		let pager         = generatePager(5, 20, 7);
		let numberedPages = pager.find('.btn-numbered-page').length;

		expect(numberedPages).toEqual(7);

		pager         = generatePager(5, 20, 10);
		numberedPages = pager.find('.btn-numbered-page').length;

		expect(numberedPages).toEqual(10);

		pager         = generatePager(5, 20, 0);
		numberedPages = pager.find('.btn-numbered-page').length;

		expect(numberedPages).toEqual(0);
	});


	it('should disable `fistPage` button if `current` equals to `0`', () => {
		let pager       = generatePager(0, 20, 5);
		let btnFirstPage = pager.find('.btn-first-page').first();

		expect(btnFirstPage.hasClass('disabled')).toBe(true);

		pager       = generatePager(1, 20, 5);
		btnFirstPage = pager.find('.btn-first-page').first();

		expect(btnFirstPage.hasClass('disabled')).toBe(false);
	});


	it('should disable `prevPage` button if `current` equals to `0`', () => {
		let pager       = generatePager(0, 20, 5);
		let btnPrevPage = pager.find('.btn-prev-page').first();

		expect(btnPrevPage.hasClass('disabled')).toBe(true);

		pager       = generatePager(1, 20, 5);
		btnPrevPage = pager.find('.btn-prev-page').first();

		expect(btnPrevPage.hasClass('disabled')).toBe(false);
	});


	it('should disable `nextPage` button if `current` equals to `total-1`', () => {
		let pager       = generatePager(19, 20, 5);
		let btnNextPage = pager.find('.btn-next-page').first();

		expect(btnNextPage.hasClass('disabled')).toBe(true);

		pager       = generatePager(18, 20, 5);
		btnNextPage = pager.find('.btn-next-page').first();

		expect(btnNextPage.hasClass('disabled')).toBe(false);
	});


	it('should disable `lastPage` button if `current` equals to `total-1`', () => {
		let pager       = generatePager(19, 20, 5);
		let btnLastPage = pager.find('.btn-last-page').first();

		expect(btnLastPage.hasClass('disabled')).toBe(true);

		pager       = generatePager(18, 20, 5);
		btnLastPage = pager.find('.btn-last-page').first();

		expect(btnLastPage.hasClass('disabled')).toBe(false);
	});


	it('should increment active button number after click on `nextPage` button', (done) => {
		let pager         = generatePager(3, 20, 5);
		const numberedPages = pager.find('.btn-numbered-page');

		expect(nth(numberedPages, 'active')).toEqual(3);

		function handler(next) {
			expect(next).toEqual(4);
			done();
		}

		pager             = generatePager(3, 20, 5, handler);
		const btnNextPage = pager.find('.btn-next-page').first();

		btnNextPage.simulate('click');
	});


	it('should decrement active button number after click on `prevPage` button', (done) => {
		let pager           = generatePager(3, 20, 5);
		const numberedPages = pager.find('.btn-numbered-page');

		expect(nth(numberedPages, 'active')).toEqual(3);

		function handler(next) {
			expect(next).toEqual(2);
			done();
		}

		pager             = generatePager(3, 20, 5, handler);
		const btnPrevPage = pager.find('.btn-prev-page');

		btnPrevPage.simulate('click');
	});


	it('should return `0` after click on `firstPage` button', (done) => {
		let pager           = generatePager(3, 20, 5);
		const numberedPages = pager.find('.btn-numbered-page');

		expect(nth(numberedPages, 'active')).toEqual(3);


		pager              = generatePager(3, 20, 5, handler);
		const btnFirstPage = pager.find('.btn-first-page').first();

		function handler(next) {
			expect(next).toEqual(0);
			done();
		}

		btnFirstPage.simulate('click');
	});


	it('should return `total-1` after click on `lastPage` button', (done) => {
		let pager           = generatePager(3, 20, 5);
		const numberedPages = pager.find('.btn-numbered-page');

		expect(nth(numberedPages, 'active')).toEqual(3);

		pager             = generatePager(3, 20, 5, handler);
		const btnLastPage = pager.find('.btn-last-page').first();

		function handler(next) {
			expect(next).toEqual(19);
			done();
		}

		btnLastPage.simulate('click');
	});


	it('should render labels for buttons according to `titles` prop', () => {
		const titles = {
			first:   '|<',
			prev:    '<',
			prevSet: '<#',
			nextSet: '#>',
			next:    '>',
			last:    '>|',
		};

		const pager = mount(
			<Pager
				current={10}
				total={20}
				visiblePages={5}
				titles={titles}
			/>
		);

		const btnFirstPage = pager.find('.btn-first-page').first();
		const btnPrevPage  = pager.find('.btn-prev-page').first();
		const btnPrevSet   = pager.find('.btn-prev-more').first();
		const btnNextPage  = pager.find('.btn-next-page').first();
		const btnNextSet   = pager.find('.btn-next-more').first();
		const btnLastPage  = pager.find('.btn-last-page').first();

		expect(btnFirstPage.find('a').first().text()).toEqual(titles.first);
		expect(btnPrevPage.find('a').first().text()).toEqual(titles.prev);
		expect(btnPrevSet.find('a').first().text()).toEqual(titles.prevSet);
		expect(btnNextSet.find('a').first().text()).toEqual(titles.nextSet);
		expect(btnNextPage.find('a').first().text()).toEqual(titles.next);
		expect(btnLastPage.find('a').first().text()).toEqual(titles.last);
	});
});


function generatePager(c, t, v, fn) {
	/**
	 * `render` is needed because of combinations of these issues:
	 * https://github.com/airbnb/enzyme/issues/134 (so we need `mount` to use `.hasClass()`);
	 * https://github.com/airbnb/enzyme/issues/308#issuecomment-215348290 (so
	 *   we need `shallow` to use `.simulate()`)
	 */
	const render = fn ? shallow : mount;

	return render(
		<Pager
			current={c}
			total={t}
			visiblePages={v}
			onPageChanged={fn}
		/>
	);
}


function nth(comps, className) {
	let res = -1;

	comps.forEach((node, idx) => {
		if (node.hasClass(className)) res = idx;
	});

	return res;
}
