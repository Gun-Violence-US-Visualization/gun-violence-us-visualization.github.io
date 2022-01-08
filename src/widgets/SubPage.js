import React, { useState, useEffect } from "react"
import ScrollToButton from "../components/ScrollToButton";
import Section from "../components/Section";
import Statistics from '../charts/Statistics'
import Profile from '../charts/Profile'
import Correlation from '../charts/Correlation'
import Data_sum from '../charts/Data_sum';
import Case_sum from '../charts/Case_sum';
import Conclusion from '../charts/Conclusion';
// import { CSSTransition } from 'react-transition-group';

function SubPage(props) {
    const [show, setShow] = useState(null);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const clickToState = () => {

        props.setSelectCases(true)
        props.setSelectPolicy(true)
        props.setSelectGunRate(false)
        props.setSelectVote(true)
        setShow(2)
        setShow2(true)
        setShow1(false)
    }

    const clickToCases = () => {

        props.setSelectCases(true)
        props.setSelectPolicy(false)
        props.setSelectGunRate(false)
        props.setSelectVote(false)
        setShow(1)
        setShow2(false)
        setShow1(true)

    }

    useEffect(() => {

        if (props.selectCases && !props.selectPolicy && !props.selectVote && !props.selectGunRate){
            setShow(1)
            setShow1(true)
            setShow2(false)
        }else if(props.selectCases && props.selectVote &&(props.selectPolicy || props.selectGunRate )) {
            setShow(2)
            setShow2(true)
            setShow1(false)
        // }else if(props.selectCases && !props.selectPolicy && !props.selectVote && !props.selectGunRate) {
        //     setShow(3)
        }else(
            setShow(null)
        )
    }, [props.selectCases, props.selectPolicy, props.selectVote, props.selectGunRate])

    return (
        <div>

        {show && <div className="SubPage">

            {show && 
            <ScrollToButton buttonClass="learn-more important-font" toId="Detail">LEARN MORE</ScrollToButton>

            }

            {show && 
            <div className="SubPage-bar-container" id="Detail">
                <div  className="SubPage-top-bar">   
                </div>
                <input type="checkbox" id="sub-case" checked={show1}  onClick={clickToCases}/>
                <label htmlFor="sub-case">
                <div  className="SubPage-top-bar-title" id="sub-title1">
                GUN VIOLENCE IN US - Cases
                </div>
                </label>

                <input type="checkbox" id="sub-state" checked={show2}  onClick={clickToState}/>
                <label htmlFor="sub-state">
                <div  className="SubPage-top-bar-title" id="sub-title2">
                GUN VIOLENCE IN US - State Condition
                </div>
                </label>
            </div>
            }

            {show && <div className="SubPageContainer">

                {/* <div className="learn-more"> */}
                
                {/* </div> */}
                <div>
                    {/* <Statistics/> */}
                    {show==1 && <div> 
                        <Statistics />
                        <Profile />
                        <Conclusion
                            details1={"自2010年起至今，案件数量明显增多。"}
                            details2={"持枪射击者画像显示：白人男性占比最高，其次为黑人男性，女性罪犯占比较少。"}
                        />
                        
                    </div>}
                    {show==2 && <div>
                        <Data_sum/>
                        <Case_sum/>
                        <Correlation/>
                        <Conclusion
                            details1={"政党、法律与持枪政策：三者有显著或较显著相关关系。"}
                            details2={"民主党支持率高的州（蓝州），持枪政策更严格，共和党州（红州）则反之（γ = 0.58， p < 0.01）。"}
                            details3={"蓝州相对红州持枪率也更低（γ = 0.6, p < 0.01）。持枪政策越严格的州持枪率更低（γ = 0.8, p < 0.01）。"}
                        />
                    </div>}
                </div>
            </div>         
            }

            {/* {show && } */}

        </div>
        }
            {show && 
            <div className="SubPage-bar-container">
                <div className="SubPage-foot-bar">
                <ScrollToButton buttonClass="back-to-top important-font" toId="App-header">Back To TOP</ScrollToButton>
                </div>
                <div  className="SubPage-top-bar">    </div>
            </div>
            }
            
        </div>
    )
}

export default SubPage