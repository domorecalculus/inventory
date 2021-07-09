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

mongoose.connect("mongodb://localhost:27017/cp5", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["secretValue"],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const users = require("./users.js");
app.use("/api/users", users.routes);

const validUser = users.valid;

const inventorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: String,
  properties: Array,
});

const Inventory = mongoose.model("Inventory", inventorySchema);

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  name: String,
  properties: Object,
  qty: Number,
  inventory: {
    type: mongoose.Schema.ObjectId,
    ref: "Inventory",
  },
});

const Item = mongoose.model("Item", itemSchema);

app.post("/api/inventory", validUser, async (req, res) => {
  const inventory = new Inventory({
    name: req.body.name,
    properties: req.body.properties,
    user: req.user,
  });

  try {
    await inventory.save();
    res.send(inventory);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/inventory", validUser, async (req, res) => {
  try {
    let inventories = await Inventory.find({ user: req.user });
    res.send(inventories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/api/item", validUser, async (req, res) => {
  const item = new Item({
    name: req.body.name,
    properties: req.body.properties,
    qty: req.body.qty,
    inventory: req.body.inventory,
    user: req.user,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put("/api/item/:id", validUser, async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id,
      user: req.user,
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

app.delete("/api/item/:id", validUser, async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id, user: req.user });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get("/api/item", validUser, async (req, res) => {
  if (req.query.inventory === "undefined") {
    res.sendStatus(400);
    return;
  }

  try {
    let items = await Item.find({
      inventory: req.query.inventory,
      user: req.user,
    });
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3003, () => console.log("Server listening on port 3003..."));
