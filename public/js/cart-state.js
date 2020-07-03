const getCartData = JSON.parse(Cookies.get("cartItems"));

let count = 0;

if (!(getCartData == null)) {
  count = parseInt(getCartData.number);
}

document.getElementById("cartValue").innerHTML = count;
