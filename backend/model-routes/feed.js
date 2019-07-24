
const express=require('express');
const feed=express.Router()
const cors=require('cors');
const jwt=require('jsonwebtoken');
const con=require('../connection/db')
feed.use(cors());
process.env.SECRET_KEY='secret'





feed.post("/add",(req,res)=>{
    if(jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)){

        var sql = `insert into feed(feed_title,feed_desc) values('${req.body.feed_title}','${req.body.feed_desc}')`;

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
      

//get feed

feed.get('/allfeed',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    const que=`select * from feed `;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            res.json(result)
        }
        else{
            res.send('feed Does not Exists')
        }
    })


})

// Delete feed
    feed.delete("/delete/:id",(req,res) => {
    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
      const que = `DELETE  FROM feed WHERE feed_id=${req.params.id}`;
    con.query(que,(err,result) => {
       
       
        if(err){
            res.send(err);
        }else{
            res.json(result)
            
        }
    })
})

//get one feed
feed.get('/feed/:id',(req,res)=>{

    var decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)   
    
    const que=`select * from feed where feed_id='${req.params.id}'`;
    con.query(que,(err,result)=>{
        
        if(!result.length==0){
            
            res.json(result)
        }
        else{
            res.send('feed Does not Exists')
        }
    })


})

//update feedDetails

feed.patch('/update/:id',(req,res)=>{

    if(jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)){
    const que=`update feed set feed_title='${req.body.feed_title}',feed_desc='${req.body.feed_desc}' where feed_id='${req.params.id}'`;
    con.query(que,(err,result)=>{
           
            if(result){
                res.json(result)
            }
            else{
                res.send(err)
            }
            })

    } 
   
    
    

})



module.exports=feed