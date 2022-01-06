import React, { useState, useEffect } from "react"

function ChartExample(props) {

    return(
        <div className="chart-example">

            {props.selectPolicy && <div className="chart-example-single"><img src="./media/policy.svg" height="100%"/></div>}
            {props.selectGunRate && <div className="chart-example-single"><img src="./media/gunhold.svg" height="100%"/></div>}
            {props.selectVote && <div className="chart-example-single"><img src="./media/party.svg" height="100%"/></div>}
            {props.selectCases && <div className="chart-example-single"><img src="./media/cases.svg" height="100%"/></div>}

        </div>
    )

}

export default ChartExample