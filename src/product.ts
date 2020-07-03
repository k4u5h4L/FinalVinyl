// to find the product from the id

import mongoose from "mongoose";
import { Request, Response } from "express";

const product = (Product: any, req: Request, res: Response): any => {
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
};

export default product;
