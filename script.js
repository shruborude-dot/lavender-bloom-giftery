function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = cart.find(p => p.name === name);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart 🛒");
}

const DELIVERY_CHARGE = 70;

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cart-items");
  let total = 0;

  if (!container) return;
  container.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>

        <button onclick="changeQty(${index}, -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index}, 1)">+</button>

        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  let grandTotal = total + (cart.length > 0 ? DELIVERY_CHARGE : 0);

  document.getElementById("total").innerHTML = `
    Subtotal: ₹${total}<br>
    Delivery: ₹${cart.length > 0 ? DELIVERY_CHARGE : 0}<br>
    <strong>Total: ₹${grandTotal}</strong>
  `;
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let message = "Hello, I want to order:\n\n";
  let subtotal = 0;

  cart.forEach(item => {
    message += `${item.name} × ${item.qty} = ₹${item.price * item.qty}\n`;
    subtotal += item.price * item.qty;
  });

  let total = subtotal + DELIVERY_CHARGE;

  message += `\nSubtotal: ₹${subtotal}`;
  message += `\nDelivery: ₹${DELIVERY_CHARGE}`;
  message += `\nTotal: ₹${total}`;

  let url = "https://wa.me/918999827106?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}


document.addEventListener("DOMContentLoaded", loadCart);
