const express = require("express");

const router = express.Router();

router.get('/' , async (req,res)=>{
    const allurls = await URL.find();
    res.render("home" , {
        urls : allurls,
        // id:null
    });
});

module.exports = router;