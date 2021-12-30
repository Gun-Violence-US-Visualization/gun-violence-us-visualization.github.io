import React, { useState, useEffect } from "react"
// import { geoEqualEarth, geoPath } from "d3-geo"
import d3Tip from "d3-tip"
import { geoAlbersUsa } from "d3-geo"
import * as d3 from "d3"

function Map(props) {

  const ref = React.useRef(null);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [statesSum, setStatesSum] = useState([]);
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

      const resSum = await fetch('./state_sum.json')
      const statesSum = await resSum.json();
      // const statesSum = statesSumCombine.features
      setStatesSum(statesSum);

      const projection = geoAlbersUsa()
        .scale(props.scaleSend)
        .translate([960 / 2, 600 / 2])

      const chartEl = d3.select(ref.current);
      chartEl.selectAll("*").remove();

      const chart = chartEl.append("g")

      const path = d3.geoPath()
        .projection(projection);

      const policyColor = d3.scaleLinear().domain([1, 70]).range(["#E9E8E2", "#494949"])
      const gunRateColor = d3.scaleLinear().domain([0.1, 0.6]).range(["#E9E8E2", "#494949"])
      const caseColor = d3.scaleLinear().domain([0, 1, 2, 3]).range(["#f2b59d", "#e56249", "#cc3c31", "#a52723"])

      const caseTip = d3Tip()
        // .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d, casesData) {
          if (casesData.properties.guntype == null) {
            return (
              "<div class='caseTip'>" +
              "<span class='kill-number'>" + casesData.properties.killed + "</span>"
              + "<span>KILL</span>"
              + "<span class='injure-number'>" + casesData.properties.injured + "</span>"
              + "<span>INJURE</span><br>"
              + "<span>" + casesData.properties.state.toUpperCase() + " " + "</span><br>"
              + "<span>" + casesData.properties.city + "</span><br>"
              + "<span>" + casesData.properties.year + "-" + casesData.properties.month + "-" + casesData.properties.day + "</span><br>"
              + "</div>"
            )
          } else {
            return (
              "<div class='caseTip'>" +
              "<span class='kill-number'>" + casesData.properties.killed + "</span>"
              + "<span>KILL</span>"
              + "<span class='injure-number'>" + casesData.properties.injured + "</span>"
              + "<span>INJURE</span><br>"
              + "<span>" + casesData.properties.state.toUpperCase() + " " + "</span><br>"
              + "<span>" + casesData.properties.city + "</span><br>"
              + "<span>" + casesData.properties.year + "-" + casesData.properties.month + "-" + casesData.properties.day + "</span><br>"
              + "<span>" + " " + "</span><br>"
              + "<span>GUN</span><br> <span>" + casesData.properties.guntype + "</span>"
              + "</div>"
            )
          }
        })

      chart.call(caseTip);

      const stateTip = d3Tip()
        .html(function (d, statesData) {
          let state = ""
          if (props.data2[statesData.properties.NAME] != null) {
            state = statesData.properties.NAME
          } else {
            state = "District of Columbia"
          }
          return (
            "<div class='stateTip'>"

            + "<div class='state-detail'>"

            + "<span class='state-name'>" + state.toUpperCase() + "</span>"

            + "<div class='detail-svg'></div>"

            + "<div class='chart-bar num-bar'"+"style='width:" + (statesSum[state].num*12/370) + "vw'"+">"+"</div>"+"<p class='bar-tip'>" + statesSum[state].num + "</p><br>"

            + "<div class='chart-bar killed-bar'"+"style='width:" + (statesSum[state].killed*12/500) + "vw'"+">"+"</div>"+"<p class='bar-tip'>" + statesSum[state].killed + "</p><br>"

            + "<div class='chart-bar injured-bar'"+"style='width:" + (statesSum[state].injured*12/1600) + "vw'"+">"+"</div>"+"<p class='bar-tip'>" + statesSum[state].injured + "</p><br>"
            
            // + "</div>"
            
            + "</div>"

            + "</div>"
          )
        })

      // const stateTip = d3.select()

      // d3.select(".detail-svg")
      // .append("svg")
      // .attr("width", 160)
      // .attr("height", 50);

      chart.call(stateTip);

      // const chartDetail = d3.select(".detail-svg")
      //   .append("svg")
      // .enter()
      // .append("path")
      // .attr("class", "statedd")
      // .attr("id", function (d) {
      //   console.log(d)
      //   return d.properties.NAME
      // })
      // .attr("d", path)

      const filterDef = chart.append("defs")
      const filterRed = filterDef.append("filter").attr("id", "inset-shadow-red");
      filterRed
        .append("feFlood")
        .attr("flood-color", "#fd545c")
      filterRed.append("feComposite")
        .attr("in2", "SourceGraphic")
        .attr("operator", "out")
      filterRed.append("feGaussianBlur")
        .attr("stdDeviation", "0.3")
        .attr("result", "blur")
      filterRed.append("feComposite")
        .attr("operator", "atop")
        .attr("in2", "SourceGraphic")

      const filterBlue = filterDef.append("filter").attr("id", "inset-shadow-blue");
      filterBlue
        .append("feFlood")
        .attr("flood-color", "#54bffd")
      filterBlue.append("feComposite")
        .attr("in2", "SourceGraphic")
        .attr("operator", "out")
      filterBlue.append("feGaussianBlur")
        .attr("stdDeviation", "0.3")
        .attr("result", "blur")
      filterBlue.append("feComposite")
        .attr("operator", "atop")
        .attr("in2", "SourceGraphic")



      chart.selectAll("path")
        .data(statesData)
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("id", function (d) {
          return d.properties.NAME
        })
        .attr("d", path)
        // .style(
        //   "opacity",
        //   function (d) {
        //     if (props.data2[d.properties.NAME] != null) {
        //       return props.data1[d.properties.NAME].total + 0.05

        //     }
        //   })
        .style(
          "fill",
          function (d) {
            if (props.selectPolicy) {
              if (props.data2[d.properties.NAME] != null) {
                // console.log(d.properties.NAME)
                return policyColor(props.data2[d.properties.NAME].total)
              }
            } else if (props.selectGunRate) {
              if (props.data2[d.properties.NAME] != null) {
                // console.log(d.properties.NAME)
                return gunRateColor(props.data2[d.properties.NAME].gunhold)
              }
            } else {
              return "#E9E8E2"
            }
          })
        .style(
          "stroke", function (d) {
            if (props.selectVote) {
              if (props.data1[d.properties.NAME] != null) {
                if (props.data1[d.properties.NAME].rate > 0) {
                  return "#6DBECC"
                } else {
                  return "#CC6B76"
                }
              }
            }
          }
        )
        .style(
          "stroke-position",
          "inside"
        )
        .style(
          "stroke-width", function (d) {
            if (props.selectVote) {
              return 0.5
            }
          }
        )
        // .style(
        //   "filter",function (d) {
        //     if (props.selectVote){
        //       if (props.data1[d.properties.NAME] != null) {
        //         if (props.data1[d.properties.NAME].rate > 0){
        //           return "url(#inset-shadow-blue)"
        //         }else{
        //           return "url(#inset-shadow-red)"
        //         }
        //       }
        //     }
        //   }
        // )
        .on("mouseover", function (d, statesData) {
          // if (props.data2[statesData.properties.NAME] != null) {
          if (props.data1[statesData.properties.NAME].rate > 0) {
            console.log(props.data1[statesData.properties.NAME])
            d3.select(this).style("fill", "#6DBECC");
          } else {
            d3.select(this).style("fill", "#CC6B76");
          }
          // }
        }
        )
        .on("mouseout", function (d, statesData) {
          let color = "#E9E8E2"
          if (props.selectPolicy) {
            if (props.data2[statesData.properties.NAME] != null) {
              console.log(statesData.properties.NAME)
              color = policyColor(props.data2[statesData.properties.NAME].total)
            }
          } else if (props.selectGunRate) {
            if (props.data2[statesData.properties.NAME] != null) {
              // console.log(d.properties.NAME)
              color = gunRateColor(props.data2[statesData.properties.NAME].gunhold)
            }
          } else {
            color = "#E9E8E2"
          }
          d3.select(this).style("fill", color);
        }
        )
        .on("click",stateTip.show)

      console.log("INtrigger")

      if (props.selectCases) {

        chart
          .selectAll(".points")
          .data(props.data3).enter()
          .append("circle")
          .attr("class", "case")
          .attr("r",
            function (d) {
              if (parseInt(d.properties.killed) + parseInt(d.properties.injured) >= 20) {
                return 3.0
              } else {
                return 1.5
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
            if (d.properties.CLASS == "city") {
              return 1.0
            } else {
              return 0.0
            }
          })
        .attr("height",
          function (d) {
            if (d.properties.CLASS == "city") {
              return 1.0
            } else {
              return 0.0
            }

          })
        .attr("fill", 'rgba(255,255,255,0.0)')
        // .attr("stroke",)
        .attr("transform",
          function (d) {
            return "translate(" + projection(d.geometry.coordinates) + ")"
          })


    })();

  }, [props.scaleSend, props.selectCases, props.selectPolicy, props.selectVote, props.selectGunRate]
  )


  return (

      <svg viewBox="0 0 960 600" className="usMap Map" ref={ref}>
      </svg>

  )
}

export default Map