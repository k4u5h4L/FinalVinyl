const boughtItems: any = [];

io.on("connection", (socket: any) => {
  // console.log("a user connected");

  socket.on("cart-msg", (msg: string) => {
    const ids = JSON.parse(msg);
    // console.log(ids.itemIds);

    for (let i = 0; i < ids.number; i++) {
      Product.findById(ids.itemIds[i], (err, pdt) => {
        if (err) {
          console.log(err);
          res.send("Error occured in getting items");
        } else {
          boughtItems.push(pdt);
          if (i === ids.number - 1) {
            socket.emit("cart-msg", boughtItems);
            // console.log(typeof ids.number);
            // res.render("cart");
            return boughtItems;
          }
          // console.log(
          //   `pass ${parseInt(i) + 1}\n------\n${boughtItems[i].name}\n-------`
          // );
        }
      });
    }
  });

  // socket.emit("test-msg", "this finally works");
});
console.log(boughtItems);
res.render("cart", { data: boughtItems });
