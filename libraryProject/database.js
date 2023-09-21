const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const Sequelize=require("sequelize")
const port=7000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const sequelize=new Sequelize("library","root","Lakshmi@2002",{
    dialect:"mysql",

})
const Book=sequelize.define("Book",{
    name:Sequelize.STRING,
    date:Sequelize.INTEGER,
    time:Sequelize.INTEGER,
})
Book.sync({force:"true"})
   

sequelize.authenticate().then(()=>{
    console.log("success")
}).catch((err)=>console.log(err,"this is error"))
app.get("/",(req,res)=>{
    res.send("this works")
})
app.post("/",async(req,res)=>{
    const name=req.body.name;
    const date=req.body.date;
    const time=req.body.time;
    const savedata=data.build({
        name,date,time
    })
    await savedata.save()
    res.send("data posted")


})
app.listen(port,()=>{
    console.log(`server starts at${port}`)
})