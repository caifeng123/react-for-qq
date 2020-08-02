import React, { useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {
  NavBar,
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import { login } from '../../redux/actions'


const Login = ({login,user,history}) =>{

  const state={
    username:"",
    password:""
  }
  const { msg ,redirctTo} = user
  if (redirctTo) {
    return (<Redirect to={redirctTo}></Redirect>)
  }
  if(msg){
    Toast.info(msg, 1)
  }
  return (
    <div>
        <NavBar>cc交流</NavBar>
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem placeholder="请输入用户名" clear onChange={val=>state.username=val}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem placeholder="请输入密码" clear type="password" onChange={val=>state.password=val}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={()=>{ login(state)}}>登陆</Button>
          <WhiteSpace/>
          <Button onClick={()=>history.replace('/register')}>未有账户</Button>
        </WingBlank>
    </div>
  ) 
}
export default connect(
  state=>({user:state.user}),
  {login}
)(Login)