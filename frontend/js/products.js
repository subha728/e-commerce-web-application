fetch("https://e-commerce-web-application-x3ga.onrender.com/api/products")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("products");

    products.forEach((product) => {
      container.innerHTML += `
      <div class="product">
        <img
          src="https://via.placeholder.com/250x150"
          alt="product"
          style="width:100%; border-radius:8px; margin-bottom:10px;"
        >

        <h3>${product.name}</h3>

        <p><strong>Price:</strong> ₹${product.price}</p>

        <p>${product.description}</p>

        <button onclick="addToCart('${product._id}')">
          Add To Cart
        </button>
      </div>
      `;
    });
  })
  .catch((err) => {
    console.error("Products Error:", err);
  });

async function addToCart(productId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const response = await fetch(
      "https://e-commerce-web-application-x3ga.onrender.com/api/cart/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Response:", data);

    if (!response.ok) {
      alert("Error: " + (data.message || "Failed to add to cart"));
      return;
    }

    alert(JSON.stringify(data));
  } catch (error) {
    console.error("Add To Cart Error:", error);
    alert("Failed to add product to cart");
  }
}