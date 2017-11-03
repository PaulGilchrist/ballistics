/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {} from 'jasmine';

import { AppComponent } from './app.component';

////////  SPECS  /////////////
/// Delete this
describe('Smoke test', () => {
	it('should run a passing test', () => {
		expect(true).toEqual(true, 'should pass');
	});
});

describe('AppComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
		});
		TestBed.overrideComponent(AppComponent, {
			set: {
				template: '<div>Overridden template here</div>'
				// ...
			}
		});
	});
	it('Should instantiate component', async(() => {
		TestBed.compileComponents().then(() => {
			const fixture = TestBed.createComponent(AppComponent);
			expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
		});
	}));
	it('Should have expected <div> text', async(() => {
		TestBed.compileComponents().then(() => {
			const fixture = TestBed.createComponent(AppComponent);
			fixture.detectChanges();
			let div = fixture.debugElement.query(el => el.name === 'div').nativeElement;  // it works
			div = fixture.debugElement.query(By.css('div')).nativeElement;            // preferred
			expect(div.innerText).toMatch(/Overridden template/i, '<div> should say something about "Overridden template"');
		});
	}));
});
