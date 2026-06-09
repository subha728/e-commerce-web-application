const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

fetch("https://e-commerce-web-application-x3ga.onrender.com/api/orders", {
  headers: {
    Authorization: token,
  },
})
  .then((res) => res.json())
  .then((orders) => {
    console.log("Orders:", orders);

    const container = document.getElementById("orders");

    container.innerHTML = "";

    if (!orders || orders.length === 0) {
      container.innerHTML = "<h3>No Orders Found</h3>";
      return;
    }

    orders.forEach((order) => {
      container.innerHTML += `
        <div class="product">
          <h3>Order Status: ${order.status}</h3>
          <p>Order ID: ${order._id}</p>
          <p>Products: ${order.products.length}</p>
        </div>
      `;
    });
  })
  .catch((err) => {
    console.error("Orders Error:", err);
  });