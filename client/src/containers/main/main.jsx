import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {
  NavBar
} from 'antd-mobile'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'

import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'

import Notfound from '../../components/not-found/not-found'
import Mytabbar from '../../components/mytabbar/Mytabbar'

import {getUser} from '../../redux/actions'
import {getRedirctUrl} from '../../utils/index'

import '../../assets/css/index.css'

class Main extends Component {
  navlist1 = [{
    path:'/dashen',
    component:Laoban,
    title:'老板列表',
    icon:'home',
    text:'列表主页'
  }]
  navlist2 = [{
    path:'/laoban',
    component:Dashen,
    title:'大神列表',
    icon:'home',
    text:'列表主页'
  }]
  alllist=[{
    path:'/message',
    component:Message,
    title:'对话信息',
    icon:'duihua',
    text:'聊天'
  },{
    path:'/personal',
    component:Personal,
    title:'个人主页',
    icon:'me',
    text:'我的'
  }]
  componentDidMount(){
    //如果cookie有 redux中没有  【按照userid 从获取数据 放到redux】
    const {_id}=this.props.user
    const userid = Cookies.get('userid')

    if(userid&&!_id){
      this.props.getUser()
    }
  }
  replace(path){
    this.props.history.replace(path)
  }
  render() {
    const userid = Cookies.get('userid')
    //如果cookie没有登陆 返回登陆页 【重定向到redux】
    if(!userid){
      return <Redirect to='/login'/>
    }
    const {user}=this.props
    const {pathname}=this.props.location
    //如果当前页面为主页 跳转自己页面
    if(pathname==='/'){
      let path = getRedirctUrl(user.type,user.avatar)
      return <Redirect to = {path} />
    }
    const {navlist1,navlist2,alllist} = this
    let navlist=[]
    if(user.type==='laoban'){
      navlist=navlist2.concat(alllist)
    }
    if(user.type==='dashen'){
      navlist=navlist1.concat(alllist)
    }

    const nownav = navlist.find(nav=>pathname===nav.path)
    return (
      <div style={{overflow:'hidden'}}>
        {nownav?<NavBar>{nownav.title}</NavBar>:null}
        <Switch>
          {nownav?<Route path={nownav.path} component={nownav.component}></Route>:null}
          <Route path="/dasheninfo" component={DashenInfo}></Route>
          <Route path="/laobaninfo" component={LaobanInfo}></Route>
          <Route path="/chat/:userid" component={Chat}></Route>
          <Route component={Notfound}></Route>
        </Switch>
        {nownav?<Mytabbar navlist={navlist} pathname={pathname} replace={(path)=>this.replace(path)}/>:null}
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {getUser}
)(Main)