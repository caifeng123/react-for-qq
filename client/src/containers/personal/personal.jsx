import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Result,
  List,
  Button,
  WingBlank,
  Modal
} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
class Personal extends Component {
  modal(){
    Modal.alert("退出","确定要退出吗",[
      { text: '取消', onPress: () => console.log("点击取消") },
      { text: '确认', 
        onPress: () => {
          Cookies.remove('userid')
          this.props.resetUser('退出')
        }
      },
    ])
  }
  render() {
    const { user } = this.props.user
    return (
      <div style={{marginTop:50}}>
        <Result imgUrl={require(`../../assets/imgs/${user.avatar}.png`)}
          title={user.username}
          message={user.companyname}
        />
        <WingBlank>
          <List renderHeader="相关信息" renderFooter=" ">
            <Item>学历：{user.degree}</Item>
            <Item>技能：{user.skill}</Item>
            <Item>薪资要求：{user.salary}</Item>
          </List>
          <Button type="warning" onClick={()=>this.modal()}>退出登陆</Button>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  (state) => ({ user: state }),
  {resetUser}
)(Personal)
