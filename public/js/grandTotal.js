let subtotalNo = document.getElementById("subTotal").textContent;

// console.log(subtotalNo);

document.getElementById("shippingFee").innerHTML = `$${localStorage.getItem(
  "deliCharges"
)}`;

let deliFee = document.getElementById("shippingFee").textContent;

// console.log(deliFee);

let grandTotalNo = document.getElementById("grandTotal");

subtotalNo = parseFloat(subtotalNo.trim().replace("$", ""));

// console.log(subtotalNo);

if (deliFee == "Free") {
  deliFee = 0;
} else {
  deliFee = parseFloat(deliFee.trim().replace("$", ""));
}

// console.log(deliFee);

grandTotalNo.innerHTML = `$${parseFloat(subtotalNo) + parseFloat(deliFee)}`;
// console.log(`$${parseFloat(subtotalNo) + parseFloat(deliFee)}`);

if (deliFee == 0) {
  deliFee = "Free";
} else {
  deliFee = `$${deliFee}`;
}

// console.log(grandTotalNo.innerHTML);
