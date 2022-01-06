import React, { Component } from 'react'

export default class Mouse extends Component {
  state = {
    x: 0,
    y: 0
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove = e => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    const { x, y } = this.state

    return (
      <div>
        {/* 推荐使用 children */}
        {this.props.children({ x, y })}
      </div>
    )
  }
}