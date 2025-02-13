const express = require("express");
const { MongoClient } = require("mongodb");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const client = new MongoClient("mongodb://mongodb:27017");
client.connect();

app.post("/save", async (req, res) => {
    const hash = crypto.createHash("sha256").update(req.body.text).digest("hex");
    await client.db("test").collection("hashes").insertOne({ hash });
    res.json(hash);
});

app.listen(8080, () => console.log("Node API running on port 8080"));
