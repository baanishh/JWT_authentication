const mongoose= require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(res=>{
    console.log("connection DB successful");
}).catch(err=>{
    console.log("connection DB ERROR");
    console.log(err);
})