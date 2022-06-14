const express = require('express');
const router = express.Router();
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const fetchuser = require("../middleware/fetchUser");
const JWT_SECRET = "SECRET"


//create a user
router.post('/createuser', async (req, res) => {
    let success = false;
    if (!req.body.username || !req.body.password || !req.body.name) {
        return res.status(400).json({ success: success, message: "Request is invalid" })
    }
    try {
        
        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(409).json({ success: success, message: "Username already exists" })
        }
        else {
            //hashing password
            const salt = await bcryptjs.genSalt();
            const hashedPass = await bcryptjs.hash(req.body.password, salt);
            
            //creating user
            const user = await User.create({
                name: req.body.name,
                password: hashedPass,
                username: req.body.username,
                imgURL: req.body.imgURL,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            if (authToken) success = true;
            res.json({ success, authToken });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: success, message: "Internal Server Error" });
    }
})

module.exports = router;

// login user

router.post('/login', async (req, res) => {
    let success=false;
    
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ success: success, message: "Request is invalid" })
    }

    try {
        
        //extracting email pass from request
        const { username, password } = req.body;
        
        //finding user using username
        const user = await User.findOne({ username:username })
        if (!user) { return res.status(400).json({success:success,message:'Please enter correct credentials or click forgot password'}) }


        //comparing password
        const passwordCompare = await bcryptjs.compare(password, user.password)
        if (!passwordCompare) { return res.status(400).json({success:success,message:'Please enter correct credentials or click forgot password'}) }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        if(authToken){success=true;
        res.json({success,authToken});}
    } catch (error) { console.error(error.message); res.status(500).json({success:success,message:"Internal Server Error"}) }
});


// get user

router.get('/getusers',fetchuser ,async (req, res) => {
    let success=false;
    let userArray=[];
    try {
        User.find({},(err,users)=>{
            if(err){
                return res.status(500).json({success:success,message:"Internal Server Error"});
            }
            else{
                users.map(user=>{
                    userArray.push(user);
                })
                success=true;
                res.status(200).send({success,userArray});
            }
        })
    } catch (error) {
        return res.status(500).json({success:success,message:"Internal Server Error"});
    }
});