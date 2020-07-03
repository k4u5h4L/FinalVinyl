import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app: Application = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

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
});

const Product = mongoose.model("Product", productSchema);

// setting routes

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/categories", (req: Request, res: Response) => {
  res.render("categories");
});

// the below is test data to store in the database

// const newPdt = new Product({
//   name: "beats",
//   imgSrc: ["abc", "def"],
//   oldCost: 4,
//   newCost: 6,
//   avail: true,
//   about: ["abc", "def"],
//   Desc: [
//     {
//       title: "hello",
//       body: "there",
//     },
//     {
//       title: "hey",
//       body: "there",
//     },
//   ],
//   type: "earphones",
// });

// newPdt.save();

app.get("/productid=:pdtId", (req: Request, res: Response) => {
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

  // res.render("product", { cartValue: 1 });
});

app.post("/product", (req: Request, res: Response) => {
  res.redirect("/cart");
});

app.get("/cart", (req: Request, res: Response) => {
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

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
