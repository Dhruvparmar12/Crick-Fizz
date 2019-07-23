
const express=require('express');
const player=express.Router()
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const con=require('../connection/db')
player.use(cors());

process.env.SECRET_KEY='secret'


player.post("/add",(req,res)=>{

   
    if(jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)){
              
        var sql = `insert into player (team_id,p_name,p_runs,p_type) values(${req.body.team_id},'${req.body.p_name}',${req.body.p_runs},'${req.body.p_type}')`

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
      

//get player

player.get('/allplayer',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    
    
    

    const que=`SELECT team.team_name,player.p_id,player.team_id,player.p_name,player.p_runs,player.p_type FROM player INNER JOIN team ON player.team_id = team.team_id `;
    con.query(que,(err,result)=>{
    
        if(!result.length==0){
            res.json({players:result})
        }
        else{
            res.send('player Does not Exists')
        }
    })


})

// Delete player
    player.delete("/delete/:id",(req,res) => {
    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    const id = req.params.id

    const que = `DELETE  FROM player WHERE p_id=${id}`;
    con.query(que,(err,result) => {
       
       
        if(err){
            res.send(err);
        }else{
            res.json(result)
            
        }
    })
})

//get one player
player.get('/player/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)   
    
    const que=`select * from player where p_id='${req.params.id}'`;
    con.query(que,(err,result)=>{
       
        if(!result.length==0){
            
            res.json(result)
        }
        else{
            res.send('player Does not Exists')
        }
    })


})

//update playerDetails

player.patch('/update/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY) 
   
    
    const que=`update player set team_id=${req.body.team_id},p_name='${req.body.p_name}',p_runs=${req.body.p_runs},p_type='${req.body.p_type}' where p_id='${req.params.id}'`;
   
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

module.exports=player