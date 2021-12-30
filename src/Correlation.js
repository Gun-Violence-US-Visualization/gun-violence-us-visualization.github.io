import React, { useState, useEffect } from "react"
import * as d3 from "d3"

function Correlation(data) {
    const [statesData, setStatesData] = useState([]);     //react用来注释数据
    const ref = React.useRef(null)
    // console.log(data)

    useEffect(() => {
        (async () => {
            // set the dimensions and margins of the graph
            const margin = { top: 10, right: 30, bottom: 30, left: 60 },
                width = 560 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            const svg = d3.select(".usCorrelation")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    `translate(${margin.left}, ${margin.top})`);

            const tooltip = d3.select(".usCorrelation")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "1px")
                .style("border-radius", "5px")
                .style("padding", "10px")

            //Read the data
            d3.csv("state.csv").then(function (data) {
                // Add X axis
                const x = d3.scaleLinear()
                    .domain([0, 110])
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x));

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, 0.7])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Color scale: give me a specie name, I return a color
                const color = d3.scaleLinear().domain([-25,20])
                    .range(["red", "blue"])

                // Highlight the specie that is hovered
                const highlight = function (event, d) {
                    const selected_specie = d.rate

                    tooltip
                        .style("opacity", 1)

                    d3.selectAll(".dot")
                        .transition()
                        .duration(200)
                        .style("fill", "lightgrey")
                        .attr("r", 3)

                    d3.selectAll("#" + "dot" + d.state)
                        .transition()
                        .duration(200)
                        .style("fill", color(selected_specie))
                        .attr("r", 5)
                }

                // Highlight the specie that is hovered
                const doNotHighlight = function (event, d) {
                    tooltip
                        .transition()
                        .duration(200)
                        .style("opacity", 0)

                    d3.selectAll(".dot")
                        .transition()
                        .duration(200)
                        .style("fill", d => color(d.rate))
                        .attr("r", 3)
                }
                const mousemove = function (event, d) {
                    tooltip
                        .html(`${d.state}: with a gun possessing rate of ${d.gunhold} and ${106 - d.policy} qualifications on gun holding`)
                        .style("left", (event.x) / 2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
                        .style("top", (event.y) / 2 + "px")
                }
                svg.append('g')
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("class", function (d) {  return "dot " + d.rate })
                    .attr("id", function (d) { console.log(d.state);  return "dot" + d.state })
                    .attr("cx", function (d) {  return x(106 - d.policy); })
                    .attr("cy", function (d) { return y(d.gunhold); })
                    .attr("r", 3)
                    .style("fill", function (d) { return color(d.rate); })
                    .on("mouseover", highlight)
                    .on("mouseleave", doNotHighlight)
                    .on("mousemove", mousemove)
                svg.append('g')
            })
        })();
    }, [statesData.length]
    )

    return (
        <div viewBox="0 0 960 600" className="usCorrelation" ref={ref}></div>      //渲染了这个东西出来
    )
}

export default Correlation