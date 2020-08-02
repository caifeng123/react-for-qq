const {ChatModel} = require('../db/models')
module.exports = function (server){
  const io = require('socket.io')(server)

  //监视客户端与服务端的链接
  io.on('connect',function(socket){

    //绑定监听 接收消息
    socket.on('cli-send',function({from,to ,content}){
      const chat_id = [from,to].sort().join('_')
      const creat_time = Date.now()
      new ChatModel({from,to,chat_id,creat_time,content}).save(function(err,chats){
        io.emit('ser-send',{data:chats})
      })

    })

    //发送回复消息
    // socket.emit('ser-send',{data:'就这?'})
  })
}