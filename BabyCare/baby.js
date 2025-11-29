// baby.js - 100% FIXED FINAL VERSION (No Syntax Errors, Mobile Apply Button Works Perfectly)
(function() {
  'use strict';
  
  if (window.babyFinal) return;
  window.babyFinal = true;

  let products = [];
  let filteredProducts = [];
  let currentPage = 1;
  const itemsPerPage = 12;

  const $ = id => document.getElementById(id);

  const loadProducts = () => {
    products = [
      {id:1, title:"Pampers Premium Diapers Pack", price:899, discount:30, category:"diapers-hygiene", brand:"Pampers", rating:4.5},
      {id:4, title:"Mee Mee Gentle Wet Wipes", price:199, discount:33, category:"diapers-hygiene", brand:"MeeMee", rating:4.2},
      {id:7, title:"Pampers Baby Wipes", price:299, discount:15, category:"diapers-hygiene", brand:"Pampers", rating:4.5},
      {id:10, title:"MeeMee Diaper Bag", price:1299, discount:25, category:"diapers-hygiene", brand:"MeeMee", rating:4.6},
      {id:12, title:"Pampers Pants Diapers", price:1499, discount:28, category:"diapers-hygiene", brand:"Pampers", rating:4.7},
      
      {id:2, title:"Himalaya Baby Shampoo", price:349, discount:25, category:"bath-body", brand:"Himalaya", rating:4.3},
      {id:5, title:"Johnson's Baby Oil 200ml", price:449, discount:20, category:"bath-body", brand:"Johnsons", rating:4.6},
      {id:8, title:"Himalaya Baby Lotion", price:275, discount:10, category:"bath-body", brand:"Himalaya", rating:4.1},
      {id:11, title:"Himalaya Baby Powder", price:180, discount:50, category:"bath-body", brand:"Himalaya", rating:4.8},
      {id:14, title:"Himalaya Baby Soap Pack", price:120, discount:20, category:"bath-body", brand:"Himalaya", rating:4.2},
      
      {id:3, title:"Babyhug Feeding Bottle Set", price:599, discount:0, category:"nutrition-feeding", brand:"BabyHug", rating:4.7},
      {id:6, title:"Chicco Pacifier Orthodontic", price:399, discount:0, category:"nutrition-feeding", brand:"Chicco", rating:4.4},
      {id:9, title:"BabyHug Sipper Bottle", price:450, discount:12, category:"nutrition-feeding", brand:"BabyHug", rating:4.3},
      {id:15, title:"BabyHug Feeding Bowl Set", price:350, discount:18, category:"nutrition-feeding", brand:"BabyHug", rating:4.5},
      {id:16, title:"Chicco Baby Spoon Set", price:250, discount:0, category:"nutrition-feeding", brand:"Chicco", rating:4.2},
      
      {id:13, title:"BabyHug Gift Hamper", price:2999, discount:15, category:"gift-hampers", brand:"BabyHug", rating:4.9},
      {id:17, title:"Himalaya Baby Care Combo", price:1499, discount:30, category:"gift-hampers", brand:"Himalaya", rating:4.6},
    ];
    filteredProducts = [...products];
    render();
  };

  const render = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const items = filteredProducts.slice(start, start + itemsPerPage);
    const grid = $("productsGrid");

    if (items.length === 0) {
      grid.innerHTML = `<div class="col-span-full text-center py-20">
        <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
        <p class="text-2xl text-gray-500 font-semibold">No products found</p>
        <p class="text-gray-400 mt-2">Try adjusting your filters</p>
      </div>`;
      $("resultsCount").textContent = "0 products found";
      renderPagination();
      return;
    }

    grid.innerHTML = items.map(p => `
      <div class="product-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300">
        <div class="relative h-64 bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center overflow-hidden">
          <div class="image-zoom transition-transform duration-300 text-5xl font-bold text-gray-300">${p.title.slice(0,2)}</div>
          ${p.discount ? `<span class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">${p.discount}% OFF</span>` : ''}
        </div>
        <div class="p-5">
          <h3 class="font-bold text-lg mb-2 line-clamp-2 text-gray-800">${p.title}</h3>
          <div class="flex items-center gap-1 mb-2">
            <span class="text-yellow-500">★</span>
            <span class="text-sm font-medium text-gray-700">${p.rating}</span>
          </div>
          <div class="flex items-baseline gap-2">
            <p class="text-2xl font-bold text-pink-600">₹${p.price}</p>
            ${p.discount ? `<p class="text-sm text-gray-400 line-through">₹${Math.round(p.price/(1-p.discount/100))}</p>` : ''}
          </div>
          <button class="mt-4 w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold py-3 rounded-xl transition">
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');

    $("resultsCount").textContent = 
      `Showing ${start + 1}–${Math.min(start + itemsPerPage, filteredProducts.length)} of ${filteredProducts.length} products`;
    
    renderPagination();
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pag = $("pagination");
    if (totalPages <= 1) { pag.innerHTML = ''; return; }

    let html = '';
    if (currentPage > 1) html += `<button class="px-4 py-2 bg-white rounded-lg font-bold text-pink-600" onclick="window.changePage(${currentPage-1})">← Prev</button>`;
    
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        html += `<button class="px-4 py-2 ${i === currentPage ? 'bg-pink-600 text-white' : 'bg-white text-pink-600'} rounded-lg font-bold" onclick="window.changePage(${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += `<span class="px-2">...</span>`;
      }
    }
    if (currentPage < totalPages) html += `<button class="px-4 py-2 bg-white rounded-lg font-bold text-pink-600" onclick="window.changePage(${currentPage+1})">Next →</button>`;
    
    pag.innerHTML = html;
  };

  window.changePage = (page) => {
    currentPage = page;
    render();
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  // Get current active filters from both desktop & mobile
 const getActiveFilters = () => {
  // Category
  const category = document.querySelector('input[name="category"]:checked, input[name="mobileCategory"]:checked')?.value || 'all';

  // Brand
  const brand = document.querySelector('input[name="brand"]:checked, input[name="mobileBrand"]:checked')?.value || 'all';

  // Discount
  const discountEl = document.querySelector('input[name="discount"]:checked, input[name="mobileDiscount"]:checked');
  const discount = discountEl?.value === 'all' ? null : parseInt(discountEl?.value || '0');

  // ───── PRICE RANGE – ALWAYS READ FROM THE VISIBLE SLIDERS ─────
  let minPrice = 0;
  let maxPrice = 10000;

  // Desktop sliders exist → use them
  const desktopMin = $("minThumb");
  const desktopMax = $("maxThumb");
  if (desktopMin && desktopMax) {
    minPrice = Number(desktopMin.value);
    maxPrice = Number(desktopMax.value);
  } 
  // Mobile sliders exist → use them (fallback)
  else {
    const mobileMin = $("mobileMinThumb");
    const mobileMax = $("mobileMaxThumb");
    if (mobileMin) minPrice = Number(mobileMin.value);
    if (mobileMax) maxPrice = Number(mobileMax.value);
  }

  return { category, brand, discount, minPrice, maxPrice };
};

  const applyFilters = () => {
    const { category, brand, discount, minPrice, maxPrice } = getActiveFilters();

    let list = [...products];

    if (category !== 'all') list = list.filter(p => p.category === category);
    if (brand !== 'all') list = list.filter(p => p.brand === brand);
    if (discount !== null) list = list.filter(p => (p.discount || 0) >= discount);
    list = list.filter(p => p.price >= minPrice && p.price <= maxPrice);

    filteredProducts = list;
    currentPage = 1;
    applySorting();
  };

  const applySorting = () => {
    const sortValue = $("sortSelect")?.value || document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';

    if (sortValue === 'price-low') filteredProducts.sort((a,b) => a.price - b.price);
    else if (sortValue === 'price-high') filteredProducts.sort((a,b) => b.price - a.price);
    else if (sortValue === 'rating') filteredProducts.sort((a,b) => b.rating - a.rating);
    else if (sortValue === 'newest') filteredProducts.sort((a,b) => b.id - a.id);

    render();
  };

 const syncAndUpdateSliders = () => {
  let min = 0;
  let max = 10000;

  // Take the current values from whichever slider is available
  if ($("minThumb")) min = Number($("minThumb").value);
  else if ($("mobileMinThumb")) min = Number($("mobileMinThumb").value);

  if ($("maxThumb")) max = Number($("maxThumb").value);
  else if ($("mobileMaxThumb")) max = Number($("mobileMaxThumb").value);

  // Make sure min ≤ max
  if (min > max) [min, max] = [max, min];

  // ───── WRITE THE SAME VALUES TO ALL FOUR THUMBS ─────
  const thumbs = ["minThumb", "mobileMinThumb", "maxThumb", "mobileMaxThumb"];
  thumbs.forEach(id => {
    const el = $(id);
    if (el) {
      el.value = (id.includes("min")) ? min : max;
    }
  });

  // Update visual fill
  document.querySelectorAll('.slider-fill').forEach(fill => {
    fill.style.left = (min / 10000 * 100) + '%';
    fill.style.width = ((max - min) / 10000 * 100) + '%';
  });

  // Update text
  document.querySelectorAll('#minValue, #mobileMinValue').forEach(el => el && (el.textContent = '₹' + min));
  document.querySelectorAll('#maxValue, #mobileMaxValue').forEach(el => el && (el.textContent = '₹' + max));
};

  // NEW: Sync mobile radio selections to desktop ones so filtering works perfectly
  const syncMobileFiltersToDesktop = () => {
    // Category
    const mobileCat = document.querySelector('input[name="mobileCategory"]:checked');
    if (mobileCat) {
      const desktopCat = document.querySelector(`input[name="category"][value="${mobileCat.value}"]`);
      if (desktopCat) desktopCat.checked = true;
    }

    // Brand
    const mobileBrand = document.querySelector('input[name="mobileBrand"]:checked');
    if (mobileBrand) {
      const desktopBrand = document.querySelector(`input[name="brand"][value="${mobileBrand.value}"]`);
      if (desktopBrand) desktopBrand.checked = true;
    }

    // Discount
    const mobileDisc = document.querySelector('input[name="mobileDiscount"]:checked');
    if (mobileDisc) {
      const desktopDisc = document.querySelector(`input[name="discount"][value="${mobileDisc.value}"]`);
      if (desktopDisc) desktopDisc.checked = true;
    }
  };

  const clearAllFilters = () => {
    // Reset ALL radios (both mobile & desktop)
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      if (radio.value === 'all') radio.checked = true;
    });

    // Reset sliders
    [$("minThumb"), $("mobileMinThumb")].forEach(el => el && (el.value = 0));
    [$("maxThumb"), $("mobileMaxThumb")].forEach(el => el && (el.value = 10000));

    syncAndUpdateSliders();
    applyFilters();
  };

  const initBannerCarousel = () => {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    let idx = 0;
    const show = (i) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[i].classList.add('active');
      dots[i].classList.add('active');
    };
    dots.forEach((d, i) => d.onclick = () => show(idx = i));
    setInterval(() => show(idx = (idx + 1) % slides.length), 4000);
    show(0);
  };

  const initMobileSheets = () => {
    const filterSheet = $("filterSheet");
    const sortSheet = $("sortSheet");
    const backdrop = $("mobileSheetBackdrop");

    const close = () => {
      filterSheet?.classList.add('translate-y-full');
      sortSheet?.classList.add('translate-y-full');
      backdrop?.classList.add('hidden');
    };

    $("openFilterSheet")?.addEventListener('click', () => {
      filterSheet?.classList.remove('translate-y-full');
      backdrop?.classList.remove('hidden');
    });

    $("openSortSheet")?.addEventListener('click', () => {
      sortSheet?.classList.remove('translate-y-full');
      backdrop?.classList.remove('hidden');
    });

    $("closeFilterSheet")?.addEventListener('click', close);
    $("closeSortSheet")?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);

    // FIXED: Apply Filters from Mobile (now syncs + applies perfectly)
    $("applyMobileFilters")?.addEventListener('click', () => {
      syncMobileFiltersToDesktop();  // Sync mobile choices to desktop
      applyFilters();                // Now it WILL work correctly
      close();
    });

    // Apply Sort from Mobile
    $("applySortBtn")?.addEventListener('click', () => {
      const val = document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';
      if ($("sortSelect")) $("sortSelect").value = val;
      applySorting();
      close();
    });

    $("clearMobileFilters")?.addEventListener('click', clearAllFilters);
  };

  const init = () => {
    loadProducts();
    syncAndUpdateSliders();
    initBannerCarousel();
    initMobileSheets();

    // Apply filters when any radio changes (desktop + mobile)
    document.addEventListener('change', (e) => {
      if (e.target.matches('input[name="category"], input[name="brand"], input[name="discount"], input[name="mobileCategory"], input[name="mobileBrand"], input[name="mobileDiscount"]')) {
        applyFilters();
      }
      if (e.target.matches('input[name="mobileSort"]')) {
        const val = e.target.value;
        if ($("sortSelect")) $("sortSelect").value = val;
      }
    });

    $("sortSelect")?.addEventListener('change', applySorting);

   // Inside init() → replace the old input listener with this:
document.addEventListener('input', e => {
  if (e.target.matches('input[type="range"]')) {
    syncAndUpdateSliders();
    clearTimeout(window._sliderTO);
    window._sliderTO = setTimeout(applyFilters, 200);
  }
});

    $("filterForm")?.addEventListener('submit', e => {
      e.preventDefault();
      applyFilters();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();