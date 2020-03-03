import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3'

import d3Utils from './../utilities/d3-utils';

const D3Graph = (props) => {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(
        () => {
            const tooltip = d3.select('body')
                .append('div')
                .attr('class', 'd3-tooltip')
                .style('opacity', 0)
                .style('pointer-events', 'none')
                .style('position', 'absolute');
            d3Utils.draw(props.type, d3Container.current, tooltip, props.data, props.width, props.height, props.xType, props.xKey, props.yKey, props.xToFixed, props.yToFixed, props.labels, props.warningLevel);
        },[props.type, props.data, props.width, props.height, props.xType, props.xKey, props.yKey, props.xToFixed, props.yToFixed, props.labels, props.warningLevel]
    )
    return (
        <div ref={d3Container} />
    );
}

export default D3Graph