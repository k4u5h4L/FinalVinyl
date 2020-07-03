const getCartData = JSON.parse(localStorage.getItem("cartItems"));

let count = 0;

if (!(getCartData == null)) {
  count = parseInt(getCartData.number);
}

document.getElementById("cartValue").innerHTML = count;
