const express = require("express");
const dotenv = require("dotenv");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");

dotenv.config();

// Connection URL
const url = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Database Name
const dbName = "PassApp";
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

client.connect().then(() => {
  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const collection = db.collection("passwords");

  // Get all the passwords
  app.get("/", async (req, res) => {
    try {
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Save a password
  app.post("/", async (req, res) => {
    try {
      const newPassword = req.body;
      const insertResult = await collection.insertOne(newPassword);
      res.json(insertResult);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete a password
  app.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
      res.json(deleteResult);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});
