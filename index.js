const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!!");
});

app.listen(port, () => {
  console.log(`server is running ${port}`);
});

// ypAAfeoUGrV27JkD
// pet-hive

const uri =
  "mongodb+srv://pet-hive:ypAAfeoUGrV27JkD@cluster0.cyslekw.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("pethive");
    const petssupplies = database.collection("petssupplies");

    app.post("/petssupplies", async (req, res) => {
      const data = req.body;
      const result = await petssupplies.insertOne(data);
    });

    app.get("/petssupplies", async (req, res) => {
      const result = await petssupplies.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
