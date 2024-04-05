//we have to store sessionId with user object 
//& to do that we are making this auth.js

//basically sessionIdToUserMap is  a hash map
//so this auth.js is a map file which take record of everything (example of parking lot in the lecture  )
const sessionIdToUserMap = new Map();


function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}
module.exports = {
    setUser, getUser
}
