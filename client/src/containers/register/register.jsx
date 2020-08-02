import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  NavBar,
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Radio,
  Button,
  Toast
} from 'antd-mobile'


import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'

const Listitem = List.Item;

const useRegister = (user) => {
  const [state, _setState] = useState({
    username: "",
    password: "",
    password2: "",
    type: "laoban"
  })

  const setState = (val) => {
    _setState({
      ...state,
      ...val
    })
  }

  useEffect(() => {
    const { redirctTo,msg } = user
    if (redirctTo) {
      return (<Redirect to={redirctTo}></Redirect>)
    }else if(msg!==state.msg){
      setState({msg})
      Toast.info(msg, 1)
    }else {
      console.log('错误处理逻辑执行了')
    }
  }, [user])

  return {
    state,
    setState
  }
}

const Register = ({user,register,history}) =>{

  const {
    state,
    setState
  } = useRegister(user)
  console.log(state)
  
  return (
    <div>
      <NavBar>cc交流</NavBar>
      <Logo></Logo>
      <WingBlank>
        <List>
          <InputItem placeholder="请输入用户名" clear onChange={val => setState({"username": val })}>用户名：</InputItem>
          <WhiteSpace />
          <InputItem placeholder="请输入密码" clear type="password" onChange={val => setState({ 'password': val })}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
          <WhiteSpace />
          <InputItem placeholder="请重新输入密码" clear type="password" onChange={val => setState({'password2': val })}>确认密码：</InputItem>
          <WhiteSpace />
          <Listitem>
            <span>用户类型：</span>&nbsp;&nbsp;&nbsp;
              <Radio checked={state.type === 'laoban'} val="laoban" onChange={val => setState({ type: val.target.val })}>老板</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={state.type === 'dashen'} val="dashen" onChange={val => setState({ type: val.target.val })}>大神</Radio>
          </Listitem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={()=>register(state)}>注册</Button>
        <WhiteSpace />
        <Button onClick={() => history.replace('/login')}>已有账户</Button>
      </WingBlank>
    </div>
  )
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)