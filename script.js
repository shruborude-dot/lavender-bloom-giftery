let cart = [];

function qtyChange(btn,val){
  let span = btn.parentElement.querySelector("span");
  let qty = parseInt(span.innerText) + val;
  if(qty < 1) qty = 1;
  span.innerText = qty;
}

function addToCart(name,price,btn){
  let qty = parseInt(btn.parentElement.querySelector("span").innerText);
  cart.push({name,price,qty});
  document.getElementById("cartCount").innerText = cart.length;
  updateCart();
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("show");
}

function updateCart(){
  let items = document.getElementById("cartItems");
  items.innerHTML = "";
  let subtotal = 0;

  cart.forEach(i=>{
    subtotal += i.price*i.qty;
    items.innerHTML += `<p>${i.name} × ${i.qty} = ₹${i.price*i.qty}</p>`;
  });

  let shipping = subtotal >= 999 ? 0 : (subtotal > 0 ? 60 : 0);
  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("shipping").innerText = shipping;
  document.getElementById("total").innerText = subtotal + shipping;
}
