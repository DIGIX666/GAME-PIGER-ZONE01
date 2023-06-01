const path = require("path")
const fs = require("fs")
const express = require("express")
const { log } = require("console")

const app = express()
const port = 8080


app.use("/public/", express.static(path.join(__dirname, "/public")))
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/init-game", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/init-game.html"))
})

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/game.html"))
})

app.post("/data", (req, res) => {
    const body = req.body
    let json = JSON.stringify(body)
    fs.writeFile("public/data/teams.json", json, (err) => {
        if (err) throw err;
        console.log('updated teams');
        res.sendStatus(200)
    })
})

app.get("/data", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/data/teams.json"))
})

app.listen(port, ()=> {
    console.log(`Game listenning on : http://localhost:${port}`);
})