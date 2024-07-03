const express = require("express");
const mongoose = require("mongoose");
const { port, host, db } = require("./configuration");
const { connectDB } = require("./helpers/db");

const app = express();

const kittySchema = new mongoose.Schema({
    name: String
});
const Kitten = mongoose.model("Kitten", kittySchema);

app.get("/test", (req, res) => {
    res.send("API server is running!");
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started the API service on port ${port}`);
	console.log(`The Host is ${host}`);
	console.log(`The Database URL is ${db}`);
    });

    const fluffy = new Kitten({ name: "fluffy" });
    fluffy.save(function(err, result) {
	if (err) return console.error(err);
	console.log(`result : ${result}`)
    });
};

connectDB()
    .on("error", console.log)
    .on("disconnected", connectDB)
    .once("open", startServer);
