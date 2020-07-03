// file to show the number of cart items

const cartItemsNo = Cookies.get("cartItems");

//console.log(cartItemsNo);

let count = 0;

if (cartItemsNo != null && cartItemsNo != undefined) {
  let newData = JSON.parse(cartItemsNo);
  count = newData.number;
}

document.getElementById("cartValue").innerHTML = count;
