import React, { Component } from 'react'
import {
  Card,
  WingBlank,
  WhiteSpace
} from 'antd-mobile'
const { Header, Body } = Card

export default class Userlist extends Component {
  render() {
    const { userlist } = this.props
    return (
      <WingBlank style={{marginTop:50,marginBottom:60}}>
        {
          userlist.map((user) => (
            <div key={user._id}>
              <WhiteSpace/>
              <Card onClick={()=>this.props.history.push(`./chat/${user._id}`)}>
                <Header
                  thumb={user.avatar?require(`../../assets/imgs/${user.avatar}.png`):null}
                  thumbStyle={{width:'30px',height:'30px'}}
                  extra={`大神姓名：${user.username}`}
                />
                <Body>
                  <div>学历：{user.degree}</div>
                  <div>技能：{user.skill}</div>
                  <div>薪资要求：{user.salary}</div>
                </Body>
              </Card>
            </div>
          ))
        }
      </WingBlank>
    )
  }
}
