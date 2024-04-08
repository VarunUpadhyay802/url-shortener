const express = require("express")
const { connectToMongoDB } = require("./connect")
const path = require("path")
const cookieParser = require("cookie-parser")
const urlRoute = require("./routes/url")
const URL = require("./models/url")
const staticRouter = require("./routes/staticRouter")
const userRoute = require("./routes/user")
const app = express();
const PORT = 8000;
const { checkForAuthentication, restrictTo } = require("./middleware/auth")
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => console.log("connected to mongoDB"))

app.set("view engine", "ejs");
//we have used path which is a built in module to redirect to view folder
//we have successfully rendered home from views
app.set('views', path.resolve("./views"))
//these middleware states that, we will support json data as well as form data
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
//so ye to hamesha chalega hi chalega 
app.use(checkForAuthentication())

//now we have to protect the url route , we want to the user to have access to 
//url requests only if the user is logged in
app.use("/url",urlRoute)
app.use("/user", userRoute)
app.use("/",  staticRouter)

app.get("/test", async (req, res) => {
    try {
        const allUrls = await URL.find({})
        // Render the 'home' template with the fetched URLs
        res.render('home', {
            urls: allUrls
        })
    } catch (error) {
        // Handle errors appropriately
        console.error("Error fetching URLs:", error)
        res.status(500).send("Internal Server Error")
    }
})

app.listen(PORT, () => { console.log(`server started at PORT ${PORT}`) })