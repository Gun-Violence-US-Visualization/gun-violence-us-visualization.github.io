import React, { useState, useEffect } from "react"
import * as d3 from "d3"

function UniTipBar(props) {
    const ref = React.useRef(null)
    const [d, setD] = useState(null)
    const [dName,setdName] = useState(null)
    const [count,setCount] = useState(null)

    useEffect(() => {
        (async () => {
        console.log(props.uniData)
        for (var i = 0; i < props.data5.length; i++) {
            if (props.data5[i].properties.name == props.searchInput) {
                setD(props.data5[i].properties)
            }
        }
        if(d.name) {
        setdName(d.name)
        }
        if(props.searchData.length) {
        setCount(props.searchData.length)
        }

        console.log(`UniNameIs${dName}`)

        const caseColor = d3.scaleLinear().domain([0, 1, 2, 3]).range(["#f2b59d", "#e56249", "#cc3c31", "#a52723"])

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        svg.selectAll(".caseCircle").data(props.uniData).enter().append("circle")
        .attr("cx", function (d, i) { 
            if(props.selectSerious){
                return 480
            }else{
                return 180 + i * 200 
            }
        })
        .attr("cy", 80)
        .attr("r",
            function (d,i) {
                if (d==0){
                    return 0
                }else{
                if (props.selectLowerRange) {
                    return 10.0 + d * 160 / 100
                }else if(props.selectSerious){
                    if (i==3){
                        return d * 20.0
                    }
                }else {
                    return 10.0 + d * 160 / 300
                }
            }
            })
        .attr("fill", function (d, i){ 
            return caseColor(i) 
        })


    })();

    }, [props.searchInput, props.uniData])

    return (
        <div>
            {props.callUniTip &&

                <div class='universityTip'>
                    <div class='universityChart'>
                        <svg viewBox="0 0 960 120" ref={ref} className="caseCircleLine" ></svg>
                    </div>
                    <p>
                        <span className='name important-font'>{dName} </span>
                        <br />
                        <span className="huge important-font">{props.selectSerious && "HUGE"}</span><span> CASES in {props.selectLowerRange && "200km"}{!props.selectLowerRange && "500km"} </span><span className="count important-font">{count}</span>
                    </p>
                </div>
            }
        </div>
    )


}

export default UniTipBar