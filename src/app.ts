import dotenv from "dotenv";
dotenv.config();

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cookieParser from "cookie-parser";
import { resolveCname } from "dns";

// import cookie from "cookie";
// import Cookies from "js-cookie";

// import product from "./product";
// import featured from "./featured";

const app: Application = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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

const feedBackSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  message: String,
});

const Product = mongoose.model("Product", productSchema);

const Feedback = mongoose.model("Feedback", feedBackSchema);

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
  // const q = Product.find({}).sort("date", -1).limit(4);
  // q.execFind((err: any, pdt: any) => {
  //   // `posts` will be of length 4
  //   if (err) {
  //     res.send("Error");
  //     console.log(err);
  //   } else {
  //     res.render("categories", { data: pdt });
  //   }
  // });

  Product.find({}, (err, pdt) => {
    if (err) {
      res.send("Error");
      console.log(err);
    } else {
      res.render("categories", { data: pdt });
    }
  }).limit(12);
});

app.get("/categories=:typeDev", (req: Request, res: Response) => {
  const requestedType = req.params.typeDev.trim();

  Product.find({ type: requestedType }, (err, pdt) => {
    if (err) {
      res.send("Error");
      console.log(err);
    } else {
      res.render("categories", { data: pdt });
    }
  }).limit(12);
});

app.get("/productid=:pdtId", (req: Request, res: Response) => {
  // product(Product, req, res);
  const requestedPdtId = req.params.pdtId.trim();

  // console.log(requestedPdtId);

  Product.findById(requestedPdtId, (err, pdt) => {
    if (err) {
      res.write("Error getting this product.");
      console.log(err);
    } else {
      // console.log(pdt);
      const typeOfDevice: any = pdt;
      const searchType = typeOfDevice.type;
      Product.find(
        { type: searchType, _id: { $ne: typeOfDevice._id } },
        (err, pdt2) => {
          if (err) {
            res.send("Error getting this pdt");
            console.log(err);
          } else {
            // console.log(pdt2);
            res.render("product", { data: pdt, related: pdt2 });
          }
        }
      ).limit(4);
    }
  });
});

app.post("/product", (req: Request, res: Response) => {
  res.redirect("/cart");
});

app.get("/cart", (req: Request, res: Response) => {
  if (req.cookies.cartItems == null) {
    res.render("cartEmpty");
  } else {
    const pdtCookie = JSON.parse(req.cookies.cartItems);
    // console.log(pdtCookie);

    Product.find({ _id: pdtCookie.itemIds }, (err, pdt) => {
      if (err) {
        res.send("Error in sending the data.");
        console.log(err);
      } else {
        // console.log(pdt);

        res.render("cart", { data: pdt });
      }
    });
  }
});

app.get("/checkout", (req: Request, res: Response) => {
  const pdtCookie = JSON.parse(req.cookies.cartItems);
  // console.log(pdtCookie);

  Product.find({ _id: pdtCookie.itemIds }, (err, pdt) => {
    if (err) {
      res.send("Error in sending the data.");
      console.log(err);
    } else {
      // console.log(pdt);

      res.render("checkout", { data: pdt });
    }
  });
});

app.get("/contact", (req: Request, res: Response) => {
  res.render("contact");
});

app.post("/contact", (req: Request, res: Response) => {
  const user = new Feedback({
    firstName: req.body.fName,
    lastName: req.body.lName,
    email: req.body.email,
    message: req.body.message,
  });

  user.save();

  res.render("thankyou");
});

app.get("*", (req: Request, res: Response) => {
  res.send("Not found this page.");
});

// ------------------------------------------
