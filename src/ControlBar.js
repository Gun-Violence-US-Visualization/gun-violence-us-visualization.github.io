import React, { useState, useEffect, useLayoutEffect } from "react"

function ControlBar(props) {
    return (
        <div className="control-bar">
            {/* <div className="block">
                <input type="text"/>
            </div> */}
            <div className="block">
                <div>

                    <input type="checkbox" id="cases" />
                    <label htmlFor="cases">
                        <div
                            className={"title-button"}
                            onClick={props.clickEventsCases}
                        >
                            <p>CASES</p>
                        </div>
                    </label>

                </div>
                <div>

                </div>
            </div>
            <div className="block">
                <div>

                    <input type="checkbox" id="policy" />
                    <label htmlFor="policy">
                        <div
                            className={"title-button"}
                            onClick={props.clickEventsPolicy}
                        >
                            <p>POLICY</p>
                        </div>
                    </label>

                </div>
                <div>

                </div>
            </div>
            <div className="block">
                <div>

                    <input type="checkbox" id="gunRate" />
                    <label htmlFor="gunRate">
                        <div
                            className={"title-button"}
                            onClick={props.clickEventsGunRate}
                        >
                            <p>GUN RATE</p>
                        </div>
                    </label>

                </div>
                <div>

                </div>
            </div>

            <div className="block">
                <div>

                    <input type="checkbox" id="vote" />
                    <label htmlFor="vote">
                        <div
                            className={"title-button"}
                            onClick={props.clickEventsVote}
                        >
                            <p>VOTE</p>
                        </div>
                    </label>

                </div>
                <div>

                </div>

            </div>

            <div className="block">
            <div className={"range"}>
                {/* <input type="range" className="" onChange={props.scaleChange} /> */}
                <button className="" onClick={props.scaleSmall}/>
                <button className="" onClick={props.scaleOrigin}/>
                <button className="" onClick={props.scaleBig}/>
            </div>
            </div>

        </div>
    )
}

export default ControlBar