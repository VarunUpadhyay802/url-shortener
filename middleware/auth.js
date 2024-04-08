const { getUser } = require("../service/auth");

// Middleware function to check for user authentication
function checkForAuthentication(req, res, next) {
   
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie )
        return next();

    const token = tokenCookie;
    // Retrieve user information based on the token
    const user = getUser(token);
    req.user = user;
    return next();
}
//we will pass roles in an array, because maybe there are something which will be accessed by both user and admin 
//the above function just do a soft check on user, but below function restricts it actually
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user)
            return res.redirect("/login")

        if (!roles.includes(req.user.role))
            return res.end("UnAuthorized")

        return next();
    }

}

// async function restrictToLoggedinUserOnly(req, res, next) {
//     //we will first fetch the userUid with the help of cookie and we named the cookie uid 
//     const userUid = req.headers["authorization"];

//     if (!userUid) return res.redirect("/login");

//     const token = userUid.split("Bearer ")[1];

//     if (!token) return res.redirect("/login");

//     const user = await getUser(token);

//     if (!user) return res.redirect("/login");

//     req.user = user;
//     next();
// }

// ///below function is just checking, it's not enforcing 
// //user hai,  to theek  hai nahi to koi baat nahi
// async function checkAuth(req, res, next) {
//     console.log(req.headers);
//     const userUid = req.headers["authorization"];

//     if (!userUid) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const token = userUid.split("Bearer ")[1];

//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     req.user = token;
//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo
};
