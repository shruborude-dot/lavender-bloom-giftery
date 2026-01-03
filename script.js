let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  document.getElementById("cart-count").innerText = cart.length;
  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
  });
  document.getElementById("total").innerText = total;

  let message = "Hello! I want to order:\n";
  cart.forEach(i => message += `• ${i.name} - ₹${i.price}\n`);
  message += `Total: ₹${total}`;

  document.getElementById("whatsapp-btn").href =
    "https://wa.me/91XXXXXXXXXX?text=" + encodeURIComponent(message);
}

function toggleCart() {
  const cartBox = document.getElementById("cart");
  cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
}
