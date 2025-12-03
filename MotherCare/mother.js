// ==================== mother.js – FULLY WORKING 2025 (FIXED FILTERS + CART + WISHLIST) ====================

const allProducts = [
  { id: 101, title: "Pregnancy Support Belt", price: 1899, originalPrice: 2799, discount: 32, rating: 4.7, reviewCount: 342,
    mainImageUrl: "https://images.ctfassets.net/6m9bd13t776q/rFI3XJ5p1H6IwgK5ghgVg/0eee38fb45aa78a5953012f881fa56cb/AZMED_Maternity_Belly_Band.webp?q=75",
    description: "Adjustable belt for back & pelvic pain relief", category: "Accessories & Maternity Wear", brand: "BabyHug" },
  { id: 102, title: "Organic Stretch Mark Cream 200ml", price: 1399, originalPrice: 1999, discount: 30, rating: 4.9, reviewCount: 628,
    mainImageUrl: "https://whatisg.com/upload-img/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2_B/B21/B21.jpg",
    description: "Cocoa + Shea butter for deep moisturizing", category: "Skin Care", brand: "Himalaya" },
  { id: 103, title: "Wireless Wearable Breast Pump", price: 8999, originalPrice: 12999, discount: 31, rating: 4.6, reviewCount: 512,
    mainImageUrl: "https://cdn.thewirecutter.com/wp-content/media/2023/07/wearables-2048px-00733.jpg?auto=webp&quality=75&width=1024",
    description: "Silent & hands-free double pump", category: "Breastfeeding Essentials", brand: "MomCozy" },
  { id: 104, title: "Frida Mom Postpartum Recovery Kit", price: 2999, originalPrice: 4499, discount: 33, rating: 5.0, reviewCount: 298,
    mainImageUrl: "https://m.media-amazon.com/images/I/71--+1HIx9L._AC_UF1000,1000_QL80_.jpg",
    description: "Peri bottle, pads, underwear – full recovery kit", category: "Post delivery recovery", brand: "Frida Mom" },
  { id: 105, title: "Maternity Nursing Night Dress (Set of 2)", price: 2299, originalPrice: 3499, discount: 34, rating: 4.5, reviewCount: 421,
    mainImageUrl: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/858eec81-34e8-48a5-9b42-a352b7c574a3.__CR0,0,600,450_PT0_SX600_V1___.jpg",
    description: "Super soft cotton with easy feeding access", category: "Accessories & Maternity Wear", brand: "MeeMee" },
  { id: 106, title: "Prenatal DHA Gummies (90 pcs)", price: 1699, originalPrice: 2499, discount: 32, rating: 4.8, reviewCount: 734,
    mainImageUrl: "https://i5.walmartimages.com/seo/Vitafusion-PreNatal-Multivitamin-Adult-Gummies-90-Count-Each_aca58a81-e751-4609-8572-8c564c8fb43c.68ae348332bf6f260270d093da1c06d6.jpeg",
    description: "Tasty lemon-orange vegetarian gummies", category: "Vitamins & Supplements", brand: "Himalaya" },
  { id: 107, title: "Bamboo Nursing Pads (8 pcs)", price: 799, originalPrice: 1499, discount: 47, rating: 4.7, reviewCount: 892,
    mainImageUrl: "https://m.media-amazon.com/images/I/81I2-SQLZgL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg",
    description: "Reusable, ultra-absorbent & eco-friendly", category: "Breastfeeding Essentials", brand: "Pampers" },
  { id: 108, title: "Hospital Delivery Gown + Robe", price: 2599, originalPrice: 3799, discount: 31, rating: 4.8, reviewCount: 267,
    mainImageUrl: "https://i.etsystatic.com/5569502/r/il/b20c07/1273813891/il_fullxfull.1273813891_2v51.jpg",
    description: "Stylish gown with skin-to-skin access", category: "Delivery Kits", brand: "BabyHug" },
  { id: 109, title: "Postpartum Belly Binder", price: 1799, originalPrice: 2999, discount: 40, rating: 4.6, reviewCount: 389,
    mainImageUrl: "https://images.ctfassets.net/6m9bd13t776q/4bcjNqTEcQmakkMJbjvHjd/9e36feb025efc9c50ff986c58a4ec8b6/BOTB_postpartum_belly_wraps-testimonial_collage-2025.png?q=75",
    description: "Supports core recovery after delivery", category: "Post delivery recovery", brand: "The Moms Co" },
  { id: 110, title: "MomCozy S12 Pro Double Pump", price: 11999, originalPrice: 16999, discount: 29, rating: 4.9, reviewCount: 981,
    mainImageUrl: "https://m.media-amazon.com/images/I/611fWRc4VaL._AC_UF894,1000_QL80_.jpg",
    description: "App-controlled wearable double pump", category: "Breastfeeding Essentials", brand: "MomCozy" },
  { id: 111, title: "Garbhsanskar Music & Book Combo", price: 1299, originalPrice: 1999, discount: 35, rating: 4.9, reviewCount: 156,
    mainImageUrl: "https://dreambabygarbhsanskar.com/wp-content/uploads/2024/06/IMG_20240604_192656_887-1568x1151.jpg",
    description: "Classical music + pregnancy journal", category: "Garbhsanskar Essentials & Ayurvedic Medicines", brand: "Himalaya" },
  { id: 112, title: "Trimester 1 Nutrition Kit", price: 3499, originalPrice: 4999, discount: 30, rating: 4.8, reviewCount: 189,
    mainImageUrl: "https://madsfood.com/wp-content/uploads/2025/05/Trimester-1-scaled.jpg",
    description: "Folic acid, DHA, nausea bands & journal", category: "Trimester Kits", brand: "The Moms Co" },
  { id: 113, title: "Pregnancy Test Kit (Pack of 2)", price: 499, originalPrice: 699, discount: 28, rating: 4.5, reviewCount: 450,
    mainImageUrl: "https://m.media-amazon.com/images/I/51+XFIK04SL._AC_UF1000,1000_QL80_.jpg",
    description: "Accurate home pregnancy test", category: "Test Kits", brand: "Clearblue" },
  { id: 114, title: "Maternity Pads (20 pcs)", price: 299, originalPrice: 499, discount: 40, rating: 4.6, reviewCount: 320,
    mainImageUrl: "https://m.media-amazon.com/images/I/71K6LOSGUbL._AC_UF894,1000_QL80_.jpg",
    description: "Ultra absorbent pads for maternity", category: "Personal Care & Hygiene", brand: "Stayfree" },
  { id: 115, title: "Hospital Delivery Kit", price: 1999, originalPrice: 2999, discount: 33, rating: 4.7, reviewCount: 210,
    mainImageUrl: "https://m.media-amazon.com/images/I/81LobEPplZL._AC_UF894,1000_QL80_.jpg",
    description: "Complete kit for hospital delivery", category: "Delivery Kits", brand: "Frida Mom" },
  { id: 116, title: "Postpartum Wash Bottle", price: 799, originalPrice: 1199, discount: 33, rating: 4.8, reviewCount: 560,
    mainImageUrl: "https://images.ctfassets.net/6m9bd13t776q/1gySuwPcBzOc2sZT4EbrOt/5fe0da8b79db59545908ae8c6a6a2619/how_to_use_a_peri_bottle-hero.webp?w=1122",
    description: "Perineal cleansing bottle", category: "Postpartum Hygiene", brand: "Frida Mom" },
  { id: 117, title: "Postpartum Vitamin Supplements", price: 1499, originalPrice: 2199, discount: 32, rating: 4.7, reviewCount: 280,
    mainImageUrl: "https://m.media-amazon.com/images/I/71Ob6kPtKzL._AC_UF1000,1000_QL80_.jpg",
    description: "Nutrients for recovery and breastfeeding", category: "Postpartum Nutrition", brand: "The Moms Co" },
  { id: 118, title: "Cooling Pads for Pain Relief", price: 599, originalPrice: 899, discount: 33, rating: 4.6, reviewCount: 340,
    mainImageUrl: "https://m.media-amazon.com/images/I/71JypK4eeQL._AC_UF1000,1000_QL80_.jpg",
    description: "Soothing pads for perineal pain", category: "Pain & Healing Support", brand: "Tucks" },
  { id: 119, title: "Uterine Tonic Syrup", price: 899, originalPrice: 1299, discount: 31, rating: 4.5, reviewCount: 180,
    mainImageUrl: "https://m.media-amazon.com/images/I/510ElZrGCJL._AC_UF1000,1000_QL80_.jpg",
    description: "Ayurvedic tonic for uterine health", category: "Uterine Health", brand: "Himalaya" },
  { id: 120, title: "Organic Sanitary Pads (Pack of 12)", price: 399, originalPrice: 599, discount: 33, rating: 4.8, reviewCount: 420,
    mainImageUrl: "https://us-i.makeupstore.com/z/zm/zmgocr1xtlqr.jpg",
    description: "Eco-friendly menstrual pads", category: "Menstruation Essentials and Hygiene", brand: "Natracare" },
  { id: 121, title: "PCOS Support Supplement", price: 1599, originalPrice: 2299, discount: 30, rating: 4.7, reviewCount: 250,
    mainImageUrl: "https://m.media-amazon.com/images/I/71ftBtJSinL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg",
    description: "Natural supplement for PCOS management", category: "PCOS and Preconception", brand: "Myo-Inositol" },
  { id: 122, title: "Menopause Relief Capsules", price: 1299, originalPrice: 1899, discount: 32, rating: 4.6, reviewCount: 310,
    mainImageUrl: "https://m.media-amazon.com/images/I/41j6i9EfrHL.jpg",
    description: "Herbal relief for menopause symptoms", category: "MenoPausal Medicines", brand: "Black Cohosh" }
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
  maxPrice: 10000,
  sort: 'default'
};

// Helper: Safe text update
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
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

// ==================== CART & WISHLIST ====================
function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateHeaderCounts();        // INSTANT UPDATE
  showToast("Added to Cart");
}
// TOGGLE WISHLIST – Instant update + re-render heart
function toggleWishlist(id) {
  const index = wishlist.findIndex(p => p.id === id);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    const product = allProducts.find(p => p.id === id);
    if (product) wishlist.push(product);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateHeaderCounts();        // INSTANT UPDATE
  renderProducts();            // Update heart icon immediately
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

  return `
    <div class="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
         onclick="event.stopPropagation(); viewProductDetails(${p.id})">

      <div class="cursor-pointer relative bg-gray-50 aspect-[6/4] overflow-hidden">
        <img src="${p.mainImageUrl}" alt="${p.title}"
             class="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-110">

        ${p.discount ? `<div class="absolute top-2 left-2 bg-[#F5AFAF] text-white text-xs font-bold px-2 py-1 rounded">${p.discount}% OFF</div>` : ''}

        <button onclick="event.stopPropagation(); toggleWishlist(${p.id})"
                class="absolute top-2 right-2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <i class="${inWishlist ? 'fas fa-heart text-pink-600' : 'far fa-heart text-gray-600'} text-lg"></i>
        </button>
      </div>

      <div class="p-3">
        <p class="text-xs text-gray-500 uppercase font-medium truncate">${p.brand || 'Brand'}</p>
        <h3 class="text-sm font-medium text-gray-800 line-clamp-2 mt-1">${p.title}</h3>

        <div class="mt-2 flex items-center gap-2">
          <span class="text-lg font-bold text-gray-900">₹${p.price.toLocaleString()}</span>
          ${p.originalPrice > p.price ? `
            <span class="text-sm text-gray-500 line-through">₹${p.originalPrice.toLocaleString()}</span>
            <span class="text-sm font-bold text-green-600">${p.discount}% off</span>
          ` : ''}
        </div>

        <button onclick="event.stopPropagation(); addToCart(${p.id})"
                class="mt-3 w-full bg-[#E0A8A8] hover:bg-[#] text-white font-medium text-sm py-2.5 rounded-lg transition">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// ==================== RENDERING ====================
// Rendering
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
    btn.className = `px-4 py-2 rounded border mx-1 ${i === currentPage ? 'bg-[#9A3F3F] text-white' : 'bg-blue text-pink-600'}`;
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
    case 'rating': filteredProducts.sort((a, b) => b.rating - a.rating); break;
    case 'newest': filteredProducts.sort((a, b) => b.id - a.id); break;
    default: break;
  }
}

// Load & Save Filters
function loadFiltersFromStorage() {
  try {
    const saved = localStorage.getItem('motherCareFilters');
    if (saved) filterState = { ...filterState, ...JSON.parse(saved) };
  } catch (e) { console.error("Failed to load filters", e); }
}

function saveFiltersToStorage() {
  localStorage.setItem('motherCareFilters', JSON.stringify(filterState));
}

// ==================== PRICE SLIDERS ====================
function initPriceSliders() {
  const sliders = [
    { min: document.getElementById("minThumb"), max: document.getElementById("maxThumb"), fill: document.getElementById("desktopFill"), minVal: document.getElementById("minValue"), maxVal: document.getElementById("maxValue") },
    { min: document.getElementById("mobileMinThumb"), max: document.getElementById("mobileMaxThumb"), fill: document.getElementById("mobileFill"), minVal: document.getElementById("mobileMinValue"), maxVal: document.getElementById("mobileMaxValue") }
  ];

  const maxRange = 10000;

  function updateAll(minP, maxP) {
    const minPct = (minP / maxRange) * 100;
    const maxPct = (maxP / maxRange) * 100;

    sliders.forEach(s => {
      if (s.min && s.max) {
        s.min.value = minP; s.max.value = maxP;
        s.minVal.textContent = `₹${minP.toLocaleString()}`;
        s.maxVal.textContent = `₹${maxP.toLocaleString()}`;
        s.fill.style.left = minPct + "%";
        s.fill.style.width = (maxPct - minPct) + "%";
      }
    });

    filterState.minPrice = minP;
    filterState.maxPrice = maxP;
    applyFilters();
  }

  sliders.forEach(s => {
    if (!s.min || !s.max) return;
    s.min.addEventListener("input", () => {
      let val = parseInt(s.min.value);
      if (val > parseInt(s.max.value)) val = parseInt(s.max.value);
      updateAll(val, parseInt(s.max.value));
    });
    s.max.addEventListener("input", () => {
      let val = parseInt(s.max.value);
      if (val < parseInt(s.min.value)) val = parseInt(s.min.value);
      updateAll(parseInt(s.min.value), val);
    });
  });

  updateAll(filterState.minPrice, filterState.maxPrice);
}

// ==================== FILTER INITIALIZATION ====================
function initFiltersAndUI() {
  loadFiltersFromStorage();

  document.querySelectorAll('input[name="category"], input[name="brand"], input[name="discount"]').forEach(input => {
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

  document.getElementById("applyMobileFilters")?.addEventListener("click", () => {
    const cat = document.querySelector('#filterSheet input[name="category"]:checked')?.value || 'all';
    const brd = document.querySelector('#filterSheet input[name="brand"]:checked')?.value || 'all';
    const disc = parseInt(document.querySelector('#filterSheet input[name="discount"]:checked')?.value || 0);
    filterState.category = cat; filterState.brand = brd; filterState.discount = disc;
    applyFilters();
    document.getElementById("filterSheet").classList.add("translate-y-full");
    document.getElementById("mobileSheetBackdrop").classList.add("hidden");
  });

  document.getElementById("clearMobileFilters")?.addEventListener("click", () => {
    filterState = { category: 'all', brand: 'all', discount: 0, minPrice: 0, maxPrice: 10000, sort: 'default' };
    localStorage.removeItem("motherCareFilters");
    document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = (r.value === 'all' || r.value === '0'));
    if (sortSelect) sortSelect.value = 'default';
    initPriceSliders();
    applyFilters();
  });

  applyFilters();
}

// ==================== OTHER FUNCTIONS ====================
function viewProductDetails(id) {
  localStorage.setItem("selectedProductId", id);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  window.location.href = "mother-product-details.html";
}

function initBanner() {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');
  let i = 0;
  const go = (n) => {
    slides[i].classList.remove('active'); dots[i].classList.remove('active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active'); dots[i].classList.add('active');
  };
  dots.forEach((d, idx) => d.onclick = () => go(idx));
  setInterval(() => go(i + 1), 5000);
}

function initMobileSheets() {
  const backdrop = document.getElementById("mobileSheetBackdrop");
  document.getElementById("openFilterSheet")?.addEventListener("click", () => {
    document.getElementById("filterSheet").classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  });
  document.getElementById("openSortSheet")?.addEventListener("click", () => {
    document.getElementById("sortSheet").classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  });
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
  loadHeader();
  loadFooter();
  initBanner();
  initMobileSheets();
  initPriceSliders();
  initFiltersAndUI();
  renderProducts();
  updateHeaderCounts();
});