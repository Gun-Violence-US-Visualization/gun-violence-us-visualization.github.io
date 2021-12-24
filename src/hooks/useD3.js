import React from 'react';
import * as d3 from 'd3';

export const useD3 = (renderChartFn, dependencies) => {
const ref = React.useRef();
React.useEffect(() => {
  const chartEl = d3.select(ref.current);
  chartEl.selectAll("*").remove();
    renderChartFn(chartEl);
    return () => {};
   }, dependencies);
 return ref;
}