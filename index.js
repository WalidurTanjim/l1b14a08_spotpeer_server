import 'dotenv/config';
import express from "express";
import cors from "cors";
import { MongoClient } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 5000;
const client = new MongoClient(process.env.MDB_URI);

// middlewares
app.use(express.json());
app.use(cors({
     origin: "http://localhost:3000"
}));

// db connection
export async function connectToMongoDB() {
     try {
          await client.connect();
          console.log("You successfully connected to MongoDB!");
          return client;
     } catch (err) {
          console.dir(err);
     }
};

const dbClient = await connectToMongoDB();
const db = dbClient.db("SpotPeer");
const categoriesCollection = db.collection("categories");

// categories
app.get("/categories", async(req, res) => {
     const result = await categoriesCollection.find({}).toArray();
     res.status(200).json(result);
})

app.listen(PORT, () => {
     console.log(`Server is running on the port: ${PORT}`)
})
