const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Product = require("./dataSchema.js");

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose.connect("mongodb://127.0.0.1:27017/reactdata",
    {
        dbName: "reactdata",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

app.get("/:id", async (req, resp) => {
    const id = req.params.id;
    const query = { _id: id };
    const oneProduct = await Product.findOne(query);
    console.log(oneProduct);
    resp.send(oneProduct);
});

app.get("/:id/:newQuantity", async (req, res) => {
    try {
        // await formData.save();
        const filter = { _id: req.params.id };
        const update = { quantity: Number(req.params.newQuantity) };
        console.log("New quantity: update");
        await Product.findOneAndUpdate(filter, update);
        const messageResponse = { message: `Product ${req.params.id} updated correctly`};
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while updating a product:" + err);
    }
});

app.post("/insert", async (req, res) => {
    console.log(req.body);
    const p_id = req.body._id;
    const pname = req.body.name;
    const pprice = req.body.price;
    const pquantity = req.body.quantity;
    const pshortdescription = req.body.shortdescription;
    const plongdescription = req.body.longdescription;
    const pcategory = req.body.category;
    const pimagename = req.body.imagename;
    const palt = req.body.alt;
    const pscreensize = req.body.screensize;
    const formData = new Product({
        _id: p_id,
        name: pname,
        price: pprice,
        shortDescription: pshortdescription,
        longDescription: plongdescription,
        category: pcategory,
        imageName: pimagename,
        quantity: pquantity,
        alt: palt,
        screenSize: pscreensize
    });
    try {
        // await formData.save();
        await Product.create(formData);
        const messageResponse = { message: `Product ${p_id} added correctly` };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while adding a new product:" + err);
    }
});

app.delete("/delete", async (req, res) => {
    console.log("Delete :", req.body);
    try {
        const query = { _id: req.body._id };
        await Product.deleteOne(query);
        const messageResponse = {
            message: `Product ${req.body._id} deleted correctly`,
        };
        res.send(JSON.stringify(messageResponse));
    } catch (err) {
        console.log("Error while deleting :" + p_id + " " + err);
    }
});

const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});