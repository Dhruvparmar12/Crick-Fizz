const express=require('express');
const app=express();

const bodyparser=require("body-parser");
const cors=require('cors');
const port= process.env.port || 1313


app.use(express.static('images'))
app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));



  
const User=require('./model-routes/user')
const Admin=require('./model-routes/admin')
const Team=require('./model-routes/team')
const player=require('./model-routes/player')
const match=require('./model-routes/matches')

app.use('/user',User)
app.use('/admin',Admin)
app.use('/team',Team)
app.use('/player',player)
app.use('/match',match)





app.get('/',function(req,res){
    res.send("Node Connected..! ");  
})




app.listen(port,function(){
    console.log("Serve is Running on Port:: "+port);
    
})