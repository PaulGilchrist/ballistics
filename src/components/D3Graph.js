import React, { useRef, useEffect } from 'react';
import './d3graph.css'

import * as d3 from 'd3'

import d3Utils from 'pg-d3-utils';

const D3Graph = ({data, height, labels, padding, type, warningLevel, width, xKey, xToFixed, xType, yKey, yToFixed, zKey}) => {

    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            // Create a tooltip that will remain hidden until hover
            const tooltip = d3.select('body')
                .append('div')
                .attr('class', 'd3-tooltip')
                .style('opacity', 0)
                .style('pointer-events', 'none')
                .style('position', 'absolute');
            // Set initial values from querystring if they existing
            d3Utils.draw({
                data: data, // this.abs(this.data, this.yKey)
                el: d3Container.current,
                height,
                labels,
                padding: 50,
                tooltip,
                type,
                warningLevel,
                width,
                xKey,
                xToFixed,
                xType,
                yKey,
                yToFixed,
                zKey: null
            });
        },[data, height, labels, padding, type, warningLevel, width, xKey, xToFixed, xType, yKey, yToFixed, zKey]
    )

    return (
        <div ref={d3Container} />
    );
}

export default D3Graph