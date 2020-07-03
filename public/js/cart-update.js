// for handling localstorage for cart items

const itemId = document.getElementById("itemID").textContent;

// console.log(itemId);

const cartData = {
  itemIds: [],
  number: 0,
};

const getCartData = JSON.parse(localStorage.getItem("cartItems"));

let count = 0;

if (!(getCartData == null)) {
  count = getCartData.number;
  cartData.number = count;
  cartData.itemIds = getCartData.itemIds;
}

document.getElementById("cartValue").innerHTML = count;

const addCart = () => {
  cartData.itemIds.push(itemId);
  cartData.number++;

  localStorage.setItem("cartItems", JSON.stringify(cartData));

  alert(`Item is added to cart!`);

  document.getElementById("cartValue").innerHTML = cartData.number;
};
