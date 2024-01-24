import * as d3 from 'd3';
import { schemePaired } from 'd3-scale-chromatic';
import './d3-utils.css'

// https://keathmilligan.net/create-a-reusable-chart-component-with-angular-and-d3-js/

const d3Utils = {
    createBarGraph: (el, tooltip, data, width, height, xKey, yKey, xToFixed, yToFixed, labels, warningLevel) => {
        // Bar charts must be positive numbers
        data.forEach(d => d[yKey]=Math.abs(d[yKey]));
        const padding = 2;
        // Find best fit for data to fill height
        const yMinMax = d3Utils.getMinMax(data, 'number', null, yKey);
        const yMultiplier = height / yMinMax.max;
        // Find best fit for data to fill width
        const xMultiplier = width / data.length;
        const svg = d3.select(el)
            .append('svg')
            .attr('class', 'd3-utils')
            .attr('width', width)
            .attr('height', height);
        // Bars
        svg.selectAll('rect').data(data).enter().append('rect')
            .attr('x', function (d, i) { return i * xMultiplier; })
            .attr('y', function (d) { return height - (d[yKey] * yMultiplier); })
            .attr('width', xMultiplier - padding)
            .attr('height', function (d) { return d[yKey] * yMultiplier; })
            .attr('class', function (d) { return d3Utils.classPicker(d[yKey], warningLevel); })
            // Dynamic Lables
            .on('mouseover', function (d) {
                // Show tooltip at mouse pointer
                tooltip.transition().duration(500).style('opacity', 0.9);
                const tip = `<strong>${xKey}:</strong> ${d3Utils.getValue(d[xKey], xToFixed)}<br/><strong>${yKey}:</strong> ${d3Utils.getValue(d[yKey], yToFixed)}<br/>`;
                tooltip.html(tip)
                    .style('left', (d3.event.pageX) + 'px')
                    .style('top', (d3.event.pageY - 28) + 'px');
                // Add y value to top of bar
                svg.append('text')
                    .text(d3Utils.getValue(d[yKey], yToFixed))
                    .attr('x', parseFloat(d3.select(this).attr('x')) + parseFloat(d3.select(this).attr('width')) / 2)
                    .attr('y', parseFloat(d3.select(this).attr('y')) + 14) // Text 14px below the bar top, or roughly up 1em
                    .attr('text-anchor', 'middle')
                    .attr('id', 'hoverLabel_' + d3Utils.getValue(d[yKey], 0));
            })
            .on('mouseout', function (d) {
                // Hide tooltip
                tooltip.transition().duration(500).style('opacity', 0);
                // Remove y value to top of bar
                d3.select('#hoverLabel_' + d3Utils.getValue(d[yKey], 0)).remove();
            });
        // Static Lables
        svg.selectAll('text').data(data).enter().append('text')
            .text(function (d) {
                return d3Utils.showLabels(yMinMax, yKey, d3Utils.getValue(d[yKey], yToFixed), labels, true);
            })
            .attr('x', function (d, i) { return i * xMultiplier + (xMultiplier - padding) / 2; })
            .attr('y', function (d) { return height - (d[yKey] * yMultiplier) + 14; }) // Text 14px below the bar top, or roughly up 1em
            .attr('text-anchor', 'middle');
    },
    createLineChart: (el, tooltip, data, width, height, xType, xKey, yKey, zKey, xToFixed, yToFixed, labels, warningLevel, padding) => {
        // Array must be sorted by x before passing to this function or the line will jump all over the place
        // Supports both single line (data=[]) and multi-line (data=[[],[],[],...])
        // zKey is only used for multi-line charts where Z represents the key in the parent object that denotes the sub-array
        const isDate = (xType === 'date');
        // Find the max x and y scale values across the array of lines
        const xMinMax = d3Utils.getMinMax(data, xType, zKey, xKey);
        const yMinMax = d3Utils.getMinMax(data, 'number', zKey, yKey);
        const xScale = d3Utils.scale(xType, xMinMax, [padding + 5, width - 10], true);
        const yScale = d3Utils.scale(null, yMinMax, [height - padding, 10], true);
        const xAxisGen = d3.axisBottom().scale(xScale);
        if (isDate) {
            xAxisGen.tickFormat(d3.timeFormat('%b'));
        }
        const yAxisGen = d3.axisLeft().scale(yScale);
        const svg = d3.select(el)
            .append('svg')
            .attr('class', 'd3-utils')
            .attr('width', width)
            .attr('height', height);
        let pathNum = 0;
        let dataArray = [];
        if(zKey != null) {
            // loop through 'applications' and make one line per 'months' array
            data.forEach(parentObject => {
                dataArray.push(parentObject[zKey]);
            });
        } else {
            dataArray.push(data);
        }
        dataArray.forEach(data => {
            const lineFunction = d3.line()
                // Make sure all date strings are date objects before putting them into the path
                .x(function (d) { return xScale(isDate ? new Date(d[xKey]) : d[xKey]); })
                .y(function (d) { return d[yKey] ? yScale(d[yKey]) : null; })
                .curve(d3.curveLinear);
            // Line
            svg.append('path')
                .attr('class', `d3-path d3-path-${pathNum++}`)
                .attr('d', lineFunction(data))
                .attr('fill', 'none');
            // Dots
            svg.selectAll().data(data).enter().append('circle')
                .attr('cx', function (d) { return xScale(isDate ? new Date(d[xKey]) : d[xKey]); })
                .attr('cy', function (d) { return yScale(d[yKey]); })
                .attr('r', 3)
                .attr('class', function (d) { return d3Utils.classPicker(d[yKey], warningLevel); })
                // Dynamic Lables
                .on('mouseover', function (d) {
                    // Show tooltip at mouse pointer
                    tooltip.transition().duration(500).style('opacity', 0.9);
                    const tip = `<strong>${xKey}:</strong> ${d3Utils.getValue(d[xKey], xToFixed)}<br/><strong>${yKey}:</strong> ${d3Utils.getValue(d[yKey], yToFixed)}<br/>`;
                    tooltip.html(tip)
                        .style('left', (d3.event.pageX) + 'px')
                        .style('top', (d3.event.pageY - 28) + 'px');
                })
                .on('mouseout', function () {
                    // Hide tooltip
                    tooltip.transition().duration(500).style('opacity', 0);
                });
            // Static Lables
            svg.selectAll('text').data(data).enter().append('text')
                .text(function (d) { return d3Utils.showLabels(yMinMax, yKey, d3Utils.getValue(d[yKey], yToFixed), labels, true); })
                .attr('x', function (d) { return xScale(isDate ? new Date(d[xKey]) : d[xKey]); })
                .attr('y', function (d) { return yScale(d[yKey]); })
                .attr('text-anchor', 'start')
                .attr('class', function (d) { return d3Utils.classPicker(d[yKey], warningLevel); });
            svg.append('g').call(xAxisGen)
                .attr('class', 'd3-axis')
                .attr('transform', 'translate(0, ' + (height - padding) + ')');
            svg.append('g')
                //.attr("transform", "translate(50, 0)")
                .attr('class', 'd3-axis')
                .attr('transform', 'translate(' + padding + ', 0)')
                .call(yAxisGen);
        });
    },
    createPieChart: (el, tooltip, data, width, xType, xKey, yKey, xToFixed, yToFixed, labels) => {
        const r = width / 2;
        const vis = d3.select(el)
            .append('svg:svg') // Create the SVG element inside nativeElement
            .data([data]) // Associate our data with the document
            .attr('class', 'd3-utils')
            .attr('width', r * 2) // Set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr('height', r * 2)
            .append('svg:g') // Make a group to hold our pie chart
            .attr('transform', 'translate(' + r + ',' + r + ')'); // Move the center of the pie chart from 0, 0 to radius, radius
        const pie = d3.pie() // Create arc data for us given a list of values
            .value(function (d) { return d[yKey]; }); // Tell it how to access the value of each element in our data array
        const arcs = vis.selectAll('g.slice') // Selects all <g> elements with class slice (there aren't any yet)
            .data(pie) // Associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
            .enter() // This will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append('svg:g') // Create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
            .attr('class', 'slice'); // Allow us to style things in the slices (like text)
        const color = d3.scaleOrdinal(schemePaired); // builtin range of colors
        const arc = d3.arc().outerRadius(r).innerRadius(0); // Declare an arc generator function that will create <path> elements for us using arc data
        arcs.append('svg:path')
            .attr('fill', function (d, i) { return color(i); }) // Set the color for each slice to be chosen from the color function defined above
            .attr('d', function (d) { return arc(d); }) // this creates the actual SVG path using the associated data (pie) with the arc drawing function
            // Dynamic Lables
            .on('mouseover', function (d,i) {
                // Show tooltip at mouse pointer
                tooltip.transition().duration(500).style('opacity', 0.9);
                const tip = `<strong>${xKey}:</strong> ${d3Utils.getValue(data[i][xKey], xToFixed)}<br/><strong>${yKey}:</strong> ${d3Utils.getValue(data[i][yKey], yToFixed)}<br/>`;
                tooltip.html(tip)
                    .style('left', (d3.event.pageX) + 'px')
                    .style('top', (d3.event.pageY - 28) + 'px');
            })
            .on('mouseout', function () {
                // Hide tooltip
                tooltip.transition().duration(500).style('opacity', 0);
            });
        // Labels
        const isDate = (xType === 'date');
        const timeFormat = d3.timeFormat('%b');
        arcs.append('svg:text') // Add a label to each slice
            .attr('class', 'd3-axis')
            .attr('transform', function (d) { // Set the label's origin to the center of the arc
                // Make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                const labelR = r * 0.9;
                const c = arc.centroid(d), x = c[0], y = c[1], // Gives us a pair of coordinates like [50, 50]
                    // Pythagorean theorem for hypotenuse
                    h = Math.sqrt(x * x + y * y);
                return 'translate(' + (x / h * labelR) + ',' + (y / h * labelR) + ')';
            })
            .attr('text-anchor', 'middle') // Center the text on it's origin
            .text(function (d, i) {
                const max = d3.max(data, function (d2) { return d2[yKey]; });
                const min = d3.min(data, function (d2) { return d2[yKey]; });
                const xValue = data[i][xKey];
                const yValue = data[i][yKey];
                if ((labels !== 'none') && ((labels === 'minmax' && (yValue === max || yValue === min)) || (labels === 'all'))) {
                    return isDate ? timeFormat(new Date(xValue)) : xValue;
                }
            });
    },
    createScatterPlot: (el, tooltip, data, width, height, xType, xKey, yKey, zKey, xToFixed, yToFixed, labels, warningLevel, padding) => {
        // Unlike LineChart, this array does not need to be sorted by x
        const isDate = (xType === 'date');
        const xMinMax = d3Utils.getMinMax(data, xType, null, xKey);
        const yMinMax = d3Utils.getMinMax(data, 'number', null, yKey);
        const xScale = d3Utils.scale(xType, xMinMax, [padding + 5, width - 10], true);
        const yScale = d3Utils.scale(null, yMinMax, [height - padding, 10], true);
        const xAxisGen = d3.axisBottom().scale(xScale);
        if (isDate) {
            xAxisGen.tickFormat(d3.timeFormat('%b'));
        }
        const yAxisGen = d3.axisLeft().scale(yScale);
        const svg = d3.select(el)
            .append('svg')
            .attr('class', 'd3-utils')
            .attr('width', width)
            .attr('height', height);
        let pathNum = 0;
        let dataArray = [];
        if(zKey != null) {
            // loop through 'applications' and make one line per 'months' array
            data.forEach(parentObject => {
                dataArray.push(parentObject[zKey]);
            });
        } else {
            dataArray.push(data);
        }
        dataArray.forEach(data => {
            // Dots
            svg.selectAll('circle').data(data).enter().append('circle')
                .attr('cx', function (d) { return xScale(isDate ? new Date(d[xKey]) : d[xKey]); })
                .attr('cy', function (d) { return yScale(d[yKey]); })
                .attr('r', 5)
                .attr('class', function (d) { return d3Utils.classPicker(d[yKey], warningLevel); })
                // Dynamic Lables
                .on('mouseover', function (d) {
                    // Show tooltip at mouse pointer
                    tooltip.transition().duration(500).style('opacity', 0.9);
                    const tip = `<strong>${xKey}:</strong> ${d3Utils.getValue(d[xKey], xToFixed)}<br/><strong>${yKey}:</strong> ${d3Utils.getValue(d[yKey], yToFixed)}<br/>`;
                    tooltip.html(tip)
                        .style('left', (d3.event.pageX) + 'px')
                        .style('top', (d3.event.pageY - 28) + 'px');
                })
                .on('mouseout', function () {
                    // Hide tooltip
                    tooltip.transition().duration(500).style('opacity', 0);
                });
            // Static Lables
            svg.selectAll('text').data(data).enter().append('text')
                .text(function (d) { return d3Utils.showLabels(yMinMax, yKey, d3Utils.getValue(d[yKey], yToFixed), labels, true); })
                .attr('x', function (d) { return xScale(isDate ? new Date(d[xKey]) : d[xKey]); })
                .attr('y', function (d) { return yScale(d[yKey]); })
                .attr('text-anchor', 'start')
                .attr('class', function (d) { return d3Utils.classPicker(d[yKey], warningLevel); });
            svg.append('g')
                .attr('class', 'd3-axis')
                .attr('transform', 'translate(0, ' + (height - padding) + ')')
                .call(xAxisGen);
            svg.append('g')
                .attr('class', 'd3-axis')
                .attr('transform', 'translate(' + padding + ', 0)')
                .call(yAxisGen);
        });
    },
    classPicker: (value, warningLevel) => {
        // Returns a warning class that can be styles through CSS to make data above the warningLevel stand out
        if (value >= warningLevel) {
            return 'd3-warning';
        } else {
            return 'd3-default';
        }
    },
    draw: (config) => {
        const defaultConfig = {
            data: null,
            el: null, // DOM element to attach the chart to
            height: 300,
            labels: 'all', // 'none', 'minmax', or 'all' - Used to determine if labels are attached to each data point, no data points, or just the min/max values
            padding: 50, // Only used for 'line' or 'scatter' to make room for the x and y axis lables
            tooltip: null,
            type: 'line', // 'bar', 'line', 'pie', or 'scatter'
            warningLevel: Infinity, // Change color above this numeric value
            width: 300,
            xKey: 'x', // Object property name to use for x value
            xToFixed: Infinity, // Fixed number of decimal places for numbers
            xType: 'number', // 'number' or 'date'
            yKey: 'y', // Object property name to use for y value
            yToFixed: Infinity, // Fixed number of decimal places for numbers
            zKey: 'z' // zKey is only used for multi-line charts where Z represents the key in the parent object that denotes the sub-array
        }
        config = { ...defaultConfig, ...config };
        // Remove any existing SVG content before re-drawing
        d3.select(config.el).selectAll('*').remove();
        switch(config.type) {
            case 'bar':
                d3Utils.createBarGraph(config.el, config.tooltip, config.data, config.width, config.height, config.xKey, config.yKey, config.xToFixed, config.yToFixed, config.labels, config.warningLevel);
                break;
            case 'line':
                d3Utils.createLineChart(config.el, config.tooltip, config.data, config.width, config.height, config.xType, config.xKey, config.yKey, config.zKey, config.xToFixed, config.yToFixed, config.labels, config.warningLevel, config.padding);
                break;
            case 'pie':
                d3Utils.createPieChart(config.el, config.tooltip, config.data, config.width, config.xType, config.xKey, config.yKey, config.xToFixed, config.yToFixed, config.labels);
                break;
            case 'scatter':
                d3Utils.createScatterPlot(config.el, config.tooltip, config.data, config.width, config.height, config.xType, config.xKey, config.yKey, config.zKey, config.xToFixed, config.yToFixed, config.labels, config.warningLevel, config.padding);
                break;
            default:
        }
    },
    getMinMax: (data, propertyType, parentPropertyName, propertyName) => {
        // Given an array and the propertyName within the array, computed the minimum and maximum values of that property
        // If there is a parentPropertyName, the parentObject will be looped getting the min/max for all propertyName arrays underneath
        // porpertyType can be 'date' or 'number'
        let min = Number.MAX_VALUE;
        let max = -Number.MAX_VALUE;
        // Make sure we always have a two level array
        let dataArray = [];
        if(parentPropertyName != null) {
            data.forEach(parentObject => {
                dataArray.push(parentObject[parentPropertyName]);
            });
        } else {
            dataArray.push(data);
        }
        dataArray.forEach(parent => {
            parent.forEach(property => {
                let value = property[propertyName];
                if(value) { // Some items in the array may not have the property
                    if (propertyType === 'date') {
                        min = Math.min(min, new Date(value));
                        max = Math.max(max, new Date(value));
                    } else {
                        min = Math.min(min, Number(value));
                        max = Math.max(max, Number(value));
                    }
                }
            });
        });
        return { min, max };
    },
    getValue: (inputValue, toFixed) => {
        if (toFixed === Infinity) {
            return inputValue;
        } else {
            return inputValue.toFixed(toFixed);
        }
    },
    scale: (xType, minmax, range, useMin = false) => {
        // Scale to best fit data into viewable space
        // Size refers to the x or y pixel size
        let scale;
        if (xType === 'date') {
            scale = d3.scaleTime();
        } else {
            if (!useMin) {
                minmax.min = 0;
            }
            scale = d3.scaleLinear();
        }
        return scale.domain([minmax.min, minmax.max]).range(range);
    },
    showLabels: (minmax, key, value, type, useMin = true) => {
        // Allows for either showing no labels, just the min and max labels, or all labels
        if (!useMin) {
            minmax.min = 0;
        }
        if ((type !== 'none') && ((type === 'minmax' && (value === minmax.max || value === minmax.min)) || (type === 'all'))) {
            return value;
        } else {
            return null;
        }
    }
}

export default d3Utils;
