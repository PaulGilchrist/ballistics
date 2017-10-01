import { inject } from '@angular/core/testing';
import {FilterObjectsPipe} from './filter-objects.pipe';
import {} from 'jasmine';

describe('FilterObjectsPipe', () => {
    it('Object array filtered down to a single object', function () {
        let filterObjectsPipe = new FilterObjectsPipe();
        let inputObjectArray = [
            { name: 'Brent', job: 'Solutions' },
            { name: 'Gary', job: 'Data' },
            { name: 'Jamie', job: 'Systems' },
            { name: 'John', job: 'Infrastructure' },
            { name: 'Paul', job: 'Enterprise' },
            { name: 'Rick', job: 'Network' }
        ];
        let outputObjectArray = filterObjectsPipe.transform(inputObjectArray, 'Paul');
        expect(outputObjectArray.length).toEqual(1);
    });
    it('Object array filtered down to 2 objects', function () {
        let filterObjectsPipe = new FilterObjectsPipe();
        let inputObjectArray = [
            { name: 'Brent', job: 'Business' },
            { name: 'Gary', job: 'Solutions' },
            { name: 'Jamie', job: 'Solutions' },
            { name: 'John', job: 'Operations' },
            { name: 'Paul', job: 'Business' },
            { name: 'Rick', job: 'Operations' }
        ];
        let outputObjectArray = filterObjectsPipe.transform(inputObjectArray, 'Operations');
        expect(outputObjectArray.length).toEqual(2);
    });
});
