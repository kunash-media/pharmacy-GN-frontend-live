document.addEventListener('DOMContentLoaded', () => {
  const product = JSON.parse(sessionStorage.getItem('currentProduct'));
  const allProducts = JSON.parse(sessionStorage.getItem('allProducts') || '[]');

  if (!product) {
    document.body.innerHTML = `<div class="text-center py-20"><h1>Product not found</h1></div>`;
    return;
  }
  // Add this inside DOMContentLoaded
document.getElementById('addToWishlist').addEventListener('click', () => {
  addToWishlist(product.id);

  // Toggle heart icon on details page
  const btn = document.getElementById('addToWishlist');
  const icon = btn.querySelector('i');
  const isWishlisted = JSON.parse(localStorage.getItem('wishlist') || '[]').some(p => p.id === product.id);

  if (isWishlisted) {
    icon.classList.remove('far');
    icon.classList.add('fas', 'text-red-600');
    btn.querySelector('span').textContent = 'Wishlisted';
  } else {
    icon.classList.remove('fas', 'text-red-600');
    icon.classList.add('far');
    btn.querySelector('span').textContent = 'Add to Wishlist';
  }
});

// Page load pe check karo ki already wishlisted hai ya nahi
const isAlreadyWishlisted = JSON.parse(localStorage.getItem('wishlist') || '[]').some(p => p.id === product.id);
if (isAlreadyWishlisted) {
  const btn = document.getElementById('addToWishlist');
  btn.querySelector('i').classList.replace('far', 'fas');
  btn.querySelector('i').classList.add('text-red-600');
  btn.querySelector('span').textContent = 'Wishlisted';
}

updateWishlistCount();
  updateCartCount();

  // Update page content
  document.getElementById('productTitle').textContent = product.title;
  document.getElementById('productPrice').textContent = `₹${product.price}`;
  if (product.discount) {
    const original = Math.round(product.price / (1 - product.discount / 100));
    document.getElementById('originalPrice').textContent = `₹${original}`;
    document.getElementById('discountBadge').textContent = `${product.discount}% OFF`;
  }
  document.getElementById('productDescription').textContent = `${product.title} - Premium quality baby product from ${product.brand}. Safe, soft, and gentle for your little one.`;
  document.getElementById('productBrand').innerHTML = `<span class="font-medium">Brand:</span> ${product.brand}`;
  document.getElementById('productCategory').innerHTML = `<span class="font-medium">Category:</span> ${formatCategory(product.category)}`;

  // Rating stars
  const ratingHTML = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  document.getElementById('productRating').innerHTML = ratingHTML.split('').map(s => 
    `<span class="${s === '★' ? 'text-yellow-400' : 'text-gray-300'}">★</span>`
  ).join('');
  document.getElementById('reviewCount').textContent = `(${Math.floor(Math.random() * 200) + 50} reviews)`;

  // Main image placeholder
  document.getElementById('mainImage').innerHTML = `
    <div class="text-6xl font-bold text-gray-300">${product.title.slice(0,2)}</div>
  `;

  // Stock status
  document.getElementById('stockStatus').textContent = 'In Stock';
  document.getElementById('stockStatus').className = 'text-sm font-semibold in-stock';

  // Breadcrumb
  document.getElementById('breadcrumbCategory').textContent = product.title;

  // Add to Cart Button (on details page)
  document.getElementById('addToCart').addEventListener('click', () => {
    addToCart(product.id);
  });

  // Load related products
  const related = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  document.getElementById('relatedProducts').innerHTML = related.map(p => `
    <div class="related-product-card cursor-pointer" onclick="openProductDetails(${p.id})">
      <div class="bg-blue-50 h-48 flex items-center justify-center text-4xl font-bold text-gray-300">
        ${p.title.slice(0,2)}
      </div>
      <div class="p-4">
        <h3 class="font-medium text-sm line-clamp-2">${p.title}</h3>
        <div class="flex items-center gap-1 my-1">
          <span class="text-yellow-500 text-xs">★</span>
          <span class="text-xs text-gray-600">${p.rating}</span>
        </div>
        <p class="font-bold text-blue-600">₹${p.price}</p>
        <button onclick="event.stopPropagation(); addToCart(${p.id})"
                class="mt-2 w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('') || '<p>No related products found.</p>';

  // Global functions (same as in baby.js)
  window.openProductDetails = (id) => {
    const prod = allProducts.find(p => p.id === id);
    if (prod) {
      sessionStorage.setItem('currentProduct', JSON.stringify(prod));
      location.reload(); // simple way to update page
    }
  };

  window.addToCart = (id) => {
    const prod = allProducts.find(p => p.id === id);
    if (!prod) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...prod, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${prod.title} added to cart!`);
  };

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countEl = document.querySelector('#cartCount');
    if (countEl) {
      countEl.textContent = total;
      countEl.style.display = total > 0 ? 'flex' : 'none';
    }
  }

  function showToast(msg) {
    // same toast as before
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#10b981;color:white;padding:1rem 2rem;border-radius:50px;font-weight:bold;z-index:10000;animation:toast 3s ease forwards;`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function formatCategory(cat) {
    return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' & ');
  }

  
});