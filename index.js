const express= require('express');
const path= require('path');
const urlRoute= require('./routes/url_route');
const URL = require("./models/url_model")
const {connectToMongoDB} = require("./dbs");
const staticRoute= require('./routes/staticRouter.js');
const app=express();
require('dotenv').config();

connectToMongoDB(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set("view engine","ejs");
app.set("views" , path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find();
  return res.render("home", {
    urls: allUrls,
    id: null,
  });
});


app.use("/url", urlRoute);
app.use("/",staticRoute)


app.listen(process.env.PORT, ()=> console.log(`Server started at PORT: ${process.env.PORT}`));