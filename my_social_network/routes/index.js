const express = require("express");
const router = express.Router();
const story = require("../models/story");
const {ensureAuth , ensureGuest} = require('../middleware/auth');
//Get request 
router.get('/' , ensureGuest , (req , res)=>{
    res.render("login" , {
        layout:'login'
    })
})
router.get('/dashboard' , ensureAuth , async (req , res)=>{
    try{
        const stories = await story.find({user:req.user.id}).lean();
         console.log(req.user);
         
        res.render("dashboard" , {
            name:req.user.firstName ,
            stories
    });
    }catch(err){
        console.error(err);
        res.render('error/500');

    }
   

})

module.exports = router;

