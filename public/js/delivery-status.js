// here are the onclick functionalities for deliveries

const radioBtns = document.querySelectorAll("#deliBtn");

let neededBtn;

let deliCharges = 0;

const deliStatus = () => {
  for (let i = 0; i < radioBtns.length; i++) {
    if (radioBtns[i].checked) {
      neededBtn = radioBtns[i];
      break;
    }
  }

  // console.log(neededBtn);

  deliCharges = neededBtn.value;

  // console.log(deliCharges);

  localStorage.setItem("deliCharges", deliCharges);

  const subtotal = document.querySelectorAll(".cart_total_value.ml-auto");

  // console.log(subtotal[0].textContent);

  if (deliCharges == 0) {
    subtotal[1].innerHTML = `Free`;
  } else {
    subtotal[1].innerHTML = `$${deliCharges}`;
  }

  let grandTotal = parseFloat(sumTotal) + parseFloat(deliCharges);
  console.log(grandTotal);
  subtotal[2].innerHTML = `$${grandTotal}`;
};

deliStatus();
