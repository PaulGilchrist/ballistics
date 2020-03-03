import * as d3 from 'd3';
import './d3.css'

// https://keathmilligan.net/create-a-reusable-chart-component-with-angular-and-d3-js/

const d3Utils = {
    createBarGraph: (el, tooltip, data, width, height, xKey, yKey, xToFixed, yToFixed, labels, warningLevel) => {
        const padding = 2;
        // Find best fit for data to fill height
        const yMultiplier = height / d3.max(data, function (d) { return d[yKey]; });
        // Find best fit for data to fill width
        const xMultiplier = width / data.length;
        const svg = d3.select(el)
            .append('svg')
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
                return d3Utils.showLabels(yKey, d3Utils.getValue(d[yKey], yToFixed), labels, true);
            })
            .attr('x', function (d, i) { return i * xMultiplier + (xMultiplier - padding) / 2; })
            .attr('y', function (d) { return height - (d[yKey] * yMultiplier) + 14; }) // Text 14px below the bar top, or roughly up 1em
            .attr('text-anchor', 'middle');
    },
    createLineChart: (el, tooltip, data, width, height, xType, xKey, yKey, xToFixed, yToFixed, labels, warningLevel) => {
        // Array must be sorted by x before passing to this function or the line will jump all over the place
        const padding = 36;
        const isDate = (xType === 'date');
        const xScale = d3Utils.scale(data, xType, xKey, [padding + 5, width - 10], true);
        const yScale = d3Utils.scale(data, xType, yKey, [height - padding, 10], true);
        const xAxisGen = d3.axisBottom(xScale);
        if (isDate) {
            xAxisGen.tickFormat(d3.timeFormat('%b'));
        }
        const yAxisGen = d3.axisLeft(yScale);
        const lineFunction = d3.line()
            // Make sure all date strings are date objects before putting them into the path
            .x(function (d) { return xScale(isDate ? new Date(d[xKey]) : d[xKey]); })
            .y(function (d) { return yScale(d[yKey]); })
            .curve(d3.curveLinear);
        const svg = d3.select(el)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
        // Line
        svg.append('path')
            .attr('class', 'd3-path')
            .attr('d', lineFunction(data))
            .attr('fill', 'none');
        // Dots
        svg.selectAll('circle').data(data).enter().append('circle')
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
        // Lables
        svg.selectAll('text').data(data).enter().append('text')
            .text(function (d) { return d3Utils.showLabels(yKey, d3Utils.getValue(d[yKey], yToFixed), labels, true); })
            .attr('x', function (d) { return xScale(isDate ? new Date(d[xKey]) : d[xKey]); })
            .attr('y', function (d) { return yScale(d[yKey]); })
            .attr('text-anchor', 'start')
            .attr('class', function (d) { return d3Utils.classPicker(d[yKey], warningLevel); });
        svg.append('g').call(xAxisGen)
            .attr('class', 'd3-axis')
            .attr('transform', 'translate(0, ' + (height - padding) + ')');
        svg.append('g').call(yAxisGen)
            .attr('class', 'd3-axis')
            .attr('transform', 'translate(' + padding + ', 0)');
    },
    createPieChart: (el, tooltip, data, width, xType, xKey, yKey, xToFixed, yToFixed, labels) => {
        const r = width / 2;
        const vis = d3.select(el)
            .append('svg:svg') // Create the SVG element inside nativeElement
            .data([data]) // Associate our data with the document
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
        const color = d3.scaleOrdinal(d3.schemeCategory10); // builtin range of colors
        const arc = d3.arc().outerRadius(r).innerRadius(0); // Declare an arc generator function that will create <path> elements for us using arc data
        arcs.append('svg:path')
            .attr('fill', function (d, i) { return color(i); }) // Set the color for each slice to be chosen from the color function defined above
            .attr('d', function (d) { return arc(d); }) // this creates the actual SVG path using the associated data (pie) with the arc drawing function
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
    createScatterPlot: (el, tooltip, data, width, height, xType, xKey, yKey, xToFixed, yToFixed, labels, warningLevel) => {
        // Unlike LineChart, this array does not need to be sorted by x
        const padding = 26;
        const isDate = (xType === 'date');
        const xScale = d3Utils.scale(data, xType, xKey, [padding + 5, width - 10], true);
        const yScale = d3Utils.scale(data, xType, yKey, [height - padding, 10], false);
        const xAxisGen = d3.axisBottom(xScale);
        if(isDate) {
            xAxisGen.tickFormat(d3.timeFormat('%b'));
        }
        const yAxisGen = d3.axisLeft(yScale);
        const svg = d3.select(el)
            .append('svg')
            .attr('width', width)
            .attr('height', height);
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
            .text(function (d) { return d3Utils.showLabels(yKey, d3Utils.getValue(d[yKey], yToFixed), labels, true); })
            .attr('x', function (d) { return xScale(isDate ? new Date(d[xKey]) : d[xKey]); })
            .attr('y', function (d) { return yScale(d[yKey]); })
            .attr('text-anchor', 'start')
            .attr('class', function (d) { return d3Utils.classPicker(d[yKey], warningLevel); });
        svg.append('g').call(xAxisGen)
            .attr('class', 'd3-axis')
            .attr('transform', 'translate(0, ' + (height - padding) + ')');
        svg.append('g').call(yAxisGen)
            .attr('class', 'd3-axis')
            .attr('transform', 'translate(' + padding + ', 0)');
    },
    classPicker: (value, warningLevel) => {
        // Returns a warning class that can be styles through CSS to make data above the warningLevel stand out
        if (value >= warningLevel) {
            return 'd3-warning';
        } else {
            return 'd3-default';
        }
    },
    draw: (type, el, tooltip, data, width, height, xType, xKey, yKey, xToFixed, yToFixed, labels, warningLevel) => {
        // Set defaults for any properties not pased in
        width = width ? width : 300;
        height = height ? height : 300;
        xType = xType ? xType : 'number';
        xKey = xKey ? xKey : 'x';
        yKey = yKey ? yKey : 'y';
        xToFixed = xToFixed ? xToFixed : Infinity;
        yToFixed = yToFixed ? yToFixed : Infinity;
        labels = labels ? labels : 'all';
        warningLevel = warningLevel ? warningLevel : Infinity;
        // Remove any existing SVG content before re-drawing
        d3.select(el).selectAll('*').remove();
        switch(type) {
            case 'bar':
                d3Utils.createBarGraph(el, tooltip, data, width, height, xKey, yKey, xToFixed, yToFixed, labels, warningLevel);
                break;
            case 'line':
                d3Utils.createLineChart(el, tooltip, data, width, height, xType, xKey, yKey, xToFixed, yToFixed, labels, warningLevel);
                break;
            case 'pie':
                d3Utils.createPieChart(el, tooltip, data, width, xType, xKey, yKey, xToFixed, yToFixed, labels);
                break;
            case 'scatter':
                d3Utils.createScatterPlot(el, tooltip, data, width, height, xType, xKey, yKey, xToFixed, yToFixed, labels, warningLevel);
                break;
            default:
        }
    },
    getValue: (inputValue, toFixed) => {
        if (toFixed === Infinity) {
            return inputValue;
        } else {
            return inputValue.toFixed(toFixed);
        }
    },
    scale: (data, xType, key, range, useMin = false) => {
        // Scale to use to best fit data into viewable space
        // Size refers to the x or y pixel size
        let min, max, scale;
        if (xType === 'date') {
            min = new Date(d3.min(data, function (d) { return d[key]; }));
            max = new Date(d3.max(data, function (d) { return d[key]; }));
            scale = d3.scaleTime();
        } else {
            if (useMin) {
                min = d3.min(data, function (d) { return d[key]; });
            } else {
                min = 0;
            }
            max = d3.max(data, function (d) { return d[key]; });
            scale = d3.scaleLinear();
        }
        return scale.domain([min, max]).range(range);
    },
    showLabels: (data, key, value, type, useMin = true) => {
        // Allows for either showing no labels, just the min and max labels, or all labels
        const max = d3.max(data, function (d) { return d[key]; });
        let min = 0;
        if (useMin) {
            min = d3.min(data, function (d) { return d[key]; });
        }
        if ((type !== 'none') && ((type === 'minmax' && (value === max || value === min)) || (type === 'all'))) {
            return value;
        }
    }
}

export default d3Utils;
