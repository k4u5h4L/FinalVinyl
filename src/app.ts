import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Application = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// const sent = {
//     string1: "Bose",
//     string2: "This is for testing",
// };

// setting routes

app.get("/", (req: Request, res: Response) => {
  res.render("index", { cartValue: 1 });
});

app.get("/categories", (req: Request, res: Response) => {
  res.render("categories", { cartValue: 1 });
});

app.get("/product", (req: Request, res: Response) => {
  res.render("product", { cartValue: 1 });
});

app.post("/product", (req: Request, res: Response) => {
  res.redirect("/cart");
});

app.get("/cart", (req: Request, res: Response) => {
  res.render("cart", { cartValue: 1 });
});

app.get("/checkout", (req: Request, res: Response) => {
  res.render("checkout", { cartValue: 1 });
});

app.get("/contact", (req: Request, res: Response) => {
  res.render("contact", { cartValue: 1 });
});

app.post("/contact", (req: Request, res: Response) => {
  const formData = {
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
    message: req.body.message,
  };
  console.log(formData);

  res.render("thankyou", { cartValue: 1 });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
