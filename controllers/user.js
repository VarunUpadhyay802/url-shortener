const User = require("../models/user")

const handleUserSignup = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name, email, password
    });
    return res.render('home')
}
const handleUserLogin = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name, email, password
    });
    return res.render('home')
}
module.exports = {
    handleUserSignup,handleUserLogin
}