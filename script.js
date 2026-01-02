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

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let message = "Hello, I want to order:\n\n";
  let total = 0;

  cart.forEach(item => {
    message += `${item.name} × ${item.qty} = ₹${item.price * item.qty}\n`;
    total += item.price * item.qty;
  });

  message += `\nTotal: ₹${total}`;

  let url = "https://wa.me/918999827106?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", loadCart);
