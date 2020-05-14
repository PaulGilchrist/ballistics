import React, { useRef, useEffect } from 'react';
import './d3graph.css'

import * as d3 from 'd3'

import d3Utils from 'pg-d3-utils';

const D3Graph = (props) => {
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
                data: props.data, // this.abs(this.data, this.yKey)
                el: d3Container.current,
                height: props.height,
                labels: props.labels,
                padding: 50,
                tooltip,
                type: props.type,
                warningLevel: props.warningLevel,
                width: props.width,
                xKey: props.xKey,
                xToFixed: props.xToFixed,
                xType: props.xType,
                yKey: props.yKey,
                yToFixed: props.yToFixed,
                zKey: null
            });
        },[props.data, props.height, props.labels, props.padding, props.type, props.warningLevel, props.width, props.xKey, props.xToFixed, props.xType, props.yKey, props.yToFixed, props.zKey]
    )

    return (
        <div ref={d3Container} />
    );
}

export default D3Graph