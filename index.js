const mongoose = require("mongoose");
const express = require("express");
const zod = require("zod");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb://127.0.0.1:27017/Entries?directConnection=true");

var User = mongoose.model("Users",{name:String, email:String, password:String});

var Schema = zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password: zod.string().min(8)
})

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/hh.html");
})

app.post("/",async function(req, res){
 var us = {name :req.body.name,
            email: req.body.email,
            password:req.body.pwd
}

response = Schema.safeParse(us)
if(response.success){
    re = await User.findOne({email:req.body.email})
    if(re!=null)
        {   res.send("already exists")
            return}
    
}

if(response.success)
{ user = new User(us);
  await user.save();
res.send("done")
}
});


app.listen(3000)