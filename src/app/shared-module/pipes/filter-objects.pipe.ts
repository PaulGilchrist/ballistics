import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterObjects' })
export class FilterObjectsPipe implements PipeTransform {
	// Filters out any object where none of its properties contain the passed in search string
	transform(input: Object[], query: string): Object[] {
		if (input!=null && query!=null && query.length>0) {
			return input.filter(item => {
				for (const key in item) {
					if (typeof item[key] === 'string') {
						const inputLower = item[key].toLowerCase();
						const queryLower = query.toLowerCase();
						if (inputLower.indexOf(queryLower) !== -1) {
							return true;
						}
					}
				}
			});
		} else {
			return input;
		}
	}
}
