import React, { useState, useEffect } from "react"

function ChartExample(props) {

    return(
        <div className="chart-example">

            {props.selectPolicy && <div><img className="chart-example-single" src="./policy.svg" height="60px"/></div>}
            {props.selectGunRate && <div><img className="chart-example-single" src="./gunhold.svg" height="60px"/></div>}
            {props.selectVote && <div><img className="chart-example-single" src="./party.svg" height="60px"/></div>}
            {props.selectCases && <div><img className="chart-example-single" src="./cases.svg" height="60px"/></div>}

        </div>
    )

}

export default ChartExample