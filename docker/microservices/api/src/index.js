const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios")
const { port, host, db, authApiUrl } = require("./configuration");
const { connectDB } = require("./helpers/db");

const app = express();

const kittySchema = new mongoose.Schema({
    name: String
});
const Kitten = mongoose.model("Kitten", kittySchema);

app.get("/test", (req, res) => {
    res.send("API server is running!");
});

app.get("/testcurrentuser", (req, res) => {
    axios.get(authApiUrl + '/currentUser').then( response => { //currentUser is fetched from the authentication service - but how?
	res.json({
	    testcurrentuser: true,
            currentUserFromAuth: response.data
	});
    });
});

app.get("/api/apidata", (req, res) => {
    res.json({
        apidatafield: true
    });
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started the API service on port ${port}`);
	console.log(`The Host is ${host}`);
	console.log(`The Database URL is ${db}`);
	console.log(`The auth URL is ${authApiUrl}`)
    });

    const fluffy = new Kitten({ name: "fluffy" });
    try {
        fluffy.save().then(result => {
	    console.log(`fluffy result : ${result}`)
	});
    } catch (err) {
        console.error(err);
    }
};

connectDB()
    .on("error", console.log)
    .on("disconnected", connectDB)
    .once("open", startServer);
