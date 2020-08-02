/**
 * 包含n个reducer函数
 * 1.根据老的state和指定的action返回新的state
 */
import {combineReducers} from 'redux'
import {
  AUTH_SUCCESS,
  ERROR_INFO,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USERLIST,
  RECEIVE_MESSAGE_LIST,
  RECEIVE_MESSAGE
} from './action-types'
import {getRedirctUrl} from '../utils/index'

const Inituser={
  username:'',
  type:'',
  msg:'',
  redirctTo:''
}

function user(state=Inituser,action){
  switch(action.type){
    case AUTH_SUCCESS:
      const {type,avatar} = action.data
      return {...action.data,redirctTo:getRedirctUrl(type,avatar)}
    case ERROR_INFO:
      return {...state,msg:action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...Inituser,msg:action.data}
    default:
      return state
  }
}

function userlist(state=[],action){
  switch(action.type){
    case RECEIVE_USERLIST:
      return action.data
    default:
      return state
  }
}

const InitChat = {
  allusers:{},
  chats:[], //当前用户所有对话
  unReadCount:0 //总的未读数
}

function chat(state=InitChat,action){
  switch (action.type){
    // case 
    case RECEIVE_MESSAGE_LIST:
      const {allusers,chats}=action.data
      return {
        allusers,
        chats,
        unReadCount:0
      }
    case RECEIVE_MESSAGE:
      const chatmsg = action.data
      return {
        allusers:state.allusers,
        chats:[...state.chats,chatmsg],
        unReadCount:0
      }
    default :
      return state
  }

}

export default combineReducers({
  user,
  userlist,
  chat
})
//向外暴露的状态结构{xxx:0,yyy:0}