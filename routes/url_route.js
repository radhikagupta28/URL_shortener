const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics, handleRedirectToOriginalURL} = require('../controllers/url_controller');
const { model } = require('mongoose');
const router=express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId" , handleRedirectToOriginalURL)
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports=router;