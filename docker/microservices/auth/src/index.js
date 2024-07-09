const express = require("express");
const axios = require("axios");
const { port, host, db, apiUrl } = require("./configuration");
const { connectDB } = require("./helpers/db");

const app = express();

app.get("/test", (req, res) => {
    res.send("Auth server is running!");
});

app.get("/api/currentUser", (req, res) => {
    res.json({
	id: "1234",
	email: "someone@gmail.com"
    });
}); //This is what will be fetched in the API service index.js. At this place we generally would write tockens and DB access call.

app.get("/testapidata", (req, res) => {
    axios.get(apiUrl + '/apidata').then( response => {
        res.json({
            apidata: response.data.apidatafield,
        });
    });
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
