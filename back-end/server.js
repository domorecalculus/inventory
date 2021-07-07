const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

mongoose.connect("mongodb://localhost:27017/cp4", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const inventorySchema = new mongoose.Schema({
  name: String,
  properties: Array,
});

const Inventory = mongoose.model("Inventory", inventorySchema);

const itemSchema = new mongoose.Schema({
  name: String,
  properties: Object,
  qty: Number,
  inventory: {
    type: mongoose.Schema.ObjectId,
    ref: "Inventory",
  },
});

const Item = mongoose.model("Item", itemSchema);

app.post("/api/inventory", async (req, res) => {
  const inventory = new Inventory({
    name: req.body.name,
    properties: req.body.properties,
  });

  try {
    await inventory.save();
    res.send(inventory);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/inventory", async (req, res) => {
  try {
    let inventories = await Inventory.find();
    res.send(inventories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api/item", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    properties: req.body.properties,
    qty: req.body.qty,
    inventory: req.body.inventory,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/item/:id", async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id,
    });
    item["name"] = req.body.name;
    item["properties"] = req.body.properties;
    item["qty"] = req.body.qty;
    item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete("/api/item/:id", async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/item", async (req, res) => {
  try {
    let items = await Item.find({ inventory: req.query.inventory });
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3002, () => console.log("Server listening on port 3002..."));
