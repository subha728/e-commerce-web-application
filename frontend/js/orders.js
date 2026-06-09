const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

if (!token) {
  alert("Please login first");
} else {
  fetch("https://e-commerce-web-application-x3ga.onrender.com/api/orders", {
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((orders) => {
      const container = document.getElementById("orders");

      orders.forEach((order) => {
        container.innerHTML += `
          <div class="product">
            <h3>Order Status: ${order.status}</h3>
            <p>Order ID: ${order._id}</p>
          </div>
        `;
      });
    });
}