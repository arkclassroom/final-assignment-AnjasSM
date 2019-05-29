const express = require("express")
const app = express()

const port = 3000;

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}/`)
})

app.use(express.static(__dirname))

app.get("/",(req,res,next) => {
    res.sendfile("home.html")
});

app.get("/manage",(req,res,next) => {
    res.sendfile("manage.html")
});

app.get("/login",(req,res,next) => {
    res.sendfile("login.html")
});