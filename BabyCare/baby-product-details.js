// baby-product-details.js - FIXED WITH CART INTEGRATION
(() => {
  // -----------------------------------------------------------------
  // CONFIG & STATE
  // -----------------------------------------------------------------
  const SAMPLE_PRODUCTS = [
    {
      id: 1,
      title: "Premium Baby Diapers",
      description: "Soft and absorbent diapers for your baby's comfort. Made with premium cotton-like material, ultra-absorbent core, and wetness indicator. Keeps your baby dry and comfortable all day long.",
      category: "diapers-wipes",
      price: 899,
      originalPrice: 1199,
      discount: 25,
      rating: 4.5,
      reviewCount: 128,
      brand: "BabyComfort",
      inStock: true,
      stockQuantity: 50,
      images: [
        "https://placehold.co/600x600/3B82F6/FFFFFF/png?text=Baby+Diapers+Front",
        "https://placehold.co/600x600/60A5FA/FFFFFF/png?text=Diapers+Side",
        "https://placehold.co/600x600/93C5FD/FFFFFF/png?text=Diapers+Pack"
      ],
      sizes: ["Newborn", "Small", "Medium", "Large"]
    },
    {
      id: 2,
      title: "Organic Baby Shampoo",
      description: "Gentle tear-free shampoo made with 100% natural ingredients. Safe for sensitive skin and scalp. Dermatologically tested and hypoallergenic formula.",
      category: "skin-hair-care",
      price: 349,
      originalPrice: 499,
      discount: 30,
      rating: 4.8,
      reviewCount: 89,
      brand: "NatureBaby",
      inStock: true,
      stockQuantity: 30,
      images: [
        "https://placehold.co/600x600/10B981/FFFFFF/png?text=Baby+Shampoo",
        "https://placehold.co/600x600/34D399/FFFFFF/png?text=Natural+Formula"
      ],
      sizes: []
    },
    {
      id: 3,
      title: "Baby Feeding Bottle Set",
      description: "BPA-free feeding bottles with anti-colic vent system. Comes with slow, medium, and fast flow nipples. Easy to clean and sterilize.",
      category: "feeding-nursing",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      rating: 4.3,
      reviewCount: 204,
      brand: "FeedWell",
      inStock: true,
      stockQuantity: 25,
      images: [
        "https://placehold.co/600x600/F59E0B/FFFFFF/png?text=Bottle+Set",
        "https://placehold.co/600x600/FBBF24/FFFFFF/png?text=Feeding+Bottle",
        "https://placehold.co/600x600/FCD34D/FFFFFF/png?text=Nipples"
      ],
      sizes: []
    },
    {
      id: 4,
      title: "Baby Wet Wipes Pack",
      description: "Gentle wet wipes for sensitive baby skin. Alcohol-free and hypoallergenic. Perfect for diaper changes and cleaning.",
      category: "diapers-wipes",
      price: 299,
      originalPrice: 399,
      discount: 25,
      rating: 4.6,
      reviewCount: 156,
      brand: "BabyComfort",
      inStock: true,
      stockQuantity: 80,
      images: [
        "https://placehold.co/600x600/8B5CF6/FFFFFF/png?text=Baby+Wipes",
        "https://placehold.co/600x600/A78BFA/FFFFFF/png?text=Wet+Wipes+Pack"
      ],
      sizes: []
    },
    {
      id: 5,
      title: "Baby Lotion",
      description: "Moisturizing lotion for soft baby skin. Enriched with natural oils and vitamins. Non-greasy formula.",
      category: "skin-hair-care",
      price: 449,
      originalPrice: 599,
      discount: 25,
      rating: 4.7,
      reviewCount: 112,
      brand: "NatureBaby",
      inStock: true,
      stockQuantity: 45,
      images: [
        "https://placehold.co/600x600/EC4899/FFFFFF/png?text=Baby+Lotion",
        "https://placehold.co/600x600/F472B6/FFFFFF/png?text=Skin+Moisturizer"
      ],
      sizes: []
    },
    {
      id: 6,
      title: "Baby Pacifier Set",
      description: "BPA-free pacifiers for newborns and infants. Orthodontic design supports natural oral development.",
      category: "feeding-nursing",
      price: 399,
      originalPrice: 499,
      discount: 20,
      rating: 4.4,
      reviewCount: 78,
      brand: "FeedWell",
      inStock: true,
      stockQuantity: 60,
      images: [
        "https://placehold.co/600x600/14B8A6/FFFFFF/png?text=Baby+Pacifier",
        "https://placehold.co/600x600/2DD4BF/FFFFFF/png?text=Pacifier+Set"
      ],
      sizes: []
    }
  ];

  let selectedProduct = null;
  let currentImageIndex = 0;
  let quantity = 1;
  let selectedSize = null;

  const els = {
    mainImage: document.getElementById('mainImage'),
    thumbnailImages: document.getElementById('thumbnailImages'),
    carouselDots: document.getElementById('carouselDots'),
    productTitle: document.getElementById('productTitle'),
    productRating: document.getElementById('productRating'),
    reviewCount: document.getElementById('reviewCount'),
    productPrice: document.getElementById('productPrice'),
    originalPrice: document.getElementById('originalPrice'),
    discountBadge: document.getElementById('discountBadge'),
    productDescription: document.getElementById('productDescription'),
    productSizes: document.getElementById('productSizes'),
    stockStatus: document.getElementById('stockStatus'),
    quantitySpan: document.getElementById('quantity'),
    productBrand: document.getElementById('productBrand'),
    productCategory: document.getElementById('productCategory'),
    relatedProducts: document.getElementById('relatedProducts'),
    addToCartBtn: document.getElementById('addToCart'),
    addToWishlistBtn: document.getElementById('addToWishlist'),
    decreaseQtyBtn: document.getElementById('decreaseQty'),
    increaseQtyBtn: document.getElementById('increaseQty'),
    prevImageBtn: document.getElementById('prevImage'),
    nextImageBtn: document.getElementById('nextImage')
  };

  // -----------------------------------------------------------------
  // CART FUNCTIONS (Compatible with cart.js)
  // -----------------------------------------------------------------
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  function saveCart(cartData) {
    localStorage.setItem('cart', JSON.stringify(cartData));
  }

  function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    
    // Update all cart count elements
    document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, .cart-count, #cart-count, #cartCount').forEach(el => {
      if (el) {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
        el.classList.toggle('hidden', totalItems === 0);
      }
    });
    
    console.log('📊 Cart count updated:', totalItems);
  }

  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const count = wishlist.length;
    
    document.querySelectorAll('#wishlistCount, #wishlist-count').forEach(el => {
      if (el) {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
        el.classList.toggle('hidden', count === 0);
      }
    });
  }

  // -----------------------------------------------------------------
  // INITIALIZATION
  // -----------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Product Details page initializing...');
    
    const id = parseInt(localStorage.getItem('selectedProductId'));
    console.log('📦 Looking for product ID:', id);
    
    if (!id || isNaN(id)) {
      console.error('❌ No valid product ID found');
      alert("No product selected. Redirecting to products page...");
      window.location.href = "./baby.html";
      return;
    }

    selectedProduct = SAMPLE_PRODUCTS.find(p => p.id === id);
    
    if (!selectedProduct) {
      console.error('❌ Product not found for ID:', id);
      alert("Product not found. Redirecting to products page...");
      window.location.href = "./baby.html";
      return;
    }

    console.log('✅ Product found:', selectedProduct.title);
    
    renderProduct();
    renderRelatedProducts();
    updateCartCount();
    updateWishlistCount();
    setupEventListeners();
  });

  // -----------------------------------------------------------------
  // RENDER FUNCTIONS
  // -----------------------------------------------------------------
  function renderProduct() {
    if (!selectedProduct) return;

    document.title = selectedProduct.title + " - Baby Care";
    els.productTitle.textContent = selectedProduct.title;
    els.productDescription.textContent = selectedProduct.description;
    els.productPrice.textContent = `₹${selectedProduct.price.toFixed(2)}`;
    
    if (selectedProduct.originalPrice > selectedProduct.price) {
      els.originalPrice.textContent = `₹${selectedProduct.originalPrice.toFixed(2)}`;
      els.originalPrice.classList.remove("hidden");
    } else {
      els.originalPrice.textContent = "";
      els.originalPrice.classList.add("hidden");
    }
    
    if (selectedProduct.discount > 0) {
      els.discountBadge.textContent = `${selectedProduct.discount}% OFF`;
      els.discountBadge.classList.remove("hidden");
    } else {
      els.discountBadge.textContent = "";
      els.discountBadge.classList.add("hidden");
    }
    
    els.reviewCount.textContent = `(${selectedProduct.reviewCount} reviews)`;
    els.productBrand.innerHTML = `<span class="font-medium">Brand:</span> ${selectedProduct.brand}`;
    els.productCategory.innerHTML = `<span class="font-medium">Category:</span> ${formatCategory(selectedProduct.category)}`;
    els.productRating.innerHTML = generateStars(selectedProduct.rating || 0);

    if (selectedProduct.stockQuantity > 10) {
      els.stockStatus.textContent = "In Stock";
      els.stockStatus.className = "in-stock";
    } else if (selectedProduct.stockQuantity > 0) {
      els.stockStatus.textContent = `Only ${selectedProduct.stockQuantity} left!`;
      els.stockStatus.className = "low-stock";
    } else {
      els.stockStatus.textContent = "Out of Stock";
      els.stockStatus.className = "out-of-stock";
      els.addToCartBtn.disabled = true;
      els.addToCartBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
      els.productSizes.innerHTML = selectedProduct.sizes.map(s => 
        `<button class="size-option" data-size="${s}">${s}</button>`
      ).join("");
      
      document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedSize = btn.dataset.size;
        });
      });
    } else {
      els.productSizes.innerHTML = "<p class='text-gray-600'>One Size</p>";
      selectedSize = "One Size";
    }
    // Show exchange policy only if product has multiple sizes
if (selectedProduct.sizes && selectedProduct.sizes.length > 0) {
  const exchangePolicyEl = document.getElementById('exchangePolicy');
  if (exchangePolicyEl) {
    exchangePolicyEl.classList.remove('hidden');
  }
} else {
  const exchangePolicyEl = document.getElementById('exchangePolicy');
  if (exchangePolicyEl) {
    exchangePolicyEl.classList.add('hidden');
  }
}

    renderImageCarousel();
    updateWishlistButton();
  }

  function renderImageCarousel() {
    if (!selectedProduct) return;

    const images = selectedProduct.images || ["https://placehold.co/600x600/CBD5E1/64748B/png?text=No+Image"];
    
    els.mainImage.innerHTML = `<img src="${images[currentImageIndex]}" 
      class="w-full h-full object-contain" 
      alt="${selectedProduct.title}"
      onerror="this.onerror=null; this.src='https://placehold.co/600x600/CBD5E1/64748B/png?text=No+Image';">`;
    
    els.thumbnailImages.innerHTML = images.map((src, i) => 
      `<img src="${src}" 
        class="thumbnail ${i === currentImageIndex ? 'active' : ''}" 
        data-index="${i}" 
        alt="Thumbnail ${i+1}"
        onerror="this.onerror=null; this.src='https://placehold.co/100x100/CBD5E1/64748B/png?text=Img${i+1}';">`
    ).join("");

    els.carouselDots.innerHTML = images.map((_, i) => 
      `<div class="carousel-dot ${i === currentImageIndex ? 'active' : ''}" data-index="${i}"></div>`
    ).join("");

    document.querySelectorAll('[data-index]').forEach(el => {
      el.addEventListener('click', () => {
        currentImageIndex = parseInt(el.dataset.index);
        renderImageCarousel();
      });
    });
  }

  function renderRelatedProducts() {
    if (!selectedProduct) return;

    const related = SAMPLE_PRODUCTS
      .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
      .slice(0, 4);

    els.relatedProducts.innerHTML = related.length === 0 
      ? "<p class='text-center text-gray-500 col-span-full'>No related products</p>"
      : related.map(p => `
        <div class="related-product-card cursor-pointer" data-product-id="${p.id}">
          <img src="${p.images[0]}" 
            class="w-full h-48 object-cover" 
            alt="${p.title}"
            onerror="this.onerror=null; this.src='https://placehold.co/300x200/CBD5E1/64748B/png?text=${encodeURIComponent(p.title)}';">
          <div class="p-4">
            <h3 class="font-semibold truncate">${p.title}</h3>
            <div class="text-yellow-500 text-sm">${generateStars(p.rating)}</div>
            <p class="font-bold text-blue-600">₹${p.price}</p>
          </div>
        </div>
      `).join("");
    
    document.querySelectorAll('[data-product-id]').forEach(card => {
      card.addEventListener('click', () => {
        const productId = parseInt(card.dataset.productId);
        viewProduct(productId);
      });
    });
  }

  // -----------------------------------------------------------------
  // EVENT HANDLERS
  // -----------------------------------------------------------------
  function changeImage(delta) {
    if (!selectedProduct) return;
    const total = selectedProduct.images.length;
    currentImageIndex = (currentImageIndex + delta + total) % total;
    renderImageCarousel();
  }

  function updateQuantity(delta) {
    const max = selectedProduct?.stockQuantity || 999;
    quantity = Math.max(1, Math.min(max, quantity + delta));
    els.quantitySpan.textContent = quantity;
  }

  function addToCart() {
    if (!selectedProduct) return;

    if (selectedProduct.sizes?.length && !selectedSize) {
      alert("Please select a size");
      return;
    }
    
    if (selectedProduct.stockQuantity === 0) {
      alert("This product is out of stock");
      return;
    }

    // Create cart item in the format expected by cart.js
    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.title, // cart.js uses 'name'
      title: selectedProduct.title, // Keep for compatibility
      price: selectedProduct.price,
      image: selectedProduct.images[0],
      size: selectedSize || "One Size",
      quantity: quantity,
      prescriptionRequired: false
    };

    const cart = getCart();
    
    // Check if item already exists with same size
    const existingIndex = cart.findIndex(item => 
      item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingIndex > -1) {
      // Update quantity of existing item
      cart[existingIndex].quantity += quantity;
      console.log('📦 Updated existing cart item quantity');
    } else {
      // Add new item
      cart.push(cartItem);
      console.log('📦 Added new item to cart');
    }

    saveCart(cart);
    updateCartCount();
    notify("✅ Added to cart!", "success");
    
    console.log('🛒 Current cart:', cart);
  }

  function toggleWishlist() {
    if (!selectedProduct) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = wishlist.some(i => i.id === selectedProduct.id);
    
    if (exists) {
      const filtered = wishlist.filter(i => i.id !== selectedProduct.id);
      localStorage.setItem('wishlist', JSON.stringify(filtered));
      notify("Removed from wishlist", "info");
    } else {
      wishlist.push({
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.images[0]
      });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      notify("❤️ Added to wishlist!", "success");
    }
    
    updateWishlistCount();
    updateWishlistButton();
  }

  function updateWishlistButton() {
    if (!selectedProduct) return;

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const exists = wishlist.some(i => i.id === selectedProduct.id);
    
    if (exists) {
      els.addToWishlistBtn.innerHTML = '<i class="fas fa-heart mr-2"></i>Added to Wishlist';
      els.addToWishlistBtn.classList.add('active');
    } else {
      els.addToWishlistBtn.innerHTML = '<i class="far fa-heart mr-2"></i>Add to Wishlist';
      els.addToWishlistBtn.classList.remove('active');
    }
  }

  function viewProduct(productId) {
    console.log('🔍 Switching to product ID:', productId);
    localStorage.setItem("selectedProductId", productId);
    window.location.reload();
  }

  function setupEventListeners() {
    if (els.prevImageBtn) els.prevImageBtn.addEventListener('click', () => changeImage(-1));
    if (els.nextImageBtn) els.nextImageBtn.addEventListener('click', () => changeImage(1));
    if (els.decreaseQtyBtn) els.decreaseQtyBtn.addEventListener('click', () => updateQuantity(-1));
    if (els.increaseQtyBtn) els.increaseQtyBtn.addEventListener('click', () => updateQuantity(1));
    if (els.addToCartBtn) els.addToCartBtn.addEventListener('click', addToCart);
    if (els.addToWishlistBtn) els.addToWishlistBtn.addEventListener('click', toggleWishlist);
  }

  // -----------------------------------------------------------------
  // UTILITY FUNCTIONS
  // -----------------------------------------------------------------
  function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  }

  function formatCategory(cat) {
    return cat.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" & ");
  }

  function notify(msg, type = "success") {
    // Remove existing notifications
    document.querySelectorAll('.custom-notification').forEach(n => n.remove());
    
    const n = document.createElement("div");
    n.className = `custom-notification fixed top-20 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium shadow-lg transition-all ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    }`;
    n.textContent = msg;
    document.body.appendChild(n);
    
    setTimeout(() => {
      n.style.opacity = "0";
      n.style.transform = "translateX(100%)";
    }, 3000);
    
    setTimeout(() => n.remove(), 3500);
  }

  // Update cart count on page load
  updateCartCount();
  updateWishlistCount();
})();