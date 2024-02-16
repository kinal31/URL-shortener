const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

const URL = require("./model/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const {connectTOMongoDB} = require("./connection");
const { log } = require("console");

connectTOMongoDB("mongodb://127.0.0.1:27017/short-url").then( ()=> console.log(" Mongodb connected"));

//for EJS server side rendering
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false})); //form data parse karva mate aa middleware no use

app.use ("/",staticRoute);
app.use("/url", urlRoute);
app.use("/user",userRoute); 

//for use 1 
// app.get('/test', async (req,res)=>{
//     const allUrl = await URL.find({});
//     return res.render('home',{urls: allUrl});
// })

//this is for redirect to the actual page
app.get('/:shortId', async(req,res)=>{ 
    const shortId =req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push :{             // this line means push data into visitHistory
            visitHistory: {
                timestamp : Date.now(),
            }
        }
    })
    // console.log(entry);
   res.redirect(entry?.redirectedURL);
})

app.listen(PORT,()=> console.log(`Server is running at ${PORT}`))
