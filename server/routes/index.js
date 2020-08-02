var express = require('express');
var router = express.Router();

var md5 = require('blueimp-md5')
const {
  UserModel,
  ChatModel
}=require('../db/models')

const filter={password:0,__v:0}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',function(req,res){
  const {username,password,type} = req.body
  UserModel.findOne({username},function(err,user){
    if(user){
      res.send({code:1,msg:"此用户已存在"})
    }else{
      new UserModel({username,type,password:md5(password)}).save(function(err,user){
        const data={_id:user._id,username,type}
        res.cookie('userid',user._id,{maxAge:1000*60*60*24})
        res.send({code:0,data})
      })
    }
  })
})

router.post('/login',function(req,res){
  const {username,password} = req.body
  UserModel.findOne({username,password:md5(password)},filter,function(err,user){
    if(user){
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:"登陆失败"})
    }
  })
})

router.post('/update',function(req,res){
  const userid =req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:"请先登录"})
  }
  const user=req.body
  UserModel.findOneAndUpdate({_id:userid},{$set:user},function(err,olduser){
    if(!olduser){
      res.clearCookie('userid')
      res.send({code:1,msg:"请先登录"})
    }else{
      const {_id,username,type}=olduser
      const data=Object.assign(user,{_id,username,type})
      res.send({code:0,data})
    }
  })
})

router.get('/user',function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  UserModel.findOne({_id:userid},filter,function(err,data){
    res.send({code:0,data})
  })
})

router.get('/userlist',function(req,res){
  const {type} = req.query
  UserModel.find({type},filter,function(err,users){
    res.send({code:0,data:users})
  })
})

router.get('/msglist',function(req,res){
  const userid = req.cookies.userid
  console.log(userid)
  UserModel.find(function(err,users){
    const allusers=users.reduce((users,user)=>{
      users[user._id]={username:user.username,avatar:user.avatar}
      return users
    },{})
    ChatModel.find({'$or':[{from:userid},{to:userid}]},filter,function(err,chats){
      res.send({code:0,data:{allusers,chats}})
    })
  })
})

router.post('/readmsg',function(req,res){
  const from = req.body.from
  const to = req.cookies.userid
  ChatModel.update({from,to,read:false},{read:true},{multi:true},function(err,raw){
    res.send({code:1,data:raw})
  })
})

module.exports = router;
