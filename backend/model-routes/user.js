
const express=require('express');
const user=express.Router()
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const con=require('../connection/db')
user.use(cors());

process.env.SECRET_KEY='secret'


user.post("/add",(req,res)=>{


    const hash= bcrypt.hashSync(req.body.u_password,10)
    const name=req.body.u_name
    const email=req.body.u_email
    const password=hash
    const profile=req.body.u_profile
    const mobile=req.body.u_mobile
    
      
    const userData={
        u_name:name,
        u_email:email,
        u_password:password,
        u_profile:profile,
        u_mobile:mobile
    }
  
   
        
        
        var sql = `insert into user(u_name,u_email,u_password,u_profile,u_mobile) values('${name}','${email}','${password}','${profile}',${mobile})`;

        con.query(sql,(err, result)=> {
          if (err) {
            res.send(err);
        }
        else{
            let token = jwt.sign(userData,process.env.SECRET_KEY,{
                expiresIn:1440
            })
            res.json({token:token,result:result})
        
            console.log("1 record inserted");
        }
        
        });
      });
      
//User login 
user.post('/login',(req,res)=>{
    const email=req.body.u_email;
    const password=req.body.u_password;
    data={
        email:email,
        password:password
    }    
    
        
        
        var que=`select * from user where u_email='${email}'`;
           
        con.query(que,(err, result)=> {
            console.log(result)
          if (result.length==0) {
            res.send('email does not exists..!');
            
          }
         else{
                
                if(bcrypt.compareSync(password,result[0].u_password)){
                let token=jwt.sign(data,process.env.SECRET_KEY,{
                    expiresIn:1440
                }) 
                res.json({token:token,result:result})
            } else{
                res.send('User does not exist')
            }
            
        }
        
        });
      
     
})

//get Profile

user.get('/profile',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    
    
    

    const que=`select * from user where u_email='${decoded.email}'`;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            res.json({result:result})
        }
        else{
            res.send('User Does not Exists')
        }
    })


})

// Delete Profile
    user.delete("/delete/:id",(req,res) => {
    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    const id = req.params.id

    const que = `DELETE  FROM user WHERE u_id=${id}`;
    con.query(que,(err,result) => {
       
       
        if(err){
            res.send(err);
        }else{
            res.json(result)
            
        }
    })
})

//get one user
user.get('/edit/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)   
    
    const que=`select * from user where u_id='${req.params.id}'`;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            res.json({result:result})
        }
        else{
            res.send('User Does not Exists')
        }
    })


})

//update userDetails

user.patch('/update/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY) 
   
    
    const que=`update user set u_name='${req.body.u_name}',u_email='${req.body.u_email}',u_profile='${req.body.u_profile}',u_mobile=${req.body.u_mobile} where u_id='${req.params.id}'`;
   
    con.query(que,(err,result)=>{
            console.log(result)
        if(result){
            res.json({result:result})
        }
        else{
            res.send('User Does not Exists')
        }
    })


})



module.exports=user