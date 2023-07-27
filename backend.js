const express = require("express");
const app = express()
const port = process.env.port || 4000
const path = require("path")
const backendRoutes = require("./backendRoutes")
const cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Routes
app.use(backendRoutes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "build")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "build", "index.html"));
    });
} else {
    app.use(express.static(path.join(__dirname, "build")));
}

app.listen(port, async () => {
    console.log(`listening on port ${port}`)
})