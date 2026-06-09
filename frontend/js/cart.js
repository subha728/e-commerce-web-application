checkLogin();
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
} else {
  fetch("http://localhost:5000/api/cart", {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((cart) => {
      const container = document.getElementById("cartItems");

      cart.products.forEach((item) => {
        container.innerHTML += `
          <div class="product">
            <h3>${item.product.name}</h3>
            <p>Price: ₹${item.product.price}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
        `;
      });
    });
}
async function placeOrder() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/orders/place",
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
    }
  );

  const data = await response.json();

  alert("Order placed successfully");

  console.log(data);
}