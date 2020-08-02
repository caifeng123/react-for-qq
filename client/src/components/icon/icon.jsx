import React, { Component } from 'react'
import './icon.css'

export default class Icon extends Component {
  render() {
    const {style} = this.props
    return (
      <div>
        <svg className="icon" aria-hidden="true" style={style}>
            <use xlinkHref={`#icon-${this.props.type}`}></use>
        </svg>
      </div>
    )
  }
}
