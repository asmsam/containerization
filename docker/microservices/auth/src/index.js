const express = require("express");
const { port, host, db } = require("./configuration");
const { connectDB } = require("./helpers/db");

const app = express();

app.get("/test", (req, res) => {
    res.send("Auth server is running!");
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started the authentication service on port ${port}`);
	console.log(`The Host is ${host}`);
	console.log(`The Database URL is ${db}`);
    });
};

connectDB()
    .on("error", console.log)
    .on("disconnected", connectDB)
    .once("open", startServer);
