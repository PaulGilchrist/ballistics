import { Component, Input, OnInit, OnChanges, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import { Selection, select } from 'd3-selection';
import { transition } from 'd3-transition';

import d3Utils from 'pg-d3-utils';
import utilities from 'pg-utilities';

// https://keathmilligan.net/create-a-reusable-chart-component-with-angular-and-d3-js/

// Must be included in index.html
declare var _:any;

@Component({
	selector: './d3-graph',
	styleUrls: [],
	template: ''
})
export class D3GraphComponent implements OnInit, OnChanges {
	isReady = false;
	tooltip: any;

	@Input() data: Array<any> = null;
	@Input() height = 300;
	@Input() labels = 'all';
	@Input() warningLevel = Infinity;
	@Input() width = 350;
	@Input() xToFixed = Infinity;
	@Input() yToFixed = Infinity;
	@Input() type = 'bar';
	@Input() xKey = 'x'; // The key within the data object that contains the x values
	@Input() yKey = 'y'; // The key within the data object that contains the y values
	@Input() xType = 'number'; // Valid options are number or date

	constructor(private el: ElementRef) {}

	ngOnInit(): void {
		// Only start drawing the graphs after all inputs have been initially set and the OnInit has completed
		this.isReady = true;
		// Create a tooltip that will remain hidden until hover
		this.tooltip = d3.select('body')
			.append('div')
			.attr('class', 'd3-tooltip')
			.style('opacity', 0)
			.style('pointer-events', 'none')
			.style('position', 'absolute');
		// Set initial values from querystring if they existing
		d3Utils.draw(this.type, this.el.nativeElement, this.tooltip, utilities.abs(this.data, this.yKey), this.width, this.height, this.xType, this.xKey, this.yKey, this.xToFixed, this.yToFixed, this.labels, this.warningLevel);
	}

	ngOnChanges(): void {
		if(this.isReady) {
			d3Utils.draw(this.type, this.el.nativeElement, this.tooltip, utilities.abs(this.data, this.yKey), this.width, this.height, this.xType, this.xKey, this.yKey, this.xToFixed, this.yToFixed, this.labels, this.warningLevel);
		}
	}

    abs(input: object[], field: string) {
        return input.map((i) => {
            i[field] = Math.abs(i[field]);
            return i;
        });
    }

}
