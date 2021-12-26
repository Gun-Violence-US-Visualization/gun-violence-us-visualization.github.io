import React, { useState, useEffect, useLayoutEffect } from "react"
// import { geoEqualEarth, geoPath } from "d3-geo"
import d3Tip from "d3-tip"
import { geoAlbers, geoPath, geoAlbersUsa } from "d3-geo"
import { useD3 } from './hooks/useD3';
import * as d3 from "d3"
import { feature } from "topojson-client"

// const projection = geoEqualEarth()
//   .scale(160)
//   .translate([ 800 / 2, 450 / 2 ])

function Map(props) {

  const ref = React.useRef(null);
  const [statesData, setStatesData] = useState([]);
  const [scaleData, setScaleData] = useState(props.scaleSend);
  // const [casesData, setCasesData] = useState([]);

  // let projection = geoAlbersUsa()
  // .scale(scaleData)
  // .translate([ 960 / 2, 600 / 2 ])

  // console.log(`OUT${scaleData}`)
  
  useEffect(() => {

    (async () => {
      const res = await fetch('./gz_2010_us_040_00_500k.json')
      const statesDataCombine = await res.json();
      const statesData = statesDataCombine.features
      setStatesData(statesData);
      setScaleData(props.scaleSend);

      // const res1 = await fetch('./cases.geojson')
      // const casesDataCombine = await res1.json();
      // const casesData = casesDataCombine.features;
      // setCasesData(casesData);

      const projection = geoAlbersUsa()
        .scale(scaleData)
        .translate([960 / 2, 600 / 2])

      const chartEl = d3.select(ref.current);
      chartEl.selectAll("*").remove();

      const chart = chartEl.append("g")

      const path = d3.geoPath()
        .projection(projection);

      // const caseTip = d3.select(".case").append("div") 
      //   .attr("class", "caseTip")               
      //   .style("opacity", 0);

      console.log(scaleData);
      const myColor = d3.scaleLinear().domain([1, 45]).range(["white","#666666"])

      var caseTip = d3Tip()
        // .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d,casesData) {
          return (
          "<div class='caseTip'>" +
          "<span>State:</span> <span>" + casesData.properties.state + "</span><br>"
          +"<span>City:</span> <span>" + casesData.properties.city + "</span><br>"
          +"<span>Killed:</span> <span>" + casesData.properties.killed + "</span><br>"
          +"<span>Injured:</span> <span>" + casesData.properties.injured + "</span><br>"
          +"<span>Killed:</span> <span>" + casesData.properties.year +"-" + casesData.properties.month+"-"+casesData.properties.day + "</span><br>"
          +"<span>Gun:</span> <span>" + casesData.properties.guntype + "</span>"
          +"</div>"
          )
        })

      chart.call(caseTip);

      chart.selectAll("path")
        .data(statesData)
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("id", function (d) {
          return d.properties.NAME
        })
        .attr("d", path)
        // .style("fill", "steelblue");
        .style(
            "opacity", 
            function(d, i){

                  // console.log(data1.data1[i].num)
                  if (props.data2[d.properties.NAME]!=null){
                    return props.data1[d.properties.NAME].total + 0.05
                  }

            })
        .style(
          "fill",
          function (d) {
                console.log(d.properties.NAME)
                console.log(props.data2[d.properties.NAME])
                if (props.data2[d.properties.NAME]!=null){
                return myColor(props.data2[d.properties.NAME].total)
                }
          })
        .on(
          "click",function (d) {
            setScaleData(1500)
          }
        )
      
      

      chart
        .selectAll(".points")
        .data(props.data3).enter()
        .append("circle")
        .attr("class", "case")
        .attr("r",
          function (d) {
            // console.log(d)
            return 3.0
            // }
          })
        .attr("transform",

          function (d) {
            // console.log(d)
            return "translate(" + projection(d.geometry.coordinates) + ")"
          })
        .on('mouseover', caseTip.show)
        .on('mouseout', caseTip.hide)


    })();

  }, [statesData.length]
  )


  return (

    <svg viewBox="0 0 960 600" className="usMap Map" ref={ref}></svg>
  )
}



export default Map