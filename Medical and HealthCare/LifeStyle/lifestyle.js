// ==================== lifestyle.js – LIFESTYLE DISORDER PRODUCTS ====================

const allProducts = [
  // Diabetes Care
  { 
    id: 1, 
    title: "Sugar-Free Gold 500g", 
    price: 280, 
    originalPrice: 350, 
    discount: 20, 
    rating: 4.6, 
    reviewCount: 2350,
    category: "diabetes", 
    brand: "Dabur", 
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    description: "Natural sugar substitute for diabetes management",
    inStock: true 
  },
  { 
    id: 2, 
    title: "Diabetic Multivitamin (60 tablets)", 
    price: 420, 
    originalPrice: 550, 
    discount: 24, 
    rating: 4.5, 
    reviewCount: 1870,
    category: "diabetes", 
    brand: "Abbott", 
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    description: "Essential vitamins specially formulated for diabetic patients",
    inStock: true 
  },
  { 
    id: 3, 
    title: "Diabetic Foot Cream 50g", 
    price: 195, 
    originalPrice: 260, 
    discount: 25, 
    rating: 4.7, 
    reviewCount: 1560,
    category: "diabetes", 
    brand: "Dabur", 
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
    description: "Moisturizing cream for diabetic skin care",
    inStock: true 
  },

  // Heart & Blood Pressure
  { 
    id: 4, 
    title: "Digital Blood Pressure Monitor", 
    price: 850, 
    originalPrice: 1200, 
    discount: 29, 
    rating: 4.8, 
    reviewCount: 3250,
    category: "heart-bp", 
    brand: "Dr. Reddy's", 
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    description: "Accurate digital BP monitor for home use",
    inStock: true 
  },
  { 
    id: 5, 
    title: "Heart Care Capsules (60 caps)", 
    price: 315, 
    originalPrice: 420, 
    discount: 25, 
    rating: 4.6, 
    reviewCount: 2780,
    category: "heart-bp", 
    brand: "Himalaya", 
    image: "https://images.unsplash.com/photo-1550572017-4876b7788da6?w=400&h=400&fit=crop",
    description: "Natural support for cardiovascular health",
    inStock: true 
  },
  { 
    id: 6, 
    title: "Omega-3 Fish Oil (90 capsules)", 
    price: 480, 
    originalPrice: 650, 
    discount: 26, 
    rating: 4.7, 
    reviewCount: 3120,
    category: "heart-bp", 
    brand: "Abbott", 
    image: "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=400&h=400&fit=crop",
    description: "Supports heart and brain health with essential fatty acids",
    inStock: false 
  },

  // Thyroid Support
  { 
    id: 7, 
    title: "Thyroid Support Tablets (60 tabs)", 
    price: 295, 
    originalPrice: 395, 
    discount: 25, 
    rating: 4.4, 
    reviewCount: 1450,
    category: "thyroid", 
    brand: "Baidyanath", 
    image: "https://images.unsplash.com/photo-1599932887768-d6cb80133949?w=400&h=400&fit=crop",
    description: "Ayurvedic support for healthy thyroid function",
    inStock: true 
  },
  { 
    id: 8, 
    title: "Iodine Supplement (100 tablets)", 
    price: 180, 
    originalPrice: 240, 
    discount: 25, 
    rating: 4.5, 
    reviewCount: 1670,
    category: "thyroid", 
    brand: "Abbott", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
    description: "Essential iodine supplement for thyroid health",
    inStock: true 
  },
  { 
    id: 9, 
    title: "Thyroid Care Herbal Tea (30 bags)", 
    price: 165, 
    originalPrice: 220, 
    discount: 25, 
    rating: 4.3, 
    reviewCount: 980,
    category: "thyroid", 
    brand: "Himalaya", 
    image: "https://images.unsplash.com/photo-1599932887768-d6cb80133949?w=400&h=400&fit=crop",
    description: "Herbal tea blend for thyroid support",
    inStock: true 
  },

  // Vitamins & Supplements
  { 
    id: 10, 
    title: "Vitamin D3 60K IU (4 tablets)", 
    price: 145, 
    originalPrice: 195, 
    discount: 26, 
    rating: 4.8, 
    reviewCount: 2890,
    category: "vitamins", 
    brand: "Dr. Reddy's", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
    description: "High potency Vitamin D supplement for bone health",
    inStock: true 
  },
  { 
    id: 11, 
    title: "Multivitamin Complex (90 tablets)", 
    price: 325, 
    originalPrice: 450, 
    discount: 28, 
    rating: 4.7, 
    reviewCount: 2560,
    category: "vitamins", 
    brand: "Himalaya", 
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    description: "Complete daily multivitamin formula",
    inStock: true 
  },
  { 
    id: 12, 
    title: "Calcium + Vitamin D (60 tablets)", 
    price: 225, 
    originalPrice: 300, 
    discount: 25, 
    rating: 4.6, 
    reviewCount: 2340,
    category: "vitamins", 
    brand: "Dabur", 
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    description: "Bone health supplement with enhanced absorption",
    inStock: false 
  },

  // Nutritional Support
  { 
    id: 13, 
    title: "Protein Powder 500g (Vanilla)", 
    price: 650, 
    originalPrice: 850, 
    discount: 24, 
    rating: 4.8, 
    reviewCount: 3450,
    category: "nutrition", 
    brand: "Abbott", 
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=400&fit=crop",
    description: "Whey protein for nutritional support",
    inStock: true 
  },
  { 
    id: 14, 
    title: "Fiber Supplement (200g)", 
    price: 285, 
    originalPrice: 380, 
    discount: 25, 
    rating: 4.5, 
    reviewCount: 1670,
    category: "nutrition", 
    brand: "Dabur", 
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
    description: "Dietary fiber for digestive health",
    inStock: true 
  },

  // General Wellness
  { 
    id: 15, 
    title: "Stress Relief Capsules (60 caps)", 
    price: 350, 
    originalPrice: 450, 
    discount: 22, 
    rating: 4.4, 
    reviewCount: 1890,
    category: "wellness", 
    brand: "Himalaya", 
    image: "https://images.unsplash.com/photo-1550572017-4876b7788da6?w=400&h=400&fit=crop",
    description: "Natural stress and anxiety management",
    inStock: true 
  },
  { 
    id: 16, 
    title: "Immunity Booster Syrup 200ml", 
    price: 220, 
    originalPrice: 290, 
    discount: 24, 
    rating: 4.7, 
    reviewCount: 2450,
    category: "wellness", 
    brand: "Baidyanath", 
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    description: "Herbal syrup to boost immune system",
    inStock: true 
  }
];

// Global State
let filteredProducts = [...allProducts];
let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let currentPage = 1;
const pageSize = 12;

// Persistent Filter State
let filterState = {
  category: 'all',
  brand: 'all',
  discount: 0,
  minPrice: 0,
  maxPrice: 5000,
  sort: 'default'
};

// Category Display Names
const categoryDisplayNames = {
  'all': 'All Lifestyle Products',
  'diabetes': 'Diabetes Care Products',
  'heart-bp': 'Heart & Blood Pressure Support',
  'thyroid': 'Thyroid Support Products',
  'vitamins': 'Vitamins & Supplements',
  'nutrition': 'Nutritional Support',
  'wellness': 'General Wellness'
};

// Helper: Safe text update
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Update page title based on category
function updatePageTitle() {
  const titleEl = document.getElementById('pageTitle');
  if (titleEl && categoryDisplayNames[filterState.category]) {
    titleEl.textContent = categoryDisplayNames[filterState.category];
  }
}

// ==================== UPDATE HEADER COUNTS ====================
function updateHeaderCounts() {
  const updateBadge = (id, count) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = count;
      el.classList.toggle("hidden", count === 0);
    }
  };
  const cartTotal = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  updateBadge("cartCount", cartTotal);
  updateBadge("wishlistCount", wishlist.length);
}

// ==================== WISHLIST ====================
function toggleWishlist(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;

  const index = wishlist.findIndex(item => item.id === id);

  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1);
    showToast("Removed from wishlist ♥");
  } else {
    // Add with correct format
    const wishlistItem = {
      id: product.id,
      name: product.title.split(' (')[0].trim(),
      price: product.price,
      originalPrice: product.originalPrice || null,
      image: product.image
    };
    wishlist.push(wishlistItem);
    showToast("Added to wishlist ♥");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateHeaderCounts();
  renderProducts(); // Update heart icon
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.className = "fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full z-50 shadow-lg";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// ==================== PRODUCT CARD ====================
function createProductCard(p) {
  const inWishlist = wishlist.some(x => x.id === p.id);
  const isOutOfStock = !p.inStock;

  return `
    <div class="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100
                ${isOutOfStock ? 'opacity-60 grayscale cursor-not-allowed' : ''}"
         ${!isOutOfStock ? `onclick="event.stopPropagation(); viewProductDetails(${p.id})"` : ''}
         style="${isOutOfStock ? 'pointer-events: none;' : ''}">

      <div class="relative bg-blue-50 cursor-pointer aspect-[6/4] overflow-hidden">
        <img src="${p.image}" alt="${p.title}"
             class="w-full h-full object-contain p-5 transition-transform duration-500 ${!isOutOfStock ? 'group-hover:scale-110' : ''}">

        <div class="absolute top-2 left-2 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10
                    ${isOutOfStock ? 'bg-red-600' : 'bg-green-600'}">
          ${isOutOfStock ? 'Out of Stock' : 'In Stock'}
        </div>

        <button onclick="event.stopPropagation(); toggleWishlist(${p.id})"
                class="absolute top-2 right-2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center 
                       ${isOutOfStock ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'} transition-opacity z-10">
          <i class="${inWishlist ? 'fas fa-heart text-red-500' : 'far fa-heart text-gray-600'} text-lg"></i>
        </button>
      </div>

      <div class="p-3">
        <p class="text-xs text-gray-500 uppercase font-medium truncate">${p.brand || 'Brand'}</p>
        <h3 class="text-sm font-medium text-gray-800 line-clamp-2 mt-1">${p.title}</h3>

        <div class="mt-2 flex items-center gap-2">
          <span class="text-lg font-bold text-green-600">₹${p.price.toLocaleString()}</span>
          ${p.originalPrice > p.price ? `
            <span class="text-sm text-gray-500 line-through">₹${p.originalPrice.toLocaleString()}</span>
          ` : ''}
          ${p.discount ? `<span class="text-sm font-medium text-red-500">${p.discount}% OFF</span>` : ''}
        </div>

        <button onclick="event.stopPropagation(); viewProductDetails(${p.id})"
                class="mt-3 w-full font-medium text-sm py-2.5 rounded-lg transition
                        ${isOutOfStock 
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                          : 'bg-[#36C2CE] hover:bg-[#0a7272] text-white'}">
          ${isOutOfStock ? 'Out of Stock' : 'View Details'}
        </button>
      </div>
    </div>
  `;
}

// ==================== RENDERING ====================
function renderProducts() {
  const start = (currentPage - 1) * pageSize;
  const paginated = filteredProducts.slice(start, start + pageSize);
  const grid = document.getElementById("productsGrid");

  if (grid) {
    grid.innerHTML = paginated.length 
      ? paginated.map(createProductCard).join("")
      : `<p class="col-span-full text-center text-gray-500 py-10">No products found</p>`;
  }

  setText("resultsCount", `Showing ${filteredProducts.length} products`);
  updatePageTitle();
  renderPagination();
}

function renderPagination() {
  const container = document.getElementById("pagination");
  if (!container) return;
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  container.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-4 py-2 rounded border mx-1 ${i === currentPage ? 'bg-[#36C2CE] text-white' : 'bg-white text-blue-600 border-blue-300'}`;
    btn.onclick = () => { currentPage = i; renderProducts(); };
    container.appendChild(btn);
  }
}

// ==================== FILTER & SORT ====================
function applyFilters() {
  filteredProducts = allProducts.filter(p => {
    const catMatch = filterState.category === 'all' || p.category === filterState.category;
    const brandMatch = filterState.brand === 'all' || p.brand === filterState.brand;
    const discMatch = p.discount >= filterState.discount;
    const priceMatch = p.price >= filterState.minPrice && p.price <= filterState.maxPrice;
    return catMatch && brandMatch && discMatch && priceMatch;
  });

  sortProducts(filterState.sort);
  currentPage = 1;
  renderProducts();
  saveFiltersToStorage();
}

function sortProducts(type) {
  switch (type) {
    case 'price-low': filteredProducts.sort((a, b) => a.price - b.price); break;
    case 'price-high': filteredProducts.sort((a, b) => b.price - a.price); break;
    case 'rating': filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
    case 'newest': filteredProducts.sort((a, b) => b.id - a.id); break;
    default: break;
  }
}

function loadFiltersFromStorage() {
  try {
    const saved = localStorage.getItem('lifestyleFilters');
    if (saved) filterState = { ...filterState, ...JSON.parse(saved) };
  } catch (e) { console.error("Failed to load filters", e); }
}

function saveFiltersToStorage() {
  localStorage.setItem('lifestyleFilters', JSON.stringify(filterState));
}

// ==================== PRICE SLIDERS ====================
function initPriceSliders() {
  // Desktop sliders
  const desktopContainer = document.querySelector("#filterSidebar .price-slider-container");
  if (desktopContainer) {
    const minThumb = desktopContainer.querySelector('#minThumb');
    const maxThumb = desktopContainer.querySelector('#maxThumb');
    const fill = desktopContainer.querySelector('#desktopFill');
    const minVal = desktopContainer.querySelector('#minValue');
    const maxVal = desktopContainer.querySelector('#maxValue');
    
    const updateDesktop = (minP, maxP) => {
      const minPct = (minP / 5000) * 100;
      const maxPct = (maxP / 5000) * 100;
      if (fill) {
        fill.style.left = minPct + "%";
        fill.style.width = (maxPct - minPct) + "%";
      }
      if (minVal) minVal.textContent = `₹${minP.toLocaleString()}`;
      if (maxVal) maxVal.textContent = `₹${maxP.toLocaleString()}`;
      filterState.minPrice = minP;
      filterState.maxPrice = maxP;
    };

    if (minThumb && maxThumb) {
      minThumb.addEventListener("input", () => {
        let val = parseInt(minThumb.value);
        if (val > parseInt(maxThumb.value)) val = parseInt(maxThumb.value);
        updateDesktop(val, parseInt(maxThumb.value));
        applyFilters();
      });

      maxThumb.addEventListener("input", () => {
        let val = parseInt(maxThumb.value);
        if (val < parseInt(minThumb.value)) val = parseInt(minThumb.value);
        updateDesktop(parseInt(minThumb.value), val);
        applyFilters();
      });

      updateDesktop(filterState.minPrice, filterState.maxPrice);
    }
  }

  // Mobile sliders
  const mobileContainer = document.querySelector("#filterSheet .price-slider-container");
  if (mobileContainer) {
    const minThumb = mobileContainer.querySelector('#mobileMinThumb');
    const maxThumb = mobileContainer.querySelector('#mobileMaxThumb');
    const fill = mobileContainer.querySelector('#mobileFill');
    const minVal = mobileContainer.querySelector('#mobileMinValue');
    const maxVal = mobileContainer.querySelector('#mobileMaxValue');
    
    const updateMobile = (minP, maxP) => {
      const minPct = (minP / 5000) * 100;
      const maxPct = (maxP / 5000) * 100;
      if (fill) {
        fill.style.left = minPct + "%";
        fill.style.width = (maxPct - minPct) + "%";
      }
      if (minVal) minVal.textContent = `₹${minP.toLocaleString()}`;
      if (maxVal) maxVal.textContent = `₹${maxP.toLocaleString()}`;
      filterState.minPrice = minP;
      filterState.maxPrice = maxP;
    };

    if (minThumb && maxThumb) {
      minThumb.addEventListener("input", () => {
        let val = parseInt(minThumb.value);
        if (val > parseInt(maxThumb.value)) val = parseInt(maxThumb.value);
        updateMobile(val, parseInt(maxThumb.value));
      });

      maxThumb.addEventListener("input", () => {
        let val = parseInt(maxThumb.value);
        if (val < parseInt(minThumb.value)) val = parseInt(minThumb.value);
        updateMobile(parseInt(minThumb.value), val);
      });

      updateMobile(filterState.minPrice, filterState.maxPrice);
    }
  }
}

// ==================== FILTER INITIALIZATION ====================
function initFiltersAndUI() {
  loadFiltersFromStorage();

  // Desktop filters
  document.querySelectorAll('#filterForm input[name="category"], #filterForm input[name="brand"], #filterForm input[name="discount"]').forEach(input => {
    if ((input.name === "category" && input.value === filterState.category) ||
        (input.name === "brand" && input.value === filterState.brand) ||
        (input.name === "discount" && parseInt(input.value) === filterState.discount)) {
      input.checked = true;
    }

    input.addEventListener('change', () => {
      if (input.name === "category") filterState.category = input.value;
      if (input.name === "brand") filterState.brand = input.value;
      if (input.name === "discount") filterState.discount = parseInt(input.value);
      applyFilters();
    });
  });

  // Mobile filters change listeners
  document.querySelectorAll('#mobileFilterForm input[name="mobileCategory"], #mobileFilterForm input[name="mobileBrand"], #mobileFilterForm input[name="mobileDiscount"]').forEach(input => {
    if ((input.name === "mobileCategory" && input.value === filterState.category) ||
        (input.name === "mobileBrand" && input.value === filterState.brand) ||
        (input.name === "mobileDiscount" && parseInt(input.value) === filterState.discount)) {
      input.checked = true;
    }
  });

  // Apply desktop filters button
  document.getElementById("applyDesktopFilters")?.addEventListener("click", () => {
    const cat = document.querySelector('#filterForm input[name="category"]:checked')?.value || 'all';
    const brd = document.querySelector('#filterForm input[name="brand"]:checked')?.value || 'all';
    const disc = parseInt(document.querySelector('#filterForm input[name="discount"]:checked')?.value || 0);
    filterState.category = cat; filterState.brand = brd; filterState.discount = disc;
    applyFilters();
  });

  // Apply mobile filters button
  document.getElementById("applyMobileFilters")?.addEventListener("click", () => {
    const cat = document.querySelector('#filterSheet input[name="mobileCategory"]:checked')?.value || 'all';
    const brd = document.querySelector('#filterSheet input[name="mobileBrand"]:checked')?.value || 'all';
    const disc = parseInt(document.querySelector('#filterSheet input[name="mobileDiscount"]:checked')?.value || 0);
    filterState.category = cat; filterState.brand = brd; filterState.discount = disc;
    applyFilters();
    document.getElementById("filterSheet").classList.add("translate-y-full");
    document.getElementById("mobileSheetBackdrop").classList.add("hidden");
  });

  // Clear filters
  document.getElementById("clearMobileFilters")?.addEventListener("click", () => {
    filterState = { category: 'all', brand: 'all', discount: 0, minPrice: 0, maxPrice: 5000, sort: 'default' };
    localStorage.removeItem("lifestyleFilters");
    
    // Reset all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(r => {
      r.checked = (r.value === 'all' || r.value === '0');
    });
    
    // Reset sort select
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) sortSelect.value = 'default';
    
    initPriceSliders();
    applyFilters();
  });

  // Sort select
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.value = filterState.sort;
    sortSelect.addEventListener("change", (e) => {
      filterState.sort = e.target.value;
      sortProducts(filterState.sort);
      renderProducts();
      saveFiltersToStorage();
    });
  }

  // Apply sort button (mobile)
  document.getElementById("applySortBtn")?.addEventListener("click", () => {
    const selectedSort = document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';
    if (sortSelect) {
      sortSelect.value = selectedSort;
      filterState.sort = selectedSort;
      sortProducts(filterState.sort);
      renderProducts();
      saveFiltersToStorage();
    }
    document.getElementById("sortSheet").classList.add("translate-y-full");
    document.getElementById("mobileSheetBackdrop").classList.add("hidden");
  });

  applyFilters();
}

// ==================== VIEW PRODUCT DETAILS ====================
function viewProductDetails(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  
  if (!product.inStock) {
    alert('This product is currently out of stock. Please check back later.');
    return;
  }

  // Store data for product details page
  sessionStorage.setItem('selectedProduct', JSON.stringify(product));
  sessionStorage.setItem('currentPageProducts', JSON.stringify(allProducts));
  sessionStorage.setItem('currentPageName', 'Lifestyle Disorder');

  const params = new URLSearchParams({
    id: product.id,
    name: product.title,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice || '',
    discount: product.discount || '',
    image: product.image,
    description: product.description || '',
    category: product.category || '',
    inStock: product.inStock,
    sourcePage: 'Lifestyle Disorder'
  });

  window.location.href = `/productdetails.html?${params.toString()}`;
}

// ==================== BANNER ====================
function initBanner() {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');
  let i = 0;
  
  const go = (n) => {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active');
    dots[i].classList.add('active');
  };
  
  dots.forEach((d, idx) => d.onclick = () => go(idx));
  setInterval(() => go(i + 1), 5000);
}

// ==================== MOBILE SHEETS ====================
function initMobileSheets() {
  const backdrop = document.getElementById("mobileSheetBackdrop");
  
  // Open Filter Sheet
  document.getElementById("openFilterSheet")?.addEventListener("click", () => {
    document.getElementById("filterSheet").classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  });
  
  // Open Sort Sheet
  document.getElementById("openSortSheet")?.addEventListener("click", () => {
    document.getElementById("sortSheet").classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  });
  
  // Close sheets
  document.querySelectorAll("#closeFilterSheet, #closeSortSheet, #mobileSheetBackdrop").forEach(el => {
    el?.addEventListener("click", () => {
      document.getElementById("filterSheet").classList.add("translate-y-full");
      document.getElementById("sortSheet").classList.add("translate-y-full");
      backdrop.classList.add("hidden");
    });
  });
}

// ==================== ON LOAD ====================
document.addEventListener("DOMContentLoaded", () => {
  initBanner();
  initMobileSheets();
  initPriceSliders();
  initFiltersAndUI();
  renderProducts();
  updateHeaderCounts();
});