// ==================== fertility.js – FERTILITY ESSENTIALS PRODUCTS ====================

const allProducts = [
  // Male Infertility
  { 
    id: 1, 
    title: "Shilajit Gold Capsules (60 caps)", 
    price: 450, 
    originalPrice: 600, 
    discount: 25, 
    rating: 4.5, 
    reviewCount: 2350,
    category: "male", 
    brand: "Dabur", 
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
    description: "Pure Shilajit extract for male vitality and reproductive health. Improves sperm count and quality naturally.",
    inStock: true,
    sku: "FSHILAJIT001"
  },
  { 
    id: 5, 
    title: "Maca Root Powder 200g", 
    price: 520, 
    originalPrice: 650, 
    discount: 20, 
    rating: 4.6, 
    reviewCount: 1670,
    category: "male", 
    brand: "Charak", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
    description: "Natural supplement from Peruvian maca root for male fertility and energy. Enhances libido and stamina.",
    inStock: true,
    sku: "FMACA001"
  },
  { 
    id: 6, 
    title: "Tribulus Terrestris (60 caps)", 
    price: 350, 
    originalPrice: 450, 
    discount: 22, 
    rating: 4.4, 
    reviewCount: 1890,
    category: "male", 
    brand: "Himalaya", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
    description: "Herbal supplement for male reproductive health and libido. Increases testosterone levels naturally.",
    inStock: false,
    sku: "FTRIB001"
  },
  { 
    id: 9, 
    title: "Zinc + Selenium (60 caps)", 
    price: 420, 
    originalPrice: 550, 
    discount: 24, 
    rating: 4.3, 
    reviewCount: 1560,
    category: "male", 
    brand: "Charak", 
    image: "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=400&h=400&fit=crop",
    description: "Essential minerals for sperm health and motility. Improves male fertility and reproductive function.",
    inStock: true,
    sku: "FZINC001"
  },
  { 
    id: 14, 
    title: "Safed Musli Powder 100g", 
    price: 330, 
    originalPrice: 440, 
    discount: 25, 
    rating: 4.4, 
    reviewCount: 1340,
    category: "male", 
    brand: "Baidyanath", 
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
    description: "Natural aphrodisiac and energy booster. Improves male fertility and sexual performance.",
    inStock: true,
    sku: "FMUSLI001"
  },

  // Female Infertility
  { 
    id: 2, 
    title: "Folic Acid Tablets (30 tabs)", 
    price: 280, 
    originalPrice: 350, 
    discount: 20, 
    rating: 4.2, 
    reviewCount: 1870,
    category: "female", 
    brand: "Zandu", 
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    description: "Essential vitamin B9 for female reproductive health and fetal development. Supports ovulation and egg quality.",
    inStock: true,
    sku: "FFOLIC001"
  },
  { 
    id: 4, 
    title: "Shatavari Tablets (100 tabs)", 
    price: 380, 
    originalPrice: 500, 
    discount: 24, 
    rating: 4.3, 
    reviewCount: 1560,
    category: "female", 
    brand: "Baidyanath", 
    image: "https://images.unsplash.com/photo-1599932887768-d6cb80133949?w=400&h=400&fit=crop",
    description: "Ayurvedic herb for female reproductive system support. Regulates menstrual cycle and improves fertility.",
    inStock: true,
    sku: "FSHAT001"
  },
  { 
    id: 7, 
    title: "Chasteberry Capsules (90 caps)", 
    price: 290, 
    originalPrice: 380, 
    discount: 24, 
    rating: 4.1, 
    reviewCount: 1230,
    category: "female", 
    brand: "Zandu", 
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    description: "Herbal support for female hormonal balance. Regulates menstrual cycle and supports fertility.",
    inStock: true,
    sku: "FCHAST001"
  },
  { 
    id: 10, 
    title: "Fertility Multivitamin (60 tabs)", 
    price: 580, 
    originalPrice: 750, 
    discount: 23, 
    rating: 4.8, 
    reviewCount: 2450,
    category: "female", 
    brand: "Himalaya", 
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    description: "Comprehensive vitamin formula for female fertility. Provides essential nutrients for reproductive health.",
    inStock: true,
    sku: "FMVIT001"
  },
  { 
    id: 12, 
    title: "CoQ10 Supplements (60 caps)", 
    price: 650, 
    originalPrice: 850, 
    discount: 24, 
    rating: 4.7, 
    reviewCount: 1890,
    category: "female", 
    brand: "Charak", 
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    description: "Antioxidant support for egg quality and fertility. Improves ovarian function and egg health.",
    inStock: true,
    sku: "FCOQ10001"
  },
  { 
    id: 13, 
    title: "Vitamin E Capsules (30 caps)", 
    price: 180, 
    originalPrice: 240, 
    discount: 25, 
    rating: 4.2, 
    reviewCount: 1670,
    category: "female", 
    brand: "Dabur", 
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    description: "Antioxidant support for reproductive health. Protects eggs and improves uterine lining.",
    inStock: true,
    sku: "FVITE001"
  },
  { 
    id: 15, 
    title: "Red Clover Tea (25 bags)", 
    price: 220, 
    originalPrice: 290, 
    discount: 24, 
    rating: 4.1, 
    reviewCount: 980,
    category: "female", 
    brand: "Himalaya", 
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    description: "Herbal tea for hormonal balance. Supports menstrual regularity and reproductive health.",
    inStock: false,
    sku: "FREDCL001"
  },

  // Ayurvedic Supplements
  { 
    id: 3, 
    title: "Ashwagandha Capsules (60 caps)", 
    price: 320, 
    originalPrice: 400, 
    discount: 20, 
    rating: 4.7, 
    reviewCount: 2780,
    category: "ayurvedic", 
    brand: "Himalaya", 
    image: "https://images.unsplash.com/photo-1550572017-4876b7788da6?w=400&h=400&fit=crop",
    description: "Adaptogenic herb for stress relief and fertility support. Balances hormones and improves reproductive health.",
    inStock: false,
    sku: "FASHWA001"
  },
  { 
    id: 8, 
    title: "Gokshura Tablets (80 tabs)", 
    price: 310, 
    originalPrice: 410, 
    discount: 24, 
    rating: 4.5, 
    reviewCount: 1450,
    category: "ayurvedic", 
    brand: "Dabur", 
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
    description: "Ayurvedic herb for male and female reproductive health. Supports urinary and reproductive functions.",
    inStock: true,
    sku: "FGOKSH001"
  },
  { 
    id: 11, 
    title: "Kapikacchu Churna 100g", 
    price: 270, 
    originalPrice: 360, 
    discount: 25, 
    rating: 4.0, 
    reviewCount: 1120,
    category: "ayurvedic", 
    brand: "Baidyanath", 
    image: "https://images.unsplash.com/photo-1599932887768-d6cb80133949?w=400&h=400&fit=crop",
    description: "Traditional Ayurvedic powder for reproductive health. Improves vitality and supports fertility.",
    inStock: false,
    sku: "FKAPI001"
  },
  { 
    id: 16, 
    title: "Fenugreek Seeds 200g", 
    price: 150, 
    originalPrice: 200, 
    discount: 25, 
    rating: 4.3, 
    reviewCount: 2340,
    category: "ayurvedic", 
    brand: "Zandu", 
    image: "https://images.unsplash.com/photo-1599932887768-d6cb80133949?w=400&h=400&fit=crop",
    description: "Natural supplement for libido and vitality. Supports reproductive health in both men and women.",
    inStock: true,
    sku: "FFENU001"
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
  maxPrice: 3000,
  sort: 'default'
};

// Category Display Names
const categoryDisplayNames = {
  'all': 'All Fertility Products',
  'male': 'Male Fertility Support',
  'female': 'Female Fertility Support',
  'ayurvedic': 'Ayurvedic Fertility Supplements',
  'vitamins': 'Vitamins & Minerals',
  'herbal': 'Herbal Teas & Powders'
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
    showToast("Removed from wishlist ♥", "info");
  } else {
    // Add with correct format
    const wishlistItem = {
      id: product.id,
      name: product.title.split(' (')[0].trim(),
      price: product.price,
      originalPrice: product.originalPrice || null,
      image: product.image,
      brand: product.brand,
      sku: product.sku,
      description: product.description
    };
    wishlist.push(wishlistItem);
    showToast("Added to wishlist ♥", "success");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateHeaderCounts();
  renderProducts(); // Update heart icon
}

function showToast(msg, type = "success") {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.className = `fixed bottom-20 left-1/2 -translate-x-1/2 ${type === 'success' ? 'bg-green-500' : 'bg-blue-500'} text-white px-6 py-3 rounded-full z-50 shadow-lg`;
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

        <div class="flex items-center mt-2">
          <div class="flex text-yellow-400">
            ${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5-Math.floor(p.rating))}
          </div>
          <span class="text-xs text-gray-500 ml-2">(${p.reviewCount})</span>
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
    const saved = localStorage.getItem('fertilityFilters');
    if (saved) filterState = { ...filterState, ...JSON.parse(saved) };
  } catch (e) { console.error("Failed to load filters", e); }
}

function saveFiltersToStorage() {
  localStorage.setItem('fertilityFilters', JSON.stringify(filterState));
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
      const minPct = (minP / 3000) * 100;
      const maxPct = (maxP / 3000) * 100;
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
      const minPct = (minP / 3000) * 100;
      const maxPct = (maxP / 3000) * 100;
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
    filterState = { category: 'all', brand: 'all', discount: 0, minPrice: 0, maxPrice: 3000, sort: 'default' };
    localStorage.removeItem("fertilityFilters");
    
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
  sessionStorage.setItem('currentPageName', 'Fertility Essentials');

  const params = new URLSearchParams({
    id: product.id,
    name: encodeURIComponent(product.title),
    brand: encodeURIComponent(product.brand),
    price: product.price,
    originalPrice: product.originalPrice || '',
    discount: product.discount || '',
    image: encodeURIComponent(product.image),
    description: encodeURIComponent(product.description),
    category: product.category || '',
    inStock: product.inStock,
    sku: product.sku,
    rating: product.rating || 4.0,
    reviewCount: product.reviewCount || 0,
    sourcePage: 'Fertility Essentials'
  });

  window.location.href = `../../productdetails.html?${params.toString()}`;
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