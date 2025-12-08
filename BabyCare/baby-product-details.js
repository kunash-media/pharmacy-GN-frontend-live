// baby-product-details.js - FINAL VERSION USING "cart" & "wishlist"
let selectedSize = "S";
let quantity = 1;
let basePrice = 0;
let product = null;

document.addEventListener('DOMContentLoaded', () => {
  const stored = sessionStorage.getItem('currentProduct');
  if (!stored) {
    alert("Product not found!");
    window.history.back();
    return;
  }

  product = JSON.parse(stored);
  quantity = 1;
  selectedSize = "S";
  basePrice = product.price;

  // Use mainImageUrl first (from listing page), fallback to image
  product.mainImageUrl = product.mainImageUrl || product.image || `https://via.placeholder.com/500x500/EC4899/white?text=${encodeURIComponent(product.title?.slice(0,2) || 'NA')}`;

  // Fill product info
  document.getElementById('productTitle').textContent = product.title || 'Unknown Product';
  document.getElementById('productPrice').textContent = `₹${basePrice.toLocaleString()}`;
  document.getElementById('productBrand').textContent = product.brand || 'Unknown';
  document.getElementById('productCategory').textContent = (product.category || '').replace(/-/g, ' ').toUpperCase();

  const batchNumber = generateBatchNumber();
  document.getElementById('batchNo').textContent = `Batch: ${batchNumber}`;
  document.getElementById('specName').textContent = product.title || '-';
  document.getElementById('specBrand').textContent = product.brand || '-';
  document.getElementById('specCategory').textContent = (product.category || '').replace(/-/g, ' ').toUpperCase();
  document.getElementById('specBatch').textContent = batchNumber;

  // Discount
  if (product.discount > 0) {
    const original = Math.round(product.price / (1 - product.discount / 100));
    document.getElementById('originalPrice').textContent = `₹${original.toLocaleString()}`;
    document.getElementById('discountBadge').textContent = `${product.discount}% OFF`;
    document.getElementById('discountBadge').classList.remove('hidden');
    document.getElementById('originalPrice').classList.remove('hidden');
  }

  // Main image
  document.getElementById('mainImage').innerHTML = `
    <img id="mainProductImage" src="${product.mainImageUrl}" alt="${product.title}" 
         class="w-full h-full object-contain rounded-lg hover:scale-105 transition duration-500">
  `;

  loadThumbnails(product);

  // Size selection
  document.querySelectorAll('.size-option').forEach(el => {
    el.onclick = () => {
      document.querySelectorAll('.size-option').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      selectedSize = el.getAttribute('data-size');
      const multiplier = parseFloat(el.getAttribute('data-price-multiplier'));
      const newPrice = Math.round(basePrice * multiplier);
      document.getElementById('productPrice').textContent = `₹${newPrice.toLocaleString()}`;
      if (product.discount > 0) {
        const original = Math.round(newPrice / (1 - product.discount / 100));
        document.getElementById('originalPrice').textContent = `₹${original.toLocaleString()}`;
      }
    };
  });

  // Quantity
  document.getElementById('decreaseQty').onclick = () => {
    if (quantity > 1) {
      quantity--;
      document.getElementById('quantity').textContent = quantity;
    }
  };
  document.getElementById('increaseQty').onclick = () => {
    quantity++;
    document.getElementById('quantity').textContent = quantity;
  };

  // ADD TO CART - NOW USES "cart"
  document.getElementById('addToCart')?.addEventListener('click', function(e) {
    e.preventDefault();

    const selectedEl = document.querySelector('.size-option.selected');
    if (!selectedEl) {
      alert("Please select a size first!");
      return;
    }

    selectedSize = selectedEl.getAttribute('data-size');
    const multiplier = parseFloat(selectedEl.getAttribute('data-price-multiplier'));
    const currentPrice = Math.round(basePrice * multiplier);

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const item = {
      id: product.id,
      name: product.title,           // Cart page expects "name"
      title: product.title,
      price: currentPrice,
      image: product.mainImageUrl,
      size: selectedSize,
      quantity: quantity,
      brand: product.brand || 'Unknown'
    };

    const existing = cart.findIndex(i => i.id === item.id && i.size === item.size);
    if (existing > -1) {
      cart[existing].quantity += quantity;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added to Cart!\n${item.name}\nSize: ${item.size} × ${quantity}`);
    updateCartCount();
    window.dispatchEvent(new Event('cartUpdated'));
  });

  // ADD TO WISHLIST - NOW USES "wishlist"
  document.getElementById('addToWishlist')?.addEventListener('click', function() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const selectedEl = document.querySelector('.size-option.selected') || document.querySelector('.size-option');
    const multiplier = parseFloat(selectedEl.getAttribute('data-price-multiplier') || 1);
    const currentPrice = Math.round(basePrice * multiplier);

    const item = {
      id: product.id,
      name: product.title,
      title: product.title,
      price: currentPrice,
      image: product.mainImageUrl,
      size: selectedSize,
      brand: product.brand
    };

    const exists = wishlist.some(i => i.id === item.id && i.size === item.size);
    if (exists) {
      wishlist = wishlist.filter(i => !(i.id === item.id && i.size === item.size));
      this.innerHTML = '<i class="far fa-heart mr-2"></i>Add to Wishlist';
      this.classList.remove('active');
      alert("Removed from Wishlist");
    } else {
      wishlist.push(item);
      this.innerHTML = '<i class="fas fa-heart mr-2"></i>Added to Wishlist';
      this.classList.add('active');
      alert("Added to Wishlist");
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  });

  loadRelatedProducts();
  initializeSpecsTabs();
  updateCartCount(); // Initial count
});

function loadThumbnails(product) {
  const thumbs = product.thumbnails || [
    product.mainImageUrl,
    "https://m.media-amazon.com/images/I/81no6xXKzCL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81Ke9Y2T7nL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81fF2n7kMGL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81X5o2d2KZL._SL1500_.jpg"
  ];

  document.querySelectorAll('.thumbnail img').forEach((img, i) => {
    if (thumbs[i]) {
      img.src = thumbs[i];
      img.style.display = 'block';
      img.onclick = () => {
        document.getElementById('mainProductImage').src = thumbs[i];
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('border-blue-500'));
        img.parentElement.classList.add('border-blue-500');
      };
    }
  });
  document.querySelector('.thumbnail')?.classList.add('border-blue-500');
}

function loadRelatedProducts() {
  const container = document.getElementById('relatedProducts');
  if (!container) return;

  let grid = container.querySelector('.grid');
  if (!grid) {
    grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
    container.appendChild(grid);
  }
  grid.innerHTML = '';

  const samples = [
    { id: 1, title: "Pampers Premium Care Pants", price: 1299, image: "https://m.media-amazon.com/images/I/71N3kZZyZAL._SL1500_.jpg" },
    { id: 7, title: "MamyPoko Pants Extra Absorb", price: 1099, image: "https://m.media-amazon.com/images/I/81X5o2d2KZL._SL1500_.jpg" },
    { id: 10, title: "Pampers Fresh Clean Wipes", price: 399, image: "https://m.media-amazon.com/images/I/81s7K9m1JUL._SL1500_.jpg" },
    { id: 2, title: "Himalaya Baby Shampoo", price: 349, image: "https://m.media-amazon.com/images/I/71pIlb8rKUL._SL1500_.jpg" }
  ];

  samples.forEach(p => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="w-full h-48 object-contain p-4">
      <div class="p-4">
        <h3 class="font-medium text-gray-800 truncate">${p.title}</h3>
        <div class="flex justify-between items-center mt-2">
          <span class="text-lg font-bold text-blue-600">₹${p.price}</span>
          <button onclick="openProduct(${p.id})" class="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200">View</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openProduct(id) {
  const all = JSON.parse(sessionStorage.getItem('allProducts') || '[]');
  const prod = all.find(p => p.id === id) || { id, title: "Product", price: 999, mainImageUrl: "https://via.placeholder.com/500" };
  sessionStorage.setItem('currentProduct', JSON.stringify(prod));
  location.reload();
}

function initializeSpecsTabs() {
  document.querySelectorAll('.specs-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.specs-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.specs-content').forEach(c => c.classList.add('hidden'));
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-tab')).classList.remove('hidden');
    });
  });
}

function generateBatchNumber() {
  const l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const n = '0123456789';
  return Array(2).fill().map(() => l[Math.floor(Math.random()*26)]).join('') + '-' +
         Array(6).fill().map(() => n[Math.floor(Math.random()*10)]).join('');
}

// UPDATE CART COUNT - reads from "cart"
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const total = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
  document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, #cart-count, #cartItemsCount, .cart-count').forEach(el => {
    if (el) {
      el.textContent = total;
      el.style.display = total > 0 ? 'inline-flex' : 'none';
    }
  });
}

// Run on load
updateCartCount();