// jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// const sent = {
//     string1: "Bose",
//     string2: "This is for testing",
// };

// setting routes

app.get("/", (req, res) => {
    res.render("index", { cartValue: 1 });
});

app.get("/categories", (req, res) => {
    res.render("categories", { cartValue: 1 });
});

app.get("/product", (req, res) => {
    res.render("product", { cartValue: 1 });
});

app.post("/product", (req, res) => {
    res.redirect("/cart");
});

app.get("/cart", (req, res) => {
    res.render("cart", { cartValue: 1 });
});

app.get("/checkout", (req, res) => {
    res.render("checkout", { cartValue: 1 });
});

app.get("/contact", (req, res) => {
    res.render("contact", { cartValue: 1 });
});

app.post("/contact", (req, res) => {
    const formData = {
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        message: req.body.message,
    };
    console.log(formData);

    res.render("thankyou", { cartValue: 1 });
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
});
