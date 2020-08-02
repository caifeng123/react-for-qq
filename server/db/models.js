const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/zhiping', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});
//得到特定字段 Model
//1、定义schema(描述文档结构)
const userSchema=mongoose.Schema({  //指定文档结构，字段名，类型，是否必须
  username:{type:'String',require:true},
  password:{type:'String',require:true},
  type:{type:'String',require:true},
  avatar:{type:'String'},
  depart:{type:'String'},
  info:{type:'String'},
  companyname:{type:'String'},
  degree:{type:'String'},
  skill:{type:'String'},
  salary:{type:'String'}
})
//2、定义Model(操作集合)
const UserModel = mongoose.model('user',userSchema) //确定集合名称为 user ，生成构造函数

exports.UserModel=UserModel


//1、定义schema(描述文档结构)
const chatSchema=mongoose.Schema({  //指定文档结构，字段名，类型，是否必须
    from:{type:'String',require:true},
    to:{type:'String',require:true},
    chat_id:{type:'String',require:true},
    content:{type:'String',require:true},
    read:{type:Boolean,default:false},
    creat_time:{type:Number}
  })
  //2、定义Model(操作集合)
  const ChatModel = mongoose.model('chat',chatSchema) //确定集合名称为 user ，生成构造函数
  
  exports.ChatModel=ChatModel