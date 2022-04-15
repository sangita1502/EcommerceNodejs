var express = require("express");
var bodyparser = require("body-parser");
const Order = require("../model/Order");
var router  = express.Router();

router.post("/place", async(req,res)=>{
    let body =req.body;
    let order= new Order();
    order.orderdate= new Date();
    order.productid = body.data.productid;
    order.sizes = body.data.sizes;
    order.colors = body.data.colors;
    order.name = body.data.name;
    order.email = body.data.email;
    order.mobileno = body.data.mobileno;
    order.address = body.data.address;

    order.pincode= body.data.pincode;
    order.quantity = body.data.quantity;
    order.price = body.data.price;
    order.shipping = body.data.shipping;
    order.total = body.data.total;
    order.imagepath = body.data.imagepath;

    order.status = "pending";

    order.save().then((result)=>{
        res.end(JSON.stringify(result))
    },err=>{
        res.end(JSON.stringify(err))
    
    })
});
router.post("/list", async (req, res) => {
    let orders = await Order.find();
    res.json({ data: orders });

});

router.post("/get", async (req, res) => {
    let body = req.body;
    let order = await Order.findById(body.data.id);
    res.json({ data: order });

});

router.post("/changestatus", async (req, res) => {
    let body = req.body;
    let order = await Order.findById(body.data.id);

    order.status = body.data.status;
    order.save().then(result => {
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
        console.log(err);
    });
});

router.post("/paymentsuccess", async (req, res) => {
    let body = req.body;
    let order = await Order.findById(body.data.id);

    order.status = "paid";
    
    order.save().then(result => {
        // send Email to admin and user
        let body = getadminmail(order);
        sendmail("sangitakamble3632@gmail.com", "Order received", body);

        body = getusermail(order);
        sendmail(order.email, "Hello " + order.name + ", your order received", body);
        
        res.end(JSON.stringify(result));
    }, err => {
        res.end(JSON.stringify(err));
        console.log(err);
    });
});

function getadminmail(order){
    return body = "Hello admin, order received ";
}

function getusermail(order){
    return body = "Hello user, order received ";
}

function sendmail(to, subject, body){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sangitakamble3632@gmail.com',
          pass: 'Praju@2626'
        }
      });    
      var mailOptions = {
        from: 'sangitakamble3632@gmail.com',
        to: to,
        subject: subject,
        text: body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
module.exports = router; 