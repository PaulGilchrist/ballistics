import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterObjectsPipe } from './pipes/filter-objects.pipe';
import { SortObjectsPipe } from './pipes/sort-objects.pipe';

@NgModule({
	exports: [
		FilterObjectsPipe,
		SortObjectsPipe
	],
	declarations: [
		FilterObjectsPipe,
		SortObjectsPipe
	],
	imports: [
		CommonModule
	],
})
export class SharedModule {}
