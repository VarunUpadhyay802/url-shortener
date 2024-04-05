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
    //so if password is coorect we will make a session id 
    //then we will map that user to the session id 
    //and then we will make a cookie
    const sessionId = uuidv4();
    setUser(sessionId, user)
    res.cookie("uid", sessionId)
    return res.redirect('/')
}

module.exports = {
    handleUserSignup, handleUserLogin
}