// talk to sockets

/*
const socket = io();

const cartItemIds = localStorage.getItem("cartItems");

if (cartItemIds == null) {
  console.log("cart items are null");
} else {
  // console.log(cartItemIds);

  socket.emit("cart-msg", cartItemIds);
}

socket.on("cart-msg", (msg) => {
  console.log(msg);
});
*/

const thatCookie = {
  name: "hey ",
  body: "there",
};

// Cookies.set("test", JSON.stringify(thatCookie), { expires: 7 });
// const cookieValue = JSON.parse(Cookies.get("test"));
const cookieValue = Cookies.get("nothing");
console.log(cookieValue);
