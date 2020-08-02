/**
 * 包含n个action creator
 * 异步action
 * 同步action
 */
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUsers,
  reqChatMes,
  // reqReadMes
} from '../api/index'

import {
  AUTH_SUCCESS,
  ERROR_INFO,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USERLIST,
  RECEIVE_MESSAGE_LIST,
  RECEIVE_MESSAGE
} from './action-types'

import io from 'socket.io-client'

//单例模式
function init(dispatch,userid) {
  if (!io.socket) {
    //连接服务器
    const socket = io('ws://localhost:4000')
    io.socket=socket
    //接收消息
    io.socket.on('ser-send', function (data) {
      if(userid===data.data.from||userid===data.data.to){
        dispatch(receivemessage(data.data))
      }
    })
  }
}


// 授权成功的同步
export const authsuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 失败的同步
export const errorinfo = (msg) => ({ type: ERROR_INFO, data: msg })
// 接收user的同步
export const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置user的同步
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
// 获取users列表
export const resetUserList = (userlist) => ({ type: RECEIVE_USERLIST, data: userlist })
// 获取msglists
export const receivemessagelist = ( {allusers,chats}) =>({type: RECEIVE_MESSAGE_LIST, data:  {allusers,chats}})
// 接收一个消息的同步action
const receivemessage = (chatmsg) => ({type:RECEIVE_MESSAGE,data:chatmsg})

//'注册'的异步action
export const register = (user) => {
  const { username, password, password2, type } = user
  if (!username || !password || !password2) {
    return errorinfo('请输入完整')
  }
  if (password !== password2) {
    return errorinfo('两次密码要一致')
  }
  return async dispatch => {
    //发送ajax请求
    const res = await reqRegister({ username, password, type })
    const result = res.data
    if (result.code === 0) {
      //成功
      getmessagelist(dispatch,result.data._id)
      dispatch(authsuccess(result.data))
    } else {
      //失败
      dispatch(errorinfo(result.msg))
    }
  }
}

//'登陆'的异步action
export const login = (user) => {
  const { username, password } = user
  if (!username || !password) {
    return errorinfo('请输入完整')
  }
  return async dispatch => {
    //发送ajax请求
    const res = await reqLogin(user)
    const result = res.data
    if (result.code === 0) {
      //成功
      getmessagelist(dispatch,result.data._id)
      dispatch(authsuccess(result.data))
    } else {
      //失败
      dispatch(errorinfo('用户名或密码错误'))
      // dispatch(errorinfo(result.msg))
    }
  }
}

//'更新'的异步action
export const updateUser = (user) => {
  return async dispatch => {
    let res = await reqUpdateUser(user)
    const result = res.data
    if (result.code === 0) {//data
      dispatch(receiveUser(result.data))
    } else {//msg
      dispatch(resetUser(result.msg))
    }
  }
}

//'获取用户'的异步action
export const getUser = () => {
  return async dispatch => {
    let res = await reqUser()
    const result = res.data
    if (result.code === 0) {
      getmessagelist(dispatch,result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

//获取所有用户的异步action
export const getUsers = (type) => {
  return async dispatch => {
    let res = await reqUsers(type)
    const result = res.data
    dispatch(resetUserList(result.data))
  }
}

//异步发送消息action
export const sendmsg = (from, to, content) => {
  return dispatch => {
    io.socket.emit('cli-send',{from, to, content})
  }
}

//异步获取消息列表数据
async function getmessagelist(dispatch,userid){
  init(dispatch,userid)

  const response = await reqChatMes()
  const result = response.data
  if(result.code===0){
    const {allusers,chats} = result.data
    dispatch(receivemessagelist({allusers,chats}))
  }
}