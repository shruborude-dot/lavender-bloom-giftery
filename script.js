let cart = JSON.parse(localStorage.getItem("cart")) || [];
const DELIVERY_CHARGE = 60; // change if needed
const FREE_DELIVERY_LIMIT = 999;
/* ADD TO CART */
function addToCart(name, price) {
  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart 💜");
}

/* DISPLAY CART */
function displayCart() {
  let cartItems = document.getElementById("cart-items");
  let totalEl = document.getElementById("total");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>

        <div class="qty">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="remove" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  let delivery = subtotal >= FREE_DELIVERY_LIMIT || subtotal === 0
    ? 0
    : DELIVERY_CHARGE;

  let total = subtotal + delivery;

  totalEl.innerHTML = `
    Subtotal: ₹${subtotal}<br>
    Delivery: ₹${delivery} ${delivery === 0 && subtotal >= FREE_DELIVERY_LIMIT ? "(Free above ₹999 🎉)" : ""}<br>
    <strong>Total: ₹${total}</strong>
  `;
}


/* CHANGE QUANTITY */
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

/* WHATSAPP CHECKOUT */
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty 💜");
    return;
  }

  let message = "Hello, I want to place an order 🛍️\n\n";
  let subtotal = 0;

  cart.forEach(item => {
    message += `${item.name} × ${item.qty} = ₹${item.price * item.qty}\n`;
    subtotal += item.price * item.qty;
  });

  let delivery = subtotal >= FREE_DELIVERY_LIMIT ? 0 : DELIVERY_CHARGE;
  let total = subtotal + delivery;

  message += `\nSubtotal: ₹${subtotal}`;
  message += `\nDelivery Charges: ₹${delivery}`;
  if (delivery === 0) {
    message += " (Free Delivery 🎉)";
  }
  message += `\nTotal Amount: ₹${total}`;

  let url = "https://wa.me/918999827106?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}
