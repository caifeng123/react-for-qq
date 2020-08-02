/**
 * 包含了所有接口请求的函数
 */
import ajax from './ajax'
export const reqRegister = (user) =>ajax('/register',user,'POST')
export const reqLogin = (user) =>ajax('/login',user,'POST')
export const reqUpdateUser = (user) =>ajax('/update',user,'POST')
export const reqUser = () =>ajax('/user')
export const reqUsers = (type) =>ajax('/userlist',{type})
export const reqChatMes = () =>ajax('/msglist')
export const reqReadMes = (from) =>ajax('/userlist',{from},'POST')
