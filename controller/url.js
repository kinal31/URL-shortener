const shortid = require("shortid");
const URL = require("../model/url")

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(! body.url) return res.status(404).json({error : "Url is required"})
    const shortID = shortid();
    await URL.create({
        shortId : shortID,
        redirectedURL : body.url,
        visitHistory : [],
    })
    // return res.json({ id: shortID });
    return res.render("home",{ id: shortID });
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({
        totalclick : result.visitHistory.length, 
        analytics : result.visitHistory});
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}