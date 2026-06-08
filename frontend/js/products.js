fetch("http://localhost:5000/api/products")
  .then((res) => res.json())
  .then((products) => {
    const container = document.getElementById("products");

    products.forEach((product) => {
      container.innerHTML += `
<div class="product">
    <img
      src="https://via.placeholder.com/250x150"
      alt="Product"
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
  });

async function addToCart(productId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  const response = await fetch(
    "http://localhost:5000/api/cart/add",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        productId,
        quantity: 1
      })
    }
  );

  const data = await response.json();

  alert("Product added to cart");
  console.log(data);
}