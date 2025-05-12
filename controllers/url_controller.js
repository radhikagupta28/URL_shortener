const shortid = require('shortid');
const URL = require('../models/url_model');

async function handleGenerateNewShortURL(req,res) {
    const body=req.body;
    if(!body.url) return res.status(400).json({error: "url is required"});
    const shortId = shortid();

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    const allUrls = await URL.find();

    return res.render('home' , {
        id: shortId,
        urls: allUrls,
    });
};


async function handleRedirectToOriginalURL(req,res){
    const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
         $push:{
            visitHistory: {
                timeStamp: Date.now(),
            }
         }
    }
    );
    res.redirect(entry.redirectUrl);
};


async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
};


module.exports = {
    handleGenerateNewShortURL,handleGetAnalytics,handleRedirectToOriginalURL
}