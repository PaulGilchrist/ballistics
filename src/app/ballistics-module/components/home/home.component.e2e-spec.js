if(browser.params.runAllTests) {
    describe('Home Page', () => {
        it('Page should load', () => {
            element(by.cssContainingText("a", "Home")).click();
            expect(browser.getCurrentUrl()).toContain('/home');
        });
        it('Title should be "Angular Template"', () => {
            expect(browser.getTitle()).toEqual('Angular Template');
        });
        it('"Getting Started" button should route to /help', () => {
            element(by.buttonText('Getting Started')).click()
            expect(browser.getCurrentUrl()).toContain('/help');
        });
    });
}