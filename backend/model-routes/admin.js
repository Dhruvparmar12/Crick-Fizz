
const express=require('express');
const admin=express.Router()
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const con=require('../connection/db')
admin.use(cors());
const nodemailer=require('nodemailer')

process.env.SECRET_KEY='secret'


admin.post("/add",(req,res)=>{

   
    const hash= bcrypt.hashSync(req.body.a_password,10)
    const name=req.body.a_name
    const email=req.body.a_email
    const password=hash
   
      
    const adminData={
        a_name:name,
        a_email:email,
        a_password:password,
    }

   
        
        
        var sql = `insert into admin(a_name,a_email,a_password) values('${name}','${email}','${password}')`;

        con.query(sql,(err, result)=> {
          if (err) {
            res.send(err);
        }
        else{
            let token = jwt.sign(adminData,process.env.SECRET_KEY,{
                expiresIn:1440
            })
            res.json({token:token,result:result})
        
            console.log("1 record inserted");
        }
        
        });
      });
      
//admin login 
admin.post('/login',(req,res)=>{
    const email=req.body.a_email;
    const password=req.body.a_password;
    admindata={
        email:email,
        password:password
    }    
    
        
        
        var que=`select * from admin where a_email='${email}'`;
           
        con.query(que,(err, result)=> {
            console.log(result)
          if (result.length==0) {
            res.send('email does not exists..!');
            
          }
         else{
                
                if(bcrypt.compareSync(password,result[0].a_password)){
                let token=jwt.sign(admindata,process.env.SECRET_KEY,{
                    expiresIn:1440
                }) 
                res.json({token:token,result})
            } else{
                res.send('admin does not exist')
            }
            
        }
        
        });
      
     
})

//get Profile

admin.get('/profile',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    
    
    

    const que=`select * from admin where a_email='${decoded.email}'`;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            res.json(result)
        }
        else{
            res.send('admin Does not Exists')
        }
    })


})

// Delete Profile
    admin.delete("/delete/:id",(req,res) => {
    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    const id = req.params.id

    const que = `DELETE  FROM admin WHERE a_id=${id}`;
    con.query(que,(err,result) => {
       
       
        if(err){
            res.send(err);
        }else{
            res.json(result)
            
        }
    })
})

//get one admin
admin.get('/edit/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)   
    
    const que=`select * from admin where a_id='${req.params.id}'`;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            res.json({result:result})
        }
        else{
            res.send('admin Does not Exists')
        }
    })


})

//update adminDetails

admin.patch('/update/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY) 
   
    
    const que=`update admin set a_name='${req.body.a_name}',a_email='${req.body.a_email}' where a_id='${req.params.id}'`;
   
    con.query(que,(err,result)=>{
            console.log(result)
        if(result){
            res.json({result:result})
        }
        else{
            res.send('admin Does not Exists')
        }
    })


})

// Forget Password

admin.post('/forgetpassword',(req,res)=>{

    const body=`<h3>Go to this Link and Reset your Password</h3>
                <br>
                <a>http://localhost:4200/passwordreset</a>`

        const a_email=req.body.a_email;
        const que=`select * from admin where a_email='${a_email}'`;
        con.query(que,(err,result)=>{
        if(!result.length==0){
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                       user: 'dhruv.parmar.sa@gmail.com',
                       pass: 'rd7600959694'
                   }
               });
          
            
            const mailOptions = {
                from: 'dhruv.parmar.sa@gmail.com', 
                to: a_email, 
                subject: 'Password Recover', 
             
                html: body
              };
          
            
            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  res.send(err)
                else
                  res.send(info);
             });
        
        }
        else{
            res.send('admin Does not Exists')
        }
    })
        
       

        
    
    })
    admin.patch('/resetpassword',(req,res)=>{
      
        
    
        a_password=bcrypt.hashSync(req.body.a_password,10);
        
        const que=`update admin set a_password='${a_password}' where a_email='${req.body.a_email}'`;
   
        
        con.query(que,(err,result)=>{
          
        if(result){
            res.send({msg:'Password Updated'})
        }
        else{
            res.send(err)
        }
    })


        
    
})

module.exports=admin