// to make cookies everytime a user adds an item to the cart

const itemId = document.getElementById("itemID").textContent;

const cartData = {
  itemIds: [],
  number: 0,
};

const getCartData = Cookies.get("cartItems");

let count2 = 0;

if (getCartData != null && getCartData != undefined) {
  // console.log(`cookie exists: ${Cookies.get("cartItems")}`);
  const cartdatatemp = JSON.parse(getCartData);
  count2 = parseInt(cartdatatemp.number);
  cartData.number = count2;
  cartData.itemIds = cartdatatemp.itemIds;
}

document.getElementById("cartValue").innerHTML = count2;

const addCart = () => {
  cartData.itemIds.push(itemId);
  cartData.number++;

  Cookies.set("cartItems", JSON.stringify(cartData));

  alert(`Item is added to cart!`);

  document.getElementById("cartValue").innerHTML = cartData.number;
};
