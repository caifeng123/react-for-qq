import React, { Component } from 'react'
import {
  Button,
} from 'antd-mobile'

export default class Notfound extends Component {
  render() {
    return (
      <div>
        <h2 style={{textAlign:"center",lineHeight:"200px"}}>找不到该页面</h2>
        <Button type="primary" onClick={()=>this.props.history.replace("/")}> 返回首页</Button>
      </div>
    )
  }
}