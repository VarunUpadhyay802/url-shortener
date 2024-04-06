//now we don't need state so we removed the sessioIDtoUserMap
const jwt = require('jsonwebtoken')
const secret = "VarunUapdhyaySecretKey"

function setUser(user) {
    const payload = ({
        id: user.id,
        Username:"blah",
        email: user.email,
    })

    return jwt.sign(payload, secret)
}

function getUser(token) {
    if (!token) return null
    try {
        return jwt.verify(token, secret)        
    } catch (error) {
        return null
    }
}
module.exports = {
    setUser, getUser
}
