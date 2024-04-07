const User = require("../models/user")
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth")
const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name, email, password
    });
    return res.redirect('/')
}
const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password })

    if (!user) return res.render("login", {
        error: "Invalid Username or password"
    })
  
    const token = setUser(user)
    // res.cookie("uid",token)
    //we ar sending token as a json response & we will verify that token in the middleware auth.js
    return res.json({token})
}

module.exports = {
    handleUserSignup, handleUserLogin
}