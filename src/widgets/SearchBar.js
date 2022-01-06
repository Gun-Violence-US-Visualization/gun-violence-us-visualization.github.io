import React, { useState, useEffect, useLayoutEffect } from "react"

class Content extends React.Component {
  render() {
    return <div className="search-bar-content">
      <input className="search-bar" type="text" value={this.props.myDataProp} onChange={this.props.updateStateProp} placeholder="Search College" />
      {/* {this.props.result.length>0 && <p className="number search-bar-number">{this.props.result.length}</p>} */}
    </div>;
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.state = { result: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ result: this.props.findnear(event.target.value) });
    this.setState({ value: event.target.value });
  }

  render() {
    var value = this.state.value;
    var result = this.state.result;
    return (<div className="search-bar-container">

      <div className="search-bar-set">
      <div className="search-bar-set-show">
          <input type="checkbox" id="set1" checked={this.props.selectLowerRange} />
          <label htmlFor="set1">
            <div
              id="set1label"
              className={"tiny-button set-button"}
            onClick={this.props.clickEventsLower}
            >
              <p>Lower Range</p>
            </div>
          </label>
          <input type="checkbox" id="set2" checked={this.props.selectSerious} />
          <label htmlFor="set2">
            <div
              id="set2label"
              className={"tiny-button set-button"}
            onClick={this.props.clickEventsSerious}
            >
              <p>Serious Only</p>
            </div>
          </label>
        </div>
        SET&nbsp;&nbsp;&nbsp;
        {/* <img src="./media/setting.svg" height="95%"/> */}
      </div>
      {/* <div className="search-bar-spacer"></div> */}
      <Content myDataProp={value} result={result}
        updateStateProp={this.handleChange}></Content>
    </div>);
  }
}

export default SearchBar
//   ReactDOM.render(
//     <HelloMessage />,
//     document.getElementById('example')
//   );