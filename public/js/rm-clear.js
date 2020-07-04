const rmItem = (ourObj) => {
  let items = JSON.parse(Cookies.get("cartItems"));

  // console.log(ourObj.id);
  // console.log(items.itemIds);
  // document.getElementById();
  for (let i = 0; i < items.itemIds.length; i++) {
    if (items.itemIds[i] === ourObj.id) {
      items.itemIds.splice(i, 1);
    }
  }

  items.number -= 1;

  Cookies.set("cartItems", JSON.stringify(items));

  updateCart();

  if (items.itemIds.length == 0) {
    Cookies.remove("cartItems");
  }

  window.location.reload();
};
