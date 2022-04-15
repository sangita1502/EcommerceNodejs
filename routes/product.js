var express = require("express");
var bodyparser = require("body-parser");
const Product = require("../model/Product");
var router = express.Router();
var fs = require("fs");

router.post("/save", async (req, res) => {
    let body = req.body;
    let product = new Product();
    if (body.data.id != "") {
        product = await Product.findById(body.data.id)
    }
    product.name = body.data.name;
    product.description = body.data.description;
    product.sizes = body.data.sizes;
    product.colors = body.data.colors;
    product.mrp = body.data.mrp;
    product.price = body.data.price;
    product.instock = body.data.instock;
    product.status = body.data.status;
    product.sku = body.data.sku;

    if (body.data.imagecode != "") {
        // product.imagepath = "";
        let base64image = body.data.imagecode.replace(/^data:image\/png;base64,/, "");
        base64image = base64image.replace(/^data:image\/jpg;base64,/, "");
        product.imagepath = "productpics/" + (Math.random() + 1).toString(36).substring(7) + ".png";
        fs.writeFile("assets/" + product.imagepath, base64image, 'base64', function (err) {
            console.log("Error image saving-" + err);
        });
    }

    product.save().then((result) => {
        res.end(JSON.stringify(result))
    }, err => {
        res.end(JSON.stringify(err))

    })
});

router.post("/list", async (req, res) => {
    let products = await Product.find();
    res.json({ data: products });

});

router.post("/get", async (req, res) => {
    let body = req.body;
    let product = await Product.findById(body.data.id);
    res.json({ data: product });

});

router.post("/changestatus", async (req, res) => {
    let body = req.body;
    let product = await Product.findById(body.data.id);
    product.status = body.data.status;

    product.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
        console.log(err);
    });
});

router.post("/updatestock", async (req, res) => {
    let body = req.body;
    let product = await Product.findById(body.data.id);

    product.instock = body.data.instock;
    product.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
        console.log(err);
    });
});

router.post("/delete", async (req, res) => {
    let body = req.body;
    await Product.findByIdAndDelete(body.data.id);
    let data = {
        "data":
        {
            "status": "success"
        }
    }
    res.end(JSON.stringify(data));
});

module.exports = router; 