// ==================== wellness.js – WELLNESS ESSENTIALS PAGE ====================

// Using your existing wellness products array (16 products)
const allProducts = [
  {
    "sku": "WVITC001",
    "title": "Vitamin C 1000mg Effervescent",
    "productPrice": 399,
    "productOldPrice": 499,
    "discount": 20,
    "productRating": 4.5,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    "description": "High strength Vitamin C effervescent tablets for immunity boost and antioxidant support.",
    "category": "vitamins",
    "brand": "Himalaya",
    "inStock": true,
    "id": 1
  },
  {
    "sku": "WHAIROIL001",
    "title": "Onion Hair Oil 200ml",
    "productPrice": 499,
    "productOldPrice": 649,
    "discount": 23,
    "productRating": 4.2,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    "description": "Onion extract enriched hair oil for hair growth, reduces hair fall and dandruff.",
    "category": "hairskin",
    "brand": "Dabur",
    "inStock": true,
    "id": 2
  },
  {
    "sku": "WFITPRO001",
    "title": "Whey Protein Isolate 1kg",
    "productPrice": 2199,
    "productOldPrice": 2799,
    "discount": 21,
    "productRating": 4.7,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    "description": "Premium whey protein isolate for muscle building and recovery. Chocolate flavor.",
    "category": "fitness",
    "brand": "MuscleBlaze",
    "inStock": true,
    "id": 3
  },
  {
    "sku": "WIMMU001",
    "title": "Chyawanprash 1kg",
    "productPrice": 399,
    "productOldPrice": 499,
    "discount": 20,
    "productRating": 4.3,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    "description": "Traditional Ayurvedic immunity booster with herbs and amla. Strengthens respiratory health.",
    "category": "immunity",
    "brand": "Dabur",
    "inStock": true,
    "id": 4
  },
  {
    "sku": "WSENIOR001",
    "title": "Adult Diapers Large (10 pcs)",
    "productPrice": 599,
    "productOldPrice": 799,
    "discount": 25,
    "productRating": 4.6,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    "description": "Super absorbent adult diapers for overnight protection. Soft and comfortable design.",
    "category": "senior",
    "brand": "Friends",
    "inStock": true,
    "id": 5
  },
  {
    "sku": "WORAL001",
    "title": "Herbal Toothpaste 150g",
    "productPrice": 119,
    "productOldPrice": 149,
    "discount": 20,
    "productRating": 4.4,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=400&h=400&fit=crop",
    "description": "Natural herbal toothpaste with neem and clove for complete oral care and fresh breath.",
    "category": "oral",
    "brand": "Himalaya",
    "inStock": true,
    "id": 6
  },
  {
    "sku": "WMENSTRUAL001",
    "title": "Ultra Thin Sanitary Pads XL",
    "productPrice": 299,
    "productOldPrice": 399,
    "discount": 25,
    "productRating": 4.1,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    "description": "Ultra thin sanitary pads with wings for heavy flow days. Super absorbent and comfortable.",
    "category": "menstrual",
    "brand": "Stayfree",
    "inStock": true,
    "id": 7
  },
  {
    "sku": "WOMEGA001",
    "title": "Omega-3 Fish Oil 1000mg",
    "productPrice": 749,
    "productOldPrice": 999,
    "discount": 25,
    "productRating": 4.5,
    "productStatus": "Out of Stock",
    "mainImageUrl": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    "description": "Pure fish oil supplements rich in EPA and DHA for heart, brain and joint health.",
    "category": "vitamins",
    "brand": "Zandu",
    "inStock": false,
    "id": 8
  },
  {
    "sku": "WSERUM001",
    "title": "Vitamin C Glow Face Serum",
    "productPrice": 899,
    "productOldPrice": 1199,
    "discount": 25,
    "productRating": 4.7,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    "description": "Brightening serum with Vitamin C and hyaluronic acid for radiant, even-toned skin.",
    "category": "hairskin",
    "brand": "Charak",
    "inStock": true,
    "id": 9
  },
  {
    "sku": "WFATBURN001",
    "title": "L-Carnitine Fat Burner",
    "productPrice": 899,
    "productOldPrice": 1199,
    "discount": 25,
    "productRating": 4.3,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    "description": "Fat burning supplement that helps convert fat into energy. Supports weight management.",
    "category": "fitness",
    "brand": "MuscleTech",
    "inStock": true,
    "id": 10
  },
  {
    "sku": "WGILOY001",
    "title": "Giloy Tulsi Juice 1L",
    "productPrice": 299,
    "productOldPrice": 399,
    "discount": 25,
    "productRating": 4.2,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
    "description": "Natural immunity booster juice with giloy and tulsi. Strengthens body's defense system.",
    "category": "immunity",
    "brand": "Himalaya",
    "inStock": true,
    "id": 11
  },
  {
    "sku": "WBP001",
    "title": "Digital BP Monitor",
    "productPrice": 1799,
    "productOldPrice": 2399,
    "discount": 25,
    "productRating": 4.8,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    "description": "Automatic digital blood pressure monitor with large display and memory function.",
    "category": "senior",
    "brand": "Omron",
    "inStock": true,
    "id": 12
  },
  {
    "sku": "WMOUTHWASH001",
    "title": "Mouthwash Alcohol Free 500ml",
    "productPrice": 249,
    "productOldPrice": 299,
    "discount": 17,
    "productRating": 4.3,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=400&h=400&fit=crop",
    "description": "Alcohol-free mouthwash for fresh breath and complete oral protection. Gentle on gums.",
    "category": "oral",
    "brand": "Zandu",
    "inStock": true,
    "id": 13
  },
  {
    "sku": "WMENCUP001",
    "title": "Reusable Menstrual Cup Large",
    "productPrice": 499,
    "productOldPrice": 649,
    "discount": 23,
    "productRating": 4.6,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    "description": "Medical grade silicone menstrual cup for eco-friendly period protection. Reusable for years.",
    "category": "menstrual",
    "brand": "Sirona",
    "inStock": true,
    "id": 14
  },
  {
    "sku": "WMULTIVIT001",
    "title": "Multivitamin for Men",
    "productPrice": 599,
    "productOldPrice": 799,
    "discount": 25,
    "productRating": 4.4,
    "productStatus": "Available",
    "mainImageUrl": "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop",
    "description": "Comprehensive multivitamin formulated specifically for men's health and wellness.",
    "category": "vitamins",
    "brand": "Charak",
    "inStock": true,
    "id": 15
  },
  {
    "sku": "WSUNSCREEN001",
    "title": "Sunscreen SPF 50 PA++++",
    "productPrice": 549,
    "productOldPrice": 699,
    "discount": 21,
    "productRating": 4.7,
    "productStatus": "Out of Stock",
    "mainImageUrl": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    "description": "Broad spectrum sunscreen with SPF 50 and PA++++ rating for maximum UV protection.",
    "category": "hairskin",
    "brand": "Charak",
    "inStock": false,
    "id": 16
  }
];

// Map category codes to display names
const categoryNames = {
  'all': {
    title: 'All Wellness Products',
    pageTitle: 'Wellness Essentials',
    description: 'Complete range of health and wellness products'
  },
  'vitamins': {
    title: 'Vitamins & Supplements',
    pageTitle: 'Vitamins & Supplements',
    description: 'Essential vitamins and supplements for daily health'
  },
  'hairskin': {
    title: 'Hair & Skin Care',
    pageTitle: 'Hair & Skin Care Essentials',
    description: 'Natural products for beautiful hair and glowing skin'
  },
  'fitness': {
    title: 'Fitness & Weight Management',
    pageTitle: 'Fitness & Weight Products',
    description: 'Supplements and gear for your fitness journey'
  },
  'immunity': {
    title: 'Immunity Boosters',
    pageTitle: 'Immunity Boosters',
    description: 'Strengthen your natural defenses'
  },
  'senior': {
    title: 'Senior Care Products',
    pageTitle: 'Senior Care Essentials',
    description: 'Specialized products for elderly wellness'
  },
  'oral': {
    title: 'Oral Care Essentials',
    pageTitle: 'Oral Care Products',
    description: 'For a healthy and bright smile'
  },
  'menstrual': {
    title: 'Menstrual Care Products',
    pageTitle: 'Menstrual Care Essentials',
    description: 'Comfort and care during menstrual cycle'
  }
};

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

// ==================== WISHLIST FUNCTION ====================
function toggleWishlist(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;

  const index = wishlist.findIndex(item => item.id === id);

  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1);
    showToast("Removed from wishlist ♥");
  } else {
    // Add with CORRECT format for wishlist page
    const wishlistItem = {
      id: product.id,
      name: product.title.split(' (')[0].trim(),
      price: product.productPrice,
      originalPrice: product.productOldPrice || null,
      image: product.mainImageUrl
    };
    wishlist.push(wishlistItem);
    showToast("Added to wishlist ♥");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateHeaderCounts();
  renderProducts(); // Update heart icon
}

// Auto-fix old broken wishlist items (run once on load)
function fixOldWishlistItems() {
  let updated = false;
  wishlist = wishlist.map(item => {
    if (!item.name && item.title) {
      item.name = item.title.split(' (')[0].trim();
      updated = true;
    }
    if (!item.image && item.mainImageUrl) {
      item.image = item.mainImageUrl;
      updated = true;
    }
    if (!item.price && item.price !== 0) {
      const orig = allProducts.find(p => p.id === item.id);
      if (orig) item.price = orig.productPrice;
      updated = true;
    }
    return item;
  }).filter(item => item.id && item.name && item.image);

  if (updated) {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
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
  const categoryData = categoryNames[p.category] || categoryNames['all'];

  return `
    <div class="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100
                ${isOutOfStock ? 'opacity-60 grayscale cursor-not-allowed' : ''}"
         ${!isOutOfStock ? `onclick="event.stopPropagation(); viewProductDetails(${p.id})"` : ''}
         style="${isOutOfStock ? 'pointer-events: none;' : ''}">

      <div class="relative bg-gray-50 cursor-pointer aspect-[6/4] overflow-hidden">
        <img src="${p.mainImageUrl}" alt="${p.title}"
             class="w-full h-full object-contain p-5 transition-transform duration-500 ${!isOutOfStock ? 'group-hover:scale-110' : ''}">

        <div class="absolute top-2 left-2 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10
                    ${isOutOfStock ? 'bg-red-600' : 'bg-green-600'}">
          ${isOutOfStock ? 'Out of Stock' : 'In Stock'}
        </div>

        <button onclick="event.stopPropagation(); toggleWishlist(${p.id})"
                class="absolute top-2 right-2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center 
                       ${isOutOfStock ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'} transition-opacity z-10">
          <i class="${inWishlist ? 'fas fa-heart text-red-600' : 'far fa-heart text-gray-600'} text-lg"></i>
        </button>
      </div>

      <div class="p-3">
        <div class="flex justify-between items-start">
          <p class="text-xs text-gray-500 uppercase font-medium truncate">${p.brand || 'Brand'}</p>
          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">${categoryData.title.split(' ')[0]}</span>
        </div>
        <h3 class="text-sm font-medium text-gray-800 line-clamp-2 mt-1">${p.title}</h3>

        <div class="mt-2 flex items-center gap-2">
          <span class="text-lg font-bold text-green-600">₹${p.productPrice.toLocaleString()}</span>
          ${p.productOldPrice > p.productPrice ? `
            <span class="text-sm text-gray-500 line-through">₹${p.productOldPrice.toLocaleString()}</span>
          ` : ''}
          <span class="text-sm font-medium text-red-500">${p.discount}% OFF</span>
        </div>

        <div class="flex items-center mt-2">
          <div class="flex text-amber-400">
            ${'★'.repeat(Math.floor(p.productRating || 4))}${'☆'.repeat(5 - Math.floor(p.productRating || 4))}
          </div>
          <span class="text-sm text-gray-500 ml-2">(${p.productRating || 4.0})</span>
        </div>

        <button onclick="event.stopPropagation(); viewProductDetails(${p.id})"
                class="mt-3 w-full font-medium text-sm py-2.5 rounded-lg transition
                        ${isOutOfStock 
                          ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                          : 'bg-[#36C2CE] hover:bg-[#2aa8b3] text-white'}">
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

  const currentCategory = filterState.category || 'all';
  const categoryData = categoryNames[currentCategory] || categoryNames['all'];
  setText("resultsCount", `Showing ${filteredProducts.length} products in ${categoryData.title}`);
  setText("categoryTitle", categoryData.title);
  
  // Update page title if it exists
  const pageTitleEl = document.getElementById("pageTitle");
  if (pageTitleEl && currentCategory !== 'all') {
    pageTitleEl.textContent = categoryData.pageTitle;
  }
  
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
    btn.className = `px-4 py-2 rounded border mx-1 ${i === currentPage ? 'bg-[#36C2CE] text-white' : 'bg-white text-[#36C2CE] border-[#36C2CE]'}`;
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
    const priceMatch = p.productPrice >= filterState.minPrice && p.productPrice <= filterState.maxPrice;
    return catMatch && brandMatch && discMatch && priceMatch;
  });

  sortProducts(filterState.sort);
  currentPage = 1;
  renderProducts();
  updateCategoryCardsUI();
  saveFiltersToStorage();
}

function sortProducts(type) {
  switch (type) {
    case 'price-low': filteredProducts.sort((a, b) => a.productPrice - b.productPrice); break;
    case 'price-high': filteredProducts.sort((a, b) => b.productPrice - a.productPrice); break;
    case 'rating': filteredProducts.sort((a, b) => b.productRating - a.productRating); break;
    case 'newest': filteredProducts.sort((a, b) => b.id - a.id); break;
    default: break;
  }
}

function loadFiltersFromStorage() {
  try {
    const saved = localStorage.getItem('wellnessFilters');
    if (saved) filterState = { ...filterState, ...JSON.parse(saved) };
  } catch (e) { console.error("Failed to load filters", e); }
}

function saveFiltersToStorage() {
  localStorage.setItem('wellnessFilters', JSON.stringify(filterState));
}

// ==================== UPDATE CATEGORY CARDS UI ====================
function updateCategoryCardsUI() {
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    if (card.dataset.category === filterState.category) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// ==================== INITIALIZE CATEGORY CARDS ====================
function initCategoryCards() {
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      // Remove active class from all cards
      categoryCards.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked card
      this.classList.add('active');
      
      // Get category from data attribute
      const category = this.dataset.category;
      
      // Update category in filters
      filterState.category = category;
      
      // Update radio buttons in desktop and mobile filters
      updateRadioButtons('category', category);
      updateRadioButtons('mobileCategory', category);
      
      // Update page title and category title
      updateTitles(category);
      
      // Apply filters
      applyFilters();
    });
  });
}

// ==================== UPDATE RADIO BUTTONS ====================
function updateRadioButtons(name, value) {
  const radios = document.querySelectorAll(`input[name="${name}"]`);
  radios.forEach(radio => {
    radio.checked = (radio.value === value);
  });
}

// ==================== UPDATE TITLES ====================
function updateTitles(category) {
  const categoryData = categoryNames[category] || categoryNames['all'];
  
  // Update category title
  const categoryTitleEl = document.getElementById('categoryTitle');
  if (categoryTitleEl) {
    categoryTitleEl.textContent = categoryData.title;
  }
  
  // Update page title
  const pageTitleEl = document.getElementById('pageTitle');
  if (pageTitleEl) {
    pageTitleEl.textContent = categoryData.pageTitle;
  }
  
  // Update browser tab title
  document.title = `${categoryData.pageTitle} – Wellness Essentials`;
}

// ==================== PRICE SLIDERS ====================
function initPriceSliders() {
  const sliders = document.querySelectorAll(".price-slider-container");
  const maxRange = 5000;

  sliders.forEach(container => {
    const minThumb = container.querySelector('input[type="range"]:first-of-type');
    const maxThumb = container.querySelector('input[type="range"]:last-of-type');
    const fill = container.querySelector(".slider-fill") || container.querySelector("#desktopFill") || container.querySelector("#mobileFill");
    const minVal = container.querySelector("#minValue") || container.querySelector("#mobileMinValue") || container.querySelector(".price-values span:first-child");
    const maxVal = container.querySelector("#maxValue") || container.querySelector("#mobileMaxValue") || container.querySelector(".price-values span:last-child");

    const update = (minP, maxP) => {
      const minPct = (minP / maxRange) * 100;
      const maxPct = (maxP / maxRange) * 100;
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
        update(val, parseInt(maxThumb.value));
        applyFilters();
      });

      maxThumb.addEventListener("input", () => {
        let val = parseInt(maxThumb.value);
        if (val < parseInt(minThumb.value)) val = parseInt(minThumb.value);
        update(parseInt(minThumb.value), val);
        applyFilters();
      });

      update(filterState.minPrice, filterState.maxPrice);
    }
  });
}

// ==================== FILTER INITIALIZATION ====================
function initFiltersAndUI() {
  loadFiltersFromStorage();

  // Initialize category cards
  initCategoryCards();

  // Set initial radio buttons
  document.querySelectorAll('input[name="category"], input[name="brand"], input[name="discount"]').forEach(input => {
    if ((input.name === "category" && input.value === filterState.category) ||
        (input.name === "brand" && input.value === filterState.brand) ||
        (input.name === "discount" && parseInt(input.value) === filterState.discount)) {
      input.checked = true;
    }

    input.addEventListener('change', () => {
      if (input.name === "category") {
        filterState.category = input.value;
        updateCategoryCardsUI();
        updateTitles(input.value);
      }
      if (input.name === "brand") filterState.brand = input.value;
      if (input.name === "discount") filterState.discount = parseInt(input.value);
      applyFilters();
    });
  });

  // Set mobile filter radio buttons
  document.querySelectorAll('input[name="mobileCategory"], input[name="mobileBrand"], input[name="mobileDiscount"]').forEach(input => {
    if ((input.name === "mobileCategory" && input.value === filterState.category) ||
        (input.name === "mobileBrand" && input.value === filterState.brand) ||
        (input.name === "mobileDiscount" && parseInt(input.value) === filterState.discount)) {
      input.checked = true;
    }

    input.addEventListener('change', () => {
      if (input.name === "mobileCategory") {
        filterState.category = input.value;
        updateCategoryCardsUI();
        updateTitles(input.value);
      }
      if (input.name === "mobileBrand") filterState.brand = input.value;
      if (input.name === "mobileDiscount") filterState.discount = parseInt(input.value);
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

  // Desktop apply filters button
  document.getElementById("applyDesktopFilters")?.addEventListener("click", () => {
    applyFilters();
  });

  // Mobile apply filters button
  document.getElementById("applyMobileFilters")?.addEventListener("click", () => {
    const cat = document.querySelector('#filterSheet input[name="mobileCategory"]:checked')?.value || 'all';
    const brd = document.querySelector('#filterSheet input[name="mobileBrand"]:checked')?.value || 'all';
    const disc = parseInt(document.querySelector('#filterSheet input[name="mobileDiscount"]:checked')?.value || 0);
    filterState.category = cat;
    filterState.brand = brd;
    filterState.discount = disc;
    
    updateCategoryCardsUI();
    updateTitles(cat);
    applyFilters();
    
    document.getElementById("filterSheet").classList.add("translate-y-full");
    document.getElementById("mobileSheetBackdrop").classList.add("hidden");
  });

  // Clear filters button
  document.getElementById("clearMobileFilters")?.addEventListener("click", () => {
    filterState = { category: 'all', brand: 'all', discount: 0, minPrice: 0, maxPrice: 5000, sort: 'default' };
    localStorage.removeItem("wellnessFilters");
    
    // Reset all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(r => {
      if (r.name === "category" || r.name === "mobileCategory" || r.name === "brand" || r.name === "mobileBrand") {
        r.checked = (r.value === 'all');
      }
      if (r.name === "discount" || r.name === "mobileDiscount") {
        r.checked = (r.value === '0');
      }
    });
    
    if (sortSelect) sortSelect.value = 'default';
    
    // Update category cards
    updateCategoryCardsUI();
    updateTitles('all');
    
    initPriceSliders();
    applyFilters();
  });

  // Apply sort button
  const applySortBtn = document.getElementById("applySortBtn");
  if (applySortBtn) {
    applySortBtn.addEventListener("click", () => {
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
  }

  // Initial render
  applyFilters();
}

// ==================== VIEW PRODUCT DETAILS ====================
function viewProductDetails(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;

  // Store product in sessionStorage for details page
  sessionStorage.setItem("selectedProduct", JSON.stringify(product));
  sessionStorage.setItem("allProducts", JSON.stringify(allProducts));
  sessionStorage.setItem("currentPageName", "Wellness Essentials");
  
  // Navigate to product details page
  window.location.href = "../../productdetails.html?id=" + id;
}

// ==================== BANNER & MOBILE SHEETS ====================
function initBanner() {
  const slides = document.querySelectorAll('.banner-slide');
  const dots = document.querySelectorAll('.banner-dot');
  if (slides.length === 0 || dots.length === 0) return;
  
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

function initMobileSheets() {
  const backdrop = document.getElementById("mobileSheetBackdrop");
  
  // Open filter sheet
  document.getElementById("openFilterSheet")?.addEventListener("click", () => {
    document.getElementById("filterSheet").classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  });
  
  // Open sort sheet
  document.getElementById("openSortSheet")?.addEventListener("click", () => {
    document.getElementById("sortSheet").classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  });
  
  // Close buttons
  document.getElementById("closeFilterSheet")?.addEventListener("click", () => {
    document.getElementById("filterSheet").classList.add("translate-y-full");
    backdrop.classList.add("hidden");
  });
  
  document.getElementById("closeSortSheet")?.addEventListener("click", () => {
    document.getElementById("sortSheet").classList.add("translate-y-full");
    backdrop.classList.add("hidden");
  });
  
  // Backdrop click
  backdrop?.addEventListener("click", () => {
    document.getElementById("filterSheet").classList.add("translate-y-full");
    document.getElementById("sortSheet").classList.add("translate-y-full");
    backdrop.classList.add("hidden");
  });
}

// ==================== ON LOAD ====================
document.addEventListener("DOMContentLoaded", () => {
  // Fix old wishlist items first
  fixOldWishlistItems();

  initBanner();
  initMobileSheets();
  initPriceSliders();
  initFiltersAndUI();
  renderProducts();
  updateHeaderCounts();
  
  // Update category cards UI
  updateCategoryCardsUI();
});