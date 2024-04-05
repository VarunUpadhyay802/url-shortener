const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    //we will first fetch the userUid with the help of cookie and we named the cookie uid 
    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect("/login");
    const user = getUser(userUid);
  
    if (!user) return res.redirect("/login");
  
    req.user = user;
    next();
}
///below function is just checking, it's not enforcing 
//user hai,  to theek  hai nahi to koi baat nahi
async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
  
    const user = getUser(userUid);
  
    req.user = user;
    next();
  }
  
  module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
  };