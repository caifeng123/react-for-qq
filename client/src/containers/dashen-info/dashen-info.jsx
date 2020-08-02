import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import {
  // Picker,
  InputItem,
  List,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'

import {updateUser} from '../../redux/actions'
import Avatars from '../../components/avatars/avatars'

class DashenInfo extends Component {
  state = {
    skills: [[
      {
        label: '后端',
        value: '后端',
      },
      {
        label: '前端',
        value: '前端',
      },
      {
        label: '算法',
        value: '算法',
      },
      {
        label: '大数据',
        value: '大数据',
      },
    ]],
    degrees:[[
      {
        label: '高中',
        value: '高中',
      },
      {
        label: '大专',
        value: '大专',
      },
      {
        label: '本科',
        value: '本科',
      },
      {
        label: '硕士',
        value: '硕士',
      },
    ]],
    salarys:[[
      {
        label: '最低薪资',
        value: '',
      },
      {
        label: '1000',
        value: '1000',
      },
      {
        label: '2000',
        value: '2000',
      }
    ],[
      {
        label: '最高薪资',
        value: '',
      },
      {
        label: '5000',
        value: '5000',
      },
      {
        label: '10000',
        value: '10000',
      },
    ]]
  }

  uploaddata = () =>{
    const {degree,salary,skill,avatar}=this.state
    this.props.updateUser({degree,skill,salary,avatar})
  }

  setAvatar=(avatar)=>{
    this.setState({avatar})
  }

  render() {
    const {avatar,type} = this.props.user
    if(avatar){
      const path= type==='dashen'?'/dashen':'/laoban'
      return <Redirect to={path}/>
    }
    return (
      <div>
        <Avatars setAvatar={this.setAvatar}/>
        <WhiteSpace />
        <WingBlank>
          <List>
            {/* <Picker
              data={this.state.skills}
              title="选择技能"
              cascade={false}
              cols={1}
              value={this.state.skill}
              onChange={v => this.setState({ skill: v })}
              onOk={v => this.setState({ skill: v })}
            >
              <List.Item arrow="down">选择技能</List.Item>
            </Picker>
            <WhiteSpace />

            <Picker
              data={this.state.degrees}
              title="选择学历"
              cascade={false}
              cols={1}
              value={this.state.degree}
              onChange={v => this.setState({ degree: v })}
              onOk={v => this.setState({ degree: v })}
            >
              <List.Item arrow="down">学历</List.Item>
            </Picker>
            <WhiteSpace />

            <Picker
              data={this.state.salarys}
              title="选择薪资"
              cascade={false}
              cols={1}
              value={this.state.salary}
              onChange={v => this.setState({ salary: v })}
              onOk={v => this.setState({ salary: v })}
              format={(labels)=>labels.join('-')}
            >
              <List.Item arrow="down">薪资要求</List.Item>
            </Picker> */}
            <InputItem placeholder="请输入公司名称" onChange={(skill)=>this.setState({skill})}>技能</InputItem>
            <InputItem placeholder="请输入公司名称" onChange={(degree)=>this.setState({degree})}>学历</InputItem>
            <InputItem placeholder="请输入公司名称" onChange={(salary)=>this.setState({salary})}>工资</InputItem>
            <InputItem placeholder="请输入公司名称" onChange={(companyname)=>this.setState({companyname})}>公司名称</InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={()=>this.uploaddata()}>上传</Button>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
  {updateUser}
)(DashenInfo)