import { browser, by, element } from 'protractor';

if(browser.params.runAllTests) {
	describe('Home Page', () => {
		it('Title should be "Ballistics"', () => {
			expect(browser.getTitle()).toEqual('Ballistics');
		});
	});
}
