// calculates the total amount of money needed to make purchase

const finalItems = document.querySelectorAll("#quantityOfItems");

// console.log(finalItems);

let sumTotal = 0;

for (let i = 0; i < finalItems.length; i++) {
  sumTotal += parseInt(finalItems[i].textContent.trim().replace("$", ""));
}

// console.log(sumTotal);
document.querySelector(".cart_total_value.ml-auto").innerHTML = `$${sumTotal}`;
