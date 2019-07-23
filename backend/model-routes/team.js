
const express=require('express');
const team=express.Router()
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const con=require('../connection/db')
team.use(cors());

process.env.SECRET_KEY='secret'


team.post("/add",(req,res)=>{

   
    if(jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)){

        const name=req.body.team_name
         const logo=req.body.team_logo
         const desc=req.body.team_desc
         const teamData={
                team_name:name,
                team_logo:logo,
                team_desc:desc
        }
        
        var sql = `insert into team(team_name,team_logo,team_desc) values('${name}','${logo}','${desc}')`;

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
      

//get Team

team.get('/allteam',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    
    
    

    const que=`select * from team `;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            res.json(result)
        }
        else{
            res.send('team Does not Exists')
        }
    })


})

// Delete team
    team.delete("/delete/:id",(req,res) => {
    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    const id = req.params.id

    const que = `DELETE  FROM team WHERE team_id=${id}`;
    con.query(que,(err,result) => {
       
       
        if(err){
            res.send(err);
        }else{
            res.json(result)
            
        }
    })
})

//get one team
team.get('/team/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)   
    
    const que=`select * from team where team_id='${req.params.id}'`;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            
            res.json(result)
        }
        else{
            res.send('team Does not Exists')
        }
    })


})

//update teamDetails

team.patch('/update/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY) 
   
    
    const que=`update team set team_name='${req.body.team_name}',team_logo='${req.body.team_logo}',team_desc='${req.body.team_desc}' where team_id='${req.params.id}'`;
   
    con.query(que,(err,result)=>{
           
        if(result){
            res.json(result)
        }
        else{
            res.send(err)
        }
    })


})



module.exports=team