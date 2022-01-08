import React from 'react';

function Title(props) {
    return (
        <div className="Big-title"
            //  style={`opacity:${props.bigTitleIsShow}`}
            style={{ opacity: props.bigTitleIsShow }}
            onClick={props.reset}
        >
            {/* <div> */}
            <img src="./media/title.svg" height="75vh"/>
                {/* <h1 className="Big-title-text-line1 important-font">All YOU WANT to KNOW about</h1><br/>
                <h1 className="Big-title-text-line2 important-font"> GUN VIOLENCE</h1> */}
                {/* <p>{"基于地理坐标与枪击案件的美国高校安全性可视化平台"}
                <button
                    className="reset-button"
                    onClick={props.reset}
                >
                    <img src="./media/reset.svg" width="70%" />
                </button>
            </p> */}


            {/* </div> */}
            
        </div>

    )
}

export default Title;