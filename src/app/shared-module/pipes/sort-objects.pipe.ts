import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'sortObjects' })
export class SortObjectsPipe implements PipeTransform {
	// Currently can only sort where (typeof input[field] === "string")
	// Will enhance later to support numbers and dates
	transform(input: Object[], field: string, desc = false): Object[] {
		if (input && field) {
			return input.sort((a: Object, b: Object) => {
				if (a[field] < b[field]) {
					return desc ? 1 : -1;
				}
				if (b[field] < a[field]) {
					return desc ? -1 : 1;
				}
				return 0;
			});
		}
		return input;
	}
}
