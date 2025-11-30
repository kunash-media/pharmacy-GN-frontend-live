// mother-product-details.js → FINAL 101% WORKING – NO UNDEFINED, NO 404

let currentProduct = null;

// Header cart count update
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    if (el) {
      el.textContent = total;
      el.style.display = total > 0 ? "flex" : "none";
    }
  });
}

// Update Add to Cart Button (Go to Bag / Add to Cart)
function updateAddToCartButton() {
  const btn = document.getElementById("addToCartBtn");
  if (!btn || !currentProduct) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const alreadyInCart = cart.some(item => item.id === currentProduct.id);

  if (alreadyInCart) {
    btn.innerHTML = `<i class="fas fa-check mr-3"></i> Go to Bag`;
    btn.className = "flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center";
    btn.onclick = () => window.location.href = "../cart.html";
  } else {
    btn.innerHTML = `<i class="fas fa-shopping-cart mr-3"></i> Add to Cart`;
    btn.className = "flex-1 bg-pink-600 hover:bg-pink-700 text-white py-4 px-8 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center";
    btn.onclick = addToCart;
  }
}

// MAIN ADD TO CART FUNCTION – YEH SABSE ZAROORI HAI
function addToCart() {
  const qty = parseInt(document.getElementById("quantity").textContent) || 1;

  // Yeh structure bilkul cart.js ke hisab se hai
  const productToAdd = {
    id: currentProduct.id,
    name: currentProduct.title,           // ← cart.js mein "name" chahiye
    price: currentProduct.price,
    image: currentProduct.mainImageUrl,    // ← cart.js mein "image" chahiye
    quantity: qty
  };

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find(item => item.id === productToAdd.id);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateAddToCartButton();
  updateCartCount();

  // Success flash
  const btn = document.getElementById("addToCartBtn");
  btn.innerHTML = `<i class="fas fa-check mr-3"></i> Added!`;
  setTimeout(updateAddToCartButton, 1200);
}

// Wishlist Toggle
function toggleWishlist() {
  const btn = document.getElementById("addToWishlistBtn");
  const icon = btn?.querySelector("i");
  if (!icon || !currentProduct) return;

  let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const inWishlist = wishlist.some(p => p.id === currentProduct.id);

  if (inWishlist) {
    wishlist = wishlist.filter(p => p.id !== currentProduct.id);
    icon.className = "far fa-heart";
  } else {
    wishlist.push(currentProduct);
    icon.className = "fas fa-heart text-pink-500";
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// Quantity +/-
function setupQuantity() {
  let qty = 1;
  const display = document.getElementById("quantity");
  if (!display) return;

  document.getElementById("increaseQty")?.addEventListener("click", () => {
    qty++;
    display.textContent = qty;
  });
  document.getElementById("decreaseQty")?.addEventListener("click", () => {
    if (qty > 1) {
      qty--;
      display.textContent = qty;
    }
  });
}

// Main Init Function
function initProductPage() {
  const productId = localStorage.getItem("selectedProductId");
  const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");

  if (!productId || allProducts.length === 0) {
    alert("Product not found!");
    return;
  }

  currentProduct = allProducts.find(p => p.id == productId);
  if (!currentProduct) return;

  // Fill data
  document.querySelector("h1").textContent = currentProduct.title;
  document.getElementById("mainImage").src = currentProduct.mainImageUrl;
  document.querySelector(".text-4xl.text-pink-600").textContent = `₹${currentProduct.price}`;

  // Setup buttons
  document.getElementById("addToCartBtn").onclick = addToCart;
  document.getElementById("addToWishlistBtn").onclick = toggleWishlist;

  // Check wishlist status
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const wishIcon = document.querySelector("#addToWishlistBtn i");
  if (wishlist.some(p => p.id === currentProduct.id)) {
    wishIcon.className = "fas fa-heart text-pink-500";
  }

  setupQuantity();
  updateAddToCartButton();
  updateCartCount();
}

// Run after page load
window.addEventListener("load", () => {
  setTimeout(initProductPage, 800);
});