
const express=require('express');
const matches=express.Router()
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const con=require('../connection/db')
matches.use(cors());

process.env.SECRET_KEY='secret'


matches.post("/add",(req,res)=>{

   
    if(jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)){
              
        var sql = `insert into matches (team_1,team_2,date,time,vanue) values(${req.body.team_1},${req.body.team_2},'${req.body.date}','${req.body.time}','${req.body.vanue}')`

        con.query(sql,(err, result)=> {
          if (err) {
            res.send(err);
        }
        else{
           
            res.json({result:result})
            console.log("1 record inserted");
        }
        
        });
    }
    
      });
      

//get matches

matches.get('/allmatches',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    
    
    

    const que=`select * from matches `;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            res.json(result)
        }
        else{
            res.send('matches Does not Exists')
        }
    })


})

// Delete matches
    matches.delete("/delete/:id",(req,res) => {
    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    const id = req.params.id

    const que = `DELETE  FROM matches WHERE m_id=${id}`;
    con.query(que,(err,result) => {
       
       
        if(err){
            res.send(err);
        }else{
            res.json(result)
            
        }
    })
})

//get one matches
matches.get('/matches/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)   
    
    const que=`select * from matches where m_id='${req.params.id}'`;
    con.query(que,(err,result)=>{
       
        if(!result.length==0){
            
            res.json(result)
        }
        else{
            res.send('matches Does not Exists')
        }
    })


})

//update matchesDetails

matches.patch('/update/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY) 
   
    
    const que=`update matches set team_1=${req.body.team_1},team_2=${req.body.team_2},date='${req.body.date}',time='${req.body.time}',vanue='${req.body.vanue}' where m_id='${req.params.id}'`;
   
    con.query(que,(err,result)=>{
           
        if(result){
            res.json(result)
        }
        else{
            res.send(err)
        }
    })


})


//select a.team_name as team_1, b.team_name as team_2,date,time,vanue from matches JOIN team a ON a.team_id=matches.team_1 join team b on b.team_id=matches.team_2

module.exports=matches