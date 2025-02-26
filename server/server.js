require("dotenv").config()
const express=require("express")
const cors=require("cors")
require('./config/connection')
const router=require('./routes/router')

const server = express()
server.use(cors())
server.use(express.json())
server.use(router)


const PORT=3005 || process.env.PORT

server.get('/',(req,res)=>{
    res.status(200).json("resolved")
})

server.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);
})