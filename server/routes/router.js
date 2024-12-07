const express=require('express')
const userController=require('../controllers/userController')
const jwtMiddleware = require('../middlewares/JWTmiddleware')
const router=new express.Router()

//register - post
router.post('/register',userController.registerController)
//login - post
router.post('/login',userController.loginController)
//get all users - get
router.get('/users',jwtMiddleware,userController.getAllUser)

module.exports=router