// 连接数据库
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/zhiping_test', {
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
  type:{type:'String',require:true}
})
//2、定义Model(操作集合)
const UserModel = mongoose.model('user',userSchema) //确定集合名称为 user ，生成构造函数

//3、增删改查
const md5 = require('blueimp-md5')
function add(){
  new UserModel({username:'ccc',password:md5('123'),type:'dashen'}).save((err,doc)=>{
    console.log(doc)
  })
}
function find(){
  UserModel.find({username:'cc'},function(err,docs){
    console.log(docs)
  })
}
// add()
// find()