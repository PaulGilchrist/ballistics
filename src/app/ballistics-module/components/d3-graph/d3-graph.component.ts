import { Component, Input, OnInit, OnChanges, ElementRef, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

import d3Utils from 'pg-d3-utils';

@Component({
    selector: 'app-d3-graph',
    styleUrls: ['./d3-graph.component.css'],
    templateUrl: './d3-graph.component.html'
})
export class D3GraphComponent implements OnInit, OnChanges {
    isReady = false;
    tooltip: any;

    @Input() data: any = null;
    @Input() height = 300;
    @Input() labels = 'all';
    @Input() padding = 50;
    @Input() type = 'line'; // Valid options are 'line', 'bar', 'pie' or 'scatter'
    @Input() warningLevel = Infinity;
    @Input() width = 350;
    @Input() xKey = 'x'; // The propertyName within the data object that contains the x values
    @Input() xToFixed = Infinity;
    @Input() xType = 'number'; // Valid options are 'number' or 'date'
    @Input() yKey = 'y'; // The propertyName within the data object that contains the y values
    @Input() yToFixed = Infinity;
    @Input() zKey = null; // Optional propertyName name for a parent array used for multi-line charts

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        // Only start drawing the graphs after all inputs have been initially set and the OnInit has completed
        this.isReady = true;
        this.draw();
    }


    ngOnChanges(): void {
        if (this.isReady) {
            this.draw();
        }
    }

    abs(input: object[], field: string) {
        return input.map((i) => {
            i[field] = Math.abs(i[field]);
            return i;
        });
    }

    draw() {
        // Create a tooltip that will remain hidden until hover
        this.tooltip = d3.select('body')
            .append('div')
            .attr('class', 'd3-tooltip')
            .style('opacity', 0)
            .style('pointer-events', 'none')
            .style('position', 'absolute');
        // Set initial values from querystring if they existing
        d3Utils.draw({
            data: this.data, // this.abs(this.data, this.yKey)
            el: this.el.nativeElement,
            height: this.height,
            labels: this.labels,
            padding: this.padding,
            tooltip: this.tooltip,
            type: this.type,
            warningLevel: this.warningLevel,
            width: this.width,
            xKey: this.xKey,
            xToFixed: this.xToFixed,
            xType: this.xType,
            yKey: this.yKey,
            yToFixed: this.yToFixed,
            zKey: this.zKey
        });
    }

}
