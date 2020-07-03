import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import Cookies from "js-cookie";

// import product from "./product";
// import featured from "./featured";

const app: Application = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server);

// interface returnPdts {
//   name: string;
//   imgSrc: string;
//   cost: number;
// }

const DBName = `finalvinylDB`;

mongoose.connect(`mongodb://localhost:27017/${DBName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

const productSchema = new mongoose.Schema({
  name: String,
  imgSrc: [String],
  oldCost: Number,
  newCost: Number,
  avail: Boolean,
  about: [String],
  Desc: [{ title: String, body: String }],
  type: String,
  featured: Boolean,
});

const Product = mongoose.model("Product", productSchema);

// setting routes

app.get("/", (req: Request, res: Response) => {
  Product.find({ featured: true }, (err, pdt) => {
    if (err) {
      res.send("Error getting products");
      console.log(err);
    } else {
      // console.log(pdt);

      // let toSend;
      // for (const i in pdt) {
      //   toSend = featured(pdt[i]);
      // }

      res.render("index", { data: pdt });
    }
  });
});

app.get("/categories", (req: Request, res: Response) => {
  res.render("categories");
});

app.get("/productid=:pdtId", (req: Request, res: Response) => {
  // product(Product, req, res);
  const requestedPdtId = req.params.pdtId.trim();

  // console.log(requestedPdtId);

  Product.findById(requestedPdtId, (err, pdt) => {
    if (err) {
      res.send("Error getting this product.");
      console.log(err);
    } else {
      // console.log(pdt);
      res.render("product", { data: pdt });
    }
  });
});

app.post("/product", (req: Request, res: Response) => {
  res.redirect("/cart");
});

app.get("/cart", (req: Request, res: Response) => {
  const thatCookie = req.cookies.test;
  console.log(JSON.parse(thatCookie));

  res.render("cart");
});

app.get("/checkout", (req: Request, res: Response) => {
  res.render("checkout");
});

app.get("/contact", (req: Request, res: Response) => {
  res.render("contact");
});

app.post("/contact", (req: Request, res: Response) => {
  const formData = {
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
    message: req.body.message,
  };
  console.log(formData);

  res.render("thankyou");
});

app.get("*", (req: Request, res: Response) => {
  res.send("Not found this page.");
});

// ------------------------------------------
