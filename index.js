const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const orders = database.collection("orders");

    app.post("/petssupplies", async (req, res) => {
      const data = req.body;
      const result = await petssupplies.insertOne(data);
      res.send(result);
    });

    app.get("/petssupplies", async (req, res) => {
      const result = await petssupplies.find().toArray();
      res.send(result);
    });

    app.get("/petssupplies/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await petssupplies.findOne(query);
      res.send(result);
    });

    // query product
    // http://localhost:3000/category-filtered-product?category=Food
    app.get("/category-filtered-product", async (req, res) => {
      const { category: dd } = req.query;
      const query = { category: dd };
      const result = await petssupplies.find(query).toArray();
      res.send(result);
    });

    // query for my listing email
    // http://localhost:3000/my-listing?email=naymur.dev25@gmail.com
    app.get("/my-listing", async (req, res) => {
      const { email } = req.query;
      const query = { email: email };
      const result = await petssupplies.find(query).toArray();
      res.send(result);
    });

    // remove for db
    app.delete("/my-listing/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await petssupplies.deleteOne(query);
      res.send(result);
    });

    // update for db
    app.put("/petssupplies/:id", async (req, res) => {
      const data = req.body;
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const update = {
        $set: data,
      };
      const result = await petssupplies.updateOne(query, update);
      res.send(result);
    });

    // orders================================================
    app.post("/orders", async (req, res) => {
      const data = req.body;
      const result = await orders.insertOne(data);
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const result = await orders.find().toArray();
      res.send(result);
    });



    


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
