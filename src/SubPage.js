import React, { useState, useEffect } from "react"
import ScrollToButton from "./components/ScrollToButton";
import Section from "./components/Section";
import Statistics from './Statistics'
import Profile from './Profile'
import Correlation from './Correlation'
import Data_sum from './Data_sum';
import Case_sum from './Case_sum';

function SubPage(props) {
    const [show, setShow] = useState(null);

    useEffect(() => {

        if (props.selectCases && !props.selectPolicy && !props.selectVote && !props.selectGunRate){
            setShow(1)
        }else if(props.selectCases && props.selectVote &&(props.selectPolicy || props.selectGunRate )) {
            setShow(2)
        // }else if(props.selectCases && !props.selectPolicy && !props.selectVote && !props.selectGunRate) {
        //     setShow(3)
        }else(
            setShow(null)
        )

    }, [props.selectCases, props.selectPolicy, props.selectVote, props.selectGunRate])

    return (
        <div>
            {show && <div className="SubPageContainer" id="Detail">

                {/* <div className="learn-more"> */}
                <ScrollToButton buttonClass="learn-more" toId="Detail">LEARN MORE</ScrollToButton>
                {/* </div> */}
                <div>
                    {/* <Statistics/> */}
                    {show==1 && <div><Profile /> <Statistics /></div>}
                    {show==2 && <div><Data_sum/><Case_sum/><Correlation />
                        <div className="down-chart-container set"><p>{"政党、法律与持枪政策：三者有显著或较显著相关关系。民主党支持率高的州（蓝州），持枪政策更严格，共和党州（红州）则反之（Cov = 0.58， p < 0.01）。蓝州相对红州持枪率也更低（Cov = 0.6, p < 0.01）。持枪政策越严格的州持枪率更低（Cov = 0.8, p < 0.01）。"}</p>
                        </div>
                        {/* <div></div> */}
                    </div>}
                    {/* {show==3 && <Profile />} */}
                </div>
                {/* {show==1 && <div className="conclusion"><p>{" "}</p></div>} */}
                {/* {show==2 && } */}
                {/* <div className="spacer"></div> */}
                <ScrollToButton buttonClass="back-to-top" toId="App-header">Back To TOP</ScrollToButton>
            </div>         
            }
        </div>
    )
}

export default SubPage