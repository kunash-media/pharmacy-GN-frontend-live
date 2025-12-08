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
    // baby.js - FULL FINAL VERSION (17 Products – With Stock Status)
    products = [
      // ==================== DIAPERS & HYGIENE ====================
  
    {
      "id": 1,
      "title": "Pampers Premium Care Pants",
      "price": 1299,
      "originalPrice": 1998,
      "discount": 35,
      "brand": "Pampers",
      "category": "diapers-hygiene",
      "mainImageUrl": "https://m.media-amazon.com/images/I/71N3kZZyZAL._SL1500_.jpg",
      "description": "India's softest diaper with magic gel. 12-hour leak-lock. Wetness indicator. Ideal for 0-5 kg babies.",
      "inStock": true
    },
    {
      "id": 4,
      "title": "Huggies Wonder Pants",
      "price": 999,
      "originalPrice": 1427,
      "discount": 30,
      "brand": "Huggies",
      "category": "diapers-hygiene",
      "mainImageUrl": "https://m.media-amazon.com/images/I/81fF2n7kMGL._SL1500_.jpg",
      "description": "Bubble bed technology. Double leak guard. Overnight protection up to 12 hours.",
      "inStock": false
    },
    {
      "id": 7,
      "title": "MamyPoko Pants Extra Absorb",
      "price": 1099,
      "originalPrice": 1526,
      "discount": 28,
      "brand": "MamyPoko",
      "category": "diapers-hygiene",
      "mainImageUrl": "https://m.media-amazon.com/images/I/81X5o2d2KZL._SL1500_.jpg",
      "description": "Crisscross sheet absorbs 12 hours. Prevents redness. Easy to wear & remove.",
      "inStock": true
    },
    {
      "id": 10,
      "title": "Pampers Fresh Clean Baby Wipes",
      "price": 399,
      "originalPrice": 499,
      "discount": 20,
      "brand": "Pampers",
      "category": "diapers-hygiene",
      "mainImageUrl": "https://m.media-amazon.com/images/I/81s7K9m1JUL._SL1500_.jpg",
      "description": "Gentle on skin. Refreshing scent. Alcohol-free. Dermatologically tested.",
      "inStock": true
    },
    {
      "id": 12,
      "title": "Mee Mee Caring Baby Wet Wipes",
      "price": 249,
      "originalPrice": 383,
      "discount": 35,
      "brand": "MeeMee",
      "category": "diapers-hygiene",
      "mainImageUrl": "https://m.media-amazon.com/images/I/81Q4QbA8kUL._SL1500_.jpg",
      "description": "99% purified water. Aloe vera & vitamin E. Extra thick. Paraben free.",
      "inStock": true
    },
    {
      "id": 2,
      "title": "Himalaya Gentle Baby Shampoo 400ml",
      "price": 349,
      "originalPrice": 465,
      "discount": 25,
      "brand": "Himalaya",
      "category": "bath-body",
      "mainImageUrl": "https://m.media-amazon.com/images/I/71pIlb8rKUL._SL1500_.jpg",
      "description": "Tear-free formula. Natural proteins. Chickpea & fenugreek extract. No parabens.",
      "inStock": true
    },
    {
      "id": 5,
      "title": "Johnson's Baby Oil 500ml",
      "price": 499,
      "originalPrice": 640,
      "discount": 22,
      "brand": "Johnson's",
      "category": "bath-body",
      "mainImageUrl": "https://m.media-amazon.com/images/I/61o2hL8T6GL._SL1000_.jpg",
      "description": "Locks in 10x more moisture. Clinically proven mild. Ideal for baby massage.",
      "inStock": false
    },
    {
      "id": 8,
      "title": "Himalaya Baby Lotion 400ml",
      "price": 299,
      "originalPrice": 352,
      "discount": 15,
      "brand": "Himalaya",
      "category": "bath-body",
      "mainImageUrl": "https://m.media-amazon.com/images/I/71dXt+2fKLL._SL1500_.jpg",
      "description": "24-hour moisturization. Almond & olive oil. Hypoallergenic. No mineral oil.",
      "inStock": true
    },
    {
      "id": 11,
      "title": "Himalaya Baby Powder 400g",
      "price": 285,
      "originalPrice": 348,
      "discount": 18,
      "brand": "Himalaya",
      "category": "bath-body",
      "mainImageUrl": "https://m.media-amazon.com/images/I/71a9Z7Z7Z7L._SL1500_.jpg",
      "description": "Keeps baby fresh & cool. Yashada bhasma protects skin. No talc.",
      "inStock": true
    },
    {
      "id": 14,
      "title": "Sebamed Baby Cleansing Bar 100g",
      "price": 699,
      "originalPrice": 794,
      "discount": 12,
      "brand": "Sebamed",
      "category": "bath-body",
      "mainImageUrl": "https://m.media-amazon.com/images/I/71K5Z7Z7Z7L._SL1500_.jpg",
      "description": "pH 5.5. Tear-free. 100% soap-free. Clinically proven.",
      "inStock": true
    },
    {
      "id": 3,
      "title": "Babyhug Feeding Bottle 250ml - Anti Colic",
      "price": 499,
      "originalPrice": 499,
      "discount": 0,
      "brand": "BabyHug",
      "category": "nutrition-feeding",
      "mainImageUrl": "https://m.media-amazon.com/images/I/61fF9vJ2KHL._SL1000_.jpg",
      "description": "BPA-free. Wide neck. Slow flow silicone nipple. Easy to clean.",
      "inStock": true
    },
    {
      "id": 6,
      "title": "Chicco Natural Feeling Feeding Bottle 250ml",
      "price": 799,
      "originalPrice": 888,
      "discount": 10,
      "brand": "Chicco",
      "category": "nutrition-feeding",
      "mainImageUrl": "https://m.media-amazon.com/images/I/71gG9vJ2KHL._SL1500_.jpg",
      "description": "Angled nipple for natural latch. Anti-colic valve. Soft silicone.",
      "inStock": false
    },
    {
      "id": 9,
      "title": "Pigeon Peristaltic Nipple - Medium Flow",
      "price": 299,
      "originalPrice": 352,
      "discount": 15,
      "brand": "Pigeon",
      "category": "nutrition-feeding",
      "mainImageUrl": "https://m.media-amazon.com/images/I/71hH9vJ2KHL._SL1200_.jpg",
      "description": "Promotes natural tongue movement. Super stretchable. Pack of 2.",
      "inStock": true
    },
    {
      "id": 15,
      "title": "Babyhug Stainless Steel Sipper 300ml",
      "price": 649,
      "originalPrice": 811,
      "discount": 20,
      "brand": "BabyHug",
      "category": "nutrition-feeding",
      "mainImageUrl": "https://m.media-amazon.com/images/I/81jJ9vJ2KHL._SL1500_.jpg",
      "description": "Leak-proof. Double wall insulated. Keeps liquid warm/cool.",
      "inStock": true
    },
    {
      "id": 16,
      "title": "Mee Mee Silicone Fruit Feeder",
      "price": 349,
      "originalPrice": 465,
      "discount": 25,
      "brand": "MeeMee",
      "category": "nutrition-feeding",
      "mainImageUrl": "https://m.media-amazon.com/images/I/71kK9vJ2KHL._SL1200_.jpg",
      "description": "Safe way to introduce solids. BPA-free. Easy grip handle.",
      "inStock": true
    },
    {
      "id": 13,
      "title": "BabyHug Premium Newborn Gift Hamper (15 Items)",
      "price": 2999,
      "originalPrice": 3749,
      "discount": 20,
      "brand": "BabyHug",
      "category": "gift-hampers",
      "mainImageUrl": "https://m.media-amazon.com/images/I/81eWvP0XhGL._SL1500_.jpg",
      "description": "Complete newborn kit: Rompers, blanket, bottle, toys, bibs, mittens & more.",
      "inStock": false
    },
    {
      "id": 17,
      "title": "Himalaya Baby Care Complete Gift Pack",
      "price": 1499,
      "originalPrice": 1700,
      "discount": 30,
      "brand": "Himalaya",
      "category": "gift-hampers",
      "mainImageUrl": "https://m.media-amazon.com/images/I/81X5o0d2KZL._SL1500_.jpg",
      "description": "Shampoo, lotion, powder, oil, soap, cream & wipes – full combo.",
      "inStock": true
    }
  
    ];
    filteredProducts = [...products];
    render();
  };

  const render = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const items = filteredProducts.slice(start, start + itemsPerPage);
    const grid = $("productsGrid");

    grid.innerHTML = items.map(p => `
      <div class="product-card bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 cursor-pointer ${!p.inStock ? 'opacity-60 grayscale' : ''}"
           onclick="openProductDetails(${p.id})">
        <div class="cursor-pointer relative bg-gray-50 aspect-[9/6] overflow-hidden">
          <img src="${p.mainImageUrl}" alt="${p.title}"
               class="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-110">
          
          ${p.inStock ? 
            `<div class="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">In Stock</div>` : 
            `<div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Out of Stock</div>`
          }
        </div>
        
        <button 
          class="absolute top-3 left-64 bg-white/90 backdrop-blur hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
          onclick="event.stopPropagation(); addToWishlist(${p.id}); 
                   this.classList.toggle('active-wish');
                   this.querySelector('i').classList.toggle('fas');
                   this.querySelector('i').classList.toggle('far');
                   this.querySelector('i').classList.toggle('text-red-600');">
          <i class="far fa-heart text-xl ${JSON.parse(localStorage.getItem('wishlist')||'[]').some(w => w.id === p.id) ? 'fas text-red-600' : 'text-gray-600'}"></i>
        </button>
        
       <div class="p-3">
        <p class="text-xs text-gray-500 uppercase font-medium truncate">${p.brand || 'Brand'}</p>
        <h3 class="text-sm font-medium text-gray-800 line-clamp-2 mt-1">${p.title}</h3>

        <div class="mt-2 flex items-center gap-2">
          <span class="text-lg font-bold text-green-600">₹${p.price.toLocaleString()}</span>
          ${p.originalPrice > p.price ? `
            <span class="text-sm text-gray-500 line-through">₹${p.originalPrice.toLocaleString()}</span>
          ` : ''}
          <span class="text-sm font-medium text-red-500">₹${p.discount}% OFF</span>
        </div>
          <button class="mt-4 w-full cursor-not-allowed bg-[#239BA7] hover:bg-[#00809D] text-white font-bold py-3 rounded-xl transition prevent-click"
                  onclick="event.stopPropagation(); openProductDetails(${p.id})">
            View Details
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

  const getActiveFilters = () => {
    const category = document.querySelector('input[name="category"]:checked, input[name="mobileCategory"]:checked')?.value || 'all';
    const brand = document.querySelector('input[name="brand"]:checked, input[name="mobileBrand"]:checked')?.value || 'all';
    const discountEl = document.querySelector('input[name="discount"]:checked, input[name="mobileDiscount"]:checked');
    const discount = discountEl?.value === 'all' ? null : parseInt(discountEl?.value || '0');

    let minPrice = 0;
    let maxPrice = 10000;

    const desktopMin = $("minThumb");
    const desktopMax = $("maxThumb");
    if (desktopMin && desktopMax) {
      minPrice = Number(desktopMin.value);
      maxPrice = Number(desktopMax.value);
    } else {
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

    if ($("minThumb")) min = Number($("minThumb").value);
    else if ($("mobileMinThumb")) min = Number($("mobileMinThumb").value);

    if ($("maxThumb")) max = Number($("maxThumb").value);
    else if ($("mobileMaxThumb")) max = Number($("mobileMaxThumb").value);

    if (min > max) [min, max] = [max, min];

    const thumbs = ["minThumb", "mobileMinThumb", "maxThumb", "mobileMaxThumb"];
    thumbs.forEach(id => {
      const el = $(id);
      if (el) {
        el.value = (id.includes("min")) ? min : max;
      }
    });

    document.querySelectorAll('.slider-fill').forEach(fill => {
      fill.style.left = (min / 10000 * 100) + '%';
      fill.style.width = ((max - min) / 10000 * 100) + '%';
    });

    document.querySelectorAll('#minValue, #mobileMinValue').forEach(el => el && (el.textContent = '₹' + min));
    document.querySelectorAll('#maxValue, #mobileMaxValue').forEach(el => el && (el.textContent = '₹' + max));
  };

  const syncMobileFiltersToDesktop = () => {
    const mobileCat = document.querySelector('input[name="mobileCategory"]:checked');
    if (mobileCat) {
      const desktopCat = document.querySelector(`input[name="category"][value="${mobileCat.value}"]`);
      if (desktopCat) desktopCat.checked = true;
    }

    const mobileBrand = document.querySelector('input[name="mobileBrand"]:checked');
    if (mobileBrand) {
      const desktopBrand = document.querySelector(`input[name="brand"][value="${mobileBrand.value}"]`);
      if (desktopBrand) desktopBrand.checked = true;
    }

    const mobileDisc = document.querySelector('input[name="mobileDiscount"]:checked');
    if (mobileDisc) {
      const desktopDisc = document.querySelector(`input[name="discount"][value="${mobileDisc.value}"]`);
      if (desktopDisc) desktopDisc.checked = true;
    }
  };

  const clearAllFilters = () => {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      if (radio.value === 'all') radio.checked = true;
    });

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

    $("applyMobileFilters")?.addEventListener('click', () => {
      syncMobileFiltersToDesktop();
      applyFilters();
      close();
    });

    $("applySortBtn")?.addEventListener('click', () => {
      const val = document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';
      if ($("sortSelect")) $("sortSelect").value = val;
      applySorting();
      close();
    });

    $("clearMobileFilters")?.addEventListener('click', clearAllFilters);
  };

  window.openProductDetails = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    sessionStorage.setItem('currentProduct', JSON.stringify(product));
    sessionStorage.setItem('allProducts', JSON.stringify(products));
    window.location.href = 'baby-product-details.html';
  };

  window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.title} added to cart!`);
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

  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
      background: #10b981; color: white; padding: 1rem 2rem; border-radius: 50px;
      font-weight: bold; z-index: 10000; animation: toast 3s ease forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  window.addToWishlist = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const exists = wishlist.find(item => item.id === id);
    if (exists) {
      wishlist = wishlist.filter(item => item.id !== id);
      showToast('Removed from Wishlist');
    } else {
      wishlist.push({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.discount 
          ? Math.round(product.price / (1 - product.discount/100)) 
          : product.price,
        discount: product.discount || 0,
        image: product.image || product.mainImageUrl,
        title: product.title,
        brand: product.brand,
        rating: product.rating,
        inStock: product.inStock
      });
      showToast('Added to Wishlist');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();

    const btn = event?.target?.closest('button');
    if (btn) {
      btn.classList.toggle('active-wish');
      const icon = btn.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      icon.classList.toggle('text-red-600');
    }
  };

  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const total = wishlist.length;

    const desktopCount = document.querySelector('#wishlistCount');
    if (desktopCount) {
      desktopCount.textContent = total;
      desktopCount.style.display = total > 0 ? 'flex' : 'none';
    }

    const mobileCount = document.querySelector('#mobileWishlistCount');
    if (mobileCount) {
      mobileCount.textContent = total;
      mobileCount.style.display = total > 0 ? 'flex' : 'none';
    }
  }

  if (!document.querySelector('#toastStyle')) {
    const style = document.createElement('style');
    style.id = 'toastStyle';
    style.textContent = `
      @keyframes toast {
        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        10%, 90% { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  const init = () => {
    loadProducts();
    syncAndUpdateSliders();
    initBannerCarousel();
    initMobileSheets();

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