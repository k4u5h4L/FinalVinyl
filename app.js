// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

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
    res.render("index", { cartValue: 2 });
});

app.get("/categories", (req, res) => {
    res.render("categories", { cartValue: 2 });
});

app.get("/product", (req, res) => {
    res.render("product", { cartValue: 2 });
});

app.post("/product", (req, res) => {
    res.redirect("/cart");
});

app.get("/cart", (req, res) => {
    res.render("cart", { cartValue: 2 });
});

app.get("/checkout", (req, res) => {
    res.render("checkout", { cartValue: 2 });
});

app.get("/contact", (req, res) => {
    res.render("contact", { cartValue: 2 });
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080");
});
