import React, { useState, useEffect } from "react"
// import { geoEqualEarth, geoPath } from "d3-geo"
import d3Tip from "d3-tip"
import { geoAlbersUsa } from "d3-geo"
import * as d3 from "d3"

function Map(props) {

  const ref = React.useRef(null);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  // console.log(`OUT${props.selectSend}`)

  useEffect(() => {
    (async () => {

      // console.log("trigger")

      // console.log(props.selectSend)

      const res = await fetch('./gz_2010_us_040_00_500k.json')
      const statesDataCombine = await res.json();
      const statesData = statesDataCombine.features
      setStatesData(statesData);

      const resCity = await fetch('./USA_Major_Cities.geojson')
      const citiesDataCombine = await resCity.json();
      const citiesData = citiesDataCombine.features
      setCitiesData(citiesData);

      const projection = geoAlbersUsa()
        .scale(props.scaleSend)
        .translate([960 / 2, 600 / 2])

      const chartEl = d3.select(ref.current);
      chartEl.selectAll("*").remove();

      const chart = chartEl.append("g")

      const path = d3.geoPath()
        .projection(projection);

      const policyColor = d3.scaleLinear().domain([1, 45]).range(["#696969", "#2b2b2b"])
      const caseColor = d3.scaleLinear().domain([0, 1, 2, 3]).range(["#f2b59d", "#e56249", "#cc3c31", "#a52723"])

      var caseTip = d3Tip()
        // .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d, casesData) {
          return (
            "<div class='caseTip'>" +
            "<span>State:</span> <span>" + casesData.properties.state + "</span><br>"
            + "<span>City:</span> <span>" + casesData.properties.city + "</span><br>"
            + "<span>Killed:</span> <span>" + casesData.properties.killed + "</span><br>"
            + "<span>Injured:</span> <span>" + casesData.properties.injured + "</span><br>"
            + "<span>Killed:</span> <span>" + casesData.properties.year + "-" + casesData.properties.month + "-" + casesData.properties.day + "</span><br>"
            + "<span>Gun:</span> <span>" + casesData.properties.guntype + "</span>"
            + "</div>"
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
        .style(
          "opacity",
          function (d) {
            if (props.data2[d.properties.NAME] != null) {
              return props.data1[d.properties.NAME].total + 0.05
              
            }
          })
        .style(
          "fill",
          function (d) {
           if (props.data2[d.properties.NAME] != null) {
              // console.log(d.properties.NAME)
              return policyColor(props.data2[d.properties.NAME].total)
            
            }
          })
          console.log("INtrigger")

      if (props.selectCases){
        
        chart
          .selectAll(".points")
          .data(props.data3).enter()
          .append("circle")
          .attr("class", "case")
          .attr("r",
            function (d) {
              if (parseInt(d.properties.killed) + parseInt(d.properties.injured) >= 20) {
                return 4.0
              } else {
                return 2.0
              }
            })
          .attr("transform",

            function (d) {
              return "translate(" + projection(d.geometry.coordinates) + ")"
            })
          .style("fill", function (d) {
            if (parseInt(d.properties.killed) + parseInt(d.properties.injured) < 5) {
              return caseColor(0)
            } else if (parseInt(d.properties.killed) + parseInt(d.properties.injured) < 10) {
              return caseColor(1)
            } else if (parseInt(d.properties.killed) + parseInt(d.properties.injured) < 20) {
              return caseColor(2)
            } else {
              return caseColor(3)
            }
          })
          .on('mouseover', caseTip.show)
          .on('mouseout', caseTip.hide)
      }

      chart
      .selectAll(".city")
      .data(citiesData).enter()
      .append("rect")
      .attr("class", "city")
      .attr("width",
        function (d) {
          if (d.properties.CLASS == "city" ){
            return 1.0
          }else{
            return 0.0
          }
        })
      .attr("height",
        function (d) {
          if (d.properties.CLASS == "city" ){
            return 1.0
          }else{
            return 0.0
          }
            
        })
      .attr("fill",'rgba(255,255,255,0.0)')
      // .attr("stroke",)
      .attr("transform",
        function (d) {
          return "translate(" + projection(d.geometry.coordinates) + ")"
        })


    })();

  }, [props.scaleSend,props.selectCases]
  )


  return (

    <svg viewBox="0 0 960 600" className="usMap Map" ref={ref}></svg>
  )
}

export default Map