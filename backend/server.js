const express=require("express")
const {connectedDB}=require("./config/db")
const cors=require("cors")
const{userRouter}=require("./router/userRouter")
const{productRouter}=require("./router/productRouter")

const app=express()
require("dotenv").config()

app.use(cors())
 
app.use(express.json())


app.get("/",async(req,res)=>{
    try{
        res.send("Home-Page")
    }
    catch(error){
        console.log(`Error:${error}`)
    }
})

app.use("/user",userRouter)
app.use("/product",productRouter)


/* listen the server code present here */
const port=process.env.port||8080
app.listen(port,async()=>{
    try{
        //connected db
        await connectedDB
        console.log("Database connected Successfully")
    }
    catch(err){
        console.log(err.message)
        }
    console.log(`server is running on port ${port}`)
})
