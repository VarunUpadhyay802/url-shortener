const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    //we will first fetch the userUid with the help of cookie and we named the cookie uid 
    const userUid = req.headers["authorization"];

    if (!userUid) return res.redirect("/login");
    
    const token = userUid.split("Bearer ")[1];
    
    if (!token) return res.redirect("/login");
    
    const user = await getUser(token);
  
    if (!user) return res.redirect("/login");
  
    req.user = user;
    next();
}

///below function is just checking, it's not enforcing 
//user hai,  to theek  hai nahi to koi baat nahi
async function checkAuth(req, res, next) {
    console.log(req.headers);
    const userUid = req.headers["authorization"];
    
    if (!userUid) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const token = userUid.split("Bearer ")[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    req.user = token;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};
