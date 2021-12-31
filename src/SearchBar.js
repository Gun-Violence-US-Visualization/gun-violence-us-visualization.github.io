import React, { useState, useEffect, useLayoutEffect } from "react"

class Content extends React.Component {
    render() {
      return  <div>
              <input className="search-bar search-bar-bar" type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp} placeholder="Search College" /> 
              {this.props.result.length>0 && <p className="number search-bar-number">{this.props.result.length}</p>}
              </div>;
    }
}

class HelloMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.state = {result: ''};
        this.handleChange = this.handleChange.bind(this);
    }
   
    handleChange(event) {
        this.setState({result:this.props.findnear(event.target.value)});
        this.setState({value: event.target.value});
    }
    render() {
      var value = this.state.value;
      var result = this.state.result;
      return <div className="search-bar-container">
              <Content myDataProp = {value}  result={result}
                updateStateProp = {this.handleChange}></Content>
        </div>;
    }
  }

  export default HelloMessage
//   ReactDOM.render(
//     <HelloMessage />,
//     document.getElementById('example')
//   );