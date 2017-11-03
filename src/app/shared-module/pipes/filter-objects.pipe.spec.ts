import { inject } from '@angular/core/testing';
import {FilterObjectsPipe} from './filter-objects.pipe';
import {} from 'jasmine';

describe('FilterObjectsPipe', () => {
	it('Object array filtered down to a single object', function () {
		const filterObjectsPipe = new FilterObjectsPipe();
		const inputObjectArray = [
			{ name: 'Brent', job: 'Solutions' },
			{ name: 'Gary', job: 'Data' },
			{ name: 'Jamie', job: 'Systems' },
			{ name: 'John', job: 'Infrastructure' },
			{ name: 'Paul', job: 'Enterprise' },
			{ name: 'Rick', job: 'Network' }
		];
		const outputObjectArray = filterObjectsPipe.transform(inputObjectArray, 'Paul');
		expect(outputObjectArray.length).toEqual(1);
	});
	it('Object array filtered down to 2 objects', function () {
		const filterObjectsPipe = new FilterObjectsPipe();
		const inputObjectArray = [
			{ name: 'Brent', job: 'Business' },
			{ name: 'Gary', job: 'Solutions' },
			{ name: 'Jamie', job: 'Solutions' },
			{ name: 'John', job: 'Operations' },
			{ name: 'Paul', job: 'Business' },
			{ name: 'Rick', job: 'Operations' }
		];
		const outputObjectArray = filterObjectsPipe.transform(inputObjectArray, 'Operations');
		expect(outputObjectArray.length).toEqual(2);
	});
});
