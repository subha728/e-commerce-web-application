const token = localStorage.getItem("token");

if (!token) {
alert("Please login first");
window.location.href = "login.html";
}

loadCart();

async function loadCart() {
try {
const response = await fetch(
"https://e-commerce-web-application-x3ga.onrender.com/api/cart",
{
headers: {
Authorization: token,
},
}
);

```
const cart = await response.json();

console.log("Cart Data:", cart);

const container = document.getElementById("cartItems");

if (!container) {
  console.error("cartItems element not found");
  return;
}

container.innerHTML = "";

if (!cart || !cart.products || cart.products.length === 0) {
  container.innerHTML = "<p>Your cart is empty.</p>";
  return;
}

cart.products.forEach((item) => {
  container.innerHTML += `
  <div class="product">
    <h3>${item.product?.name || "Product"}</h3>
    <p>Price: ₹${item.product?.price || 0}</p>
    <p>Quantity: ${item.quantity}</p>
  </div>
`;
});
```

} catch (error) {
console.error("Error loading cart:", error);
}
}

async function placeOrder() {
try {
const response = await fetch(
"https://e-commerce-web-application-x3ga.onrender.com/api/orders/place",
{
method: "POST",
headers: {
Authorization: token,
},
}
);

```
const data = await response.json();

if (!response.ok) {
  alert(data.message || "Failed to place order");
  return;
}

alert("Order placed successfully");
window.location.href = "orders.html";
```

} catch (error) {
console.error("Order Error:", error);
alert("Something went wrong");
}
}

