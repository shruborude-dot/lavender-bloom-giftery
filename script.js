<script>
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart 🛒");
}
</script>
