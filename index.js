const express = require("express")

const app = express();
const PORT = 800;

app.listen(PORT, ()=>{console.log(`server started at PORT ${PORT}`)})