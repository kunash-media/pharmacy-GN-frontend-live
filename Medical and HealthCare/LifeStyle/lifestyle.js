// =============== LIFESTYLE DISORDER PRODUCTS ===============
const fakeProducts = [
  { id: 1, name: "Sugar-Free Gold", brand: "Dabur", price: 280, originalPrice: 350, discount: 20, category: "diabetes", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop", prescription: false, description: "Sugar substitute for diabetes management" },
  { id: 2, name: "Diabetic Multivitamin", brand: "Abbott", price: 420, originalPrice: 550, discount: 24, category: "diabetes", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Essential vitamins for diabetic patients" },
  { id: 3, name: "Blood Pressure Monitor", brand: "Dr. Reddy's", price: 850, originalPrice: 1200, discount: 29, category: "heart-bp", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Digital BP monitor for home use" },
  { id: 4, name: "Heart Care Capsules", brand: "Himalaya", price: 315, originalPrice: 420, discount: 25, category: "heart-bp", image: "https://images.unsplash.com/photo-1550572017-4876b7788da6?w=400&h=400&fit=crop", prescription: false, description: "Natural support for heart health" },
  { id: 5, name: "Thyroid Support Tablets", brand: "Baidyanath", price: 295, originalPrice: 395, discount: 25, category: "thyroid", image: "https://images.unsplash.com/photo-1599932887768-d6cb80133949?w=400&h=400&fit=crop", prescription: false, description: "Ayurvedic support for thyroid function" },
  { id: 6, name: "Iodine Supplement", brand: "Abbott", price: 180, originalPrice: 240, discount: 25, category: "thyroid", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "Essential iodine for thyroid health" },
  { id: 7, name: "Vitamin D3 60K IU", brand: "Dr. Reddy's", price: 145, originalPrice: 195, discount: 26, category: "vitamins", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop", prescription: false, description: "High potency Vitamin D supplement" },
  { id: 8, name: "Multivitamin Complex", brand: "Himalaya", price: 325, originalPrice: 450, discount: 28, category: "vitamins", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=400&fit=crop", prescription: false, description: "Complete daily multivitamin formula" },
  { id: 9, name: "Diabetic Foot Cream", brand: "Dabur", price: 195, originalPrice: 260, discount: 25, category: "diabetes", image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop", prescription: false, description: "Moisturizing cream for diabetic skin" },
  { id: 10, name: "Omega-3 Fish Oil", brand: "Abbott", price: 480, originalPrice: 650, discount: 26, category: "heart-bp", image: "https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=400&h=400&fit=crop", prescription: false, description: "Supports heart and brain health" },
  { id: 11, name: "Calcium + Vitamin D", brand: "Dabur", price: 225, originalPrice: 300, discount: 25, category: "vitamins", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop", prescription: false, description: "Bone health supplement" },
  { id: 12, name: "Thyroid Care Tea", brand: "Himalaya", price: 165, originalPrice: 220, discount: 25, category: "thyroid", image: "https://images.unsplash.com/photo-1599932887768-d6cb80133949?w=400&h=400&fit=crop", prescription: false, description: "Herbal tea for thyroid support" }
];

let products = [...fakeProducts];
let filteredProducts = [...fakeProducts];
let productGrid, sortSelect;

let currentFilters = {
  category: 'all',
  brand: 'all',
  discount: 'all',
  minPrice: 0,
  maxPrice: 5000
};

// ======================================================
document.addEventListener('DOMContentLoaded', () => {
  productGrid = document.getElementById('productGrid');
  sortSelect = document.getElementById('sortSelect');

  sessionStorage.setItem('currentPageProducts', JSON.stringify(fakeProducts));

  render(filteredProducts);
  updateResultsCount();
  initSlider();
  initSorting();
  initMobileSheets();
  initFilters();

  // ONE single delegated listener for the whole grid – solves the duplicate-heart bug
  productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const productId = Number(btn.dataset.id);
    toggleWishlist(productId, btn);
  });
});

// =============== CARD CREATION (now safe) ===============
function createCard(p) {
  const div = document.createElement('div');
  div.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer relative';

  const priceLine = p.originalPrice
    ? `₹${p.price} <s class="text-gray-400 text-sm">₹${p.originalPrice}</s> <span class="text-green-600 text-sm font-bold">${p.discount}% off</span>`
    : `₹${p.price}`;

  // check current wishlist state
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const isWishlisted = wishlist.some(item => item.id === p.id);

  div.innerHTML = `
    <div class="relative">
      <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover">
      
      <!-- Wishlist button – data-id is the only thing we need -->
      <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}">
        <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
      </button>
    </div>
    <div class="p-2">
      <h3 class="font-semibold text-sm">${p.name}</h3>
      <p class="text-xs text-gray-500 mt-1">${p.brand}</p>
      <div class="mt-2 font-bold text-lg text-green-600">${priceLine}</div>
      <button onclick="navigateToProductDetails(${p.id})" class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition">
        View Details
      </button>
    </div>
  `;
  return div;
}

// =============== WISHLIST TOGGLE (single listener ===============
function toggleWishlist(productId, buttonElement) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const product = products.find(p => p.id === productId);

  const index = wishlist.findIndex(item => item.id === productId);

  if (index === -1) {
    // add
    wishlist.push(product);
    buttonElement.classList.add('active');
    buttonElement.innerHTML = '<i class="fa-solid fa-heart"></i>';
  } else {
    // remove
    wishlist.splice(index, 1);
    buttonElement.classList.remove('active');
    buttonElement.innerHTML = '<i class="fa-regular fa-heart"></i>';
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // let header badge know that wishlist changed
  window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}

// =============== RENDER (unchanged except calling createCard) ===============
function render(list) {
  productGrid.innerHTML = ''; // clear
  if (list.length === 0) {
    productGrid.innerHTML = '<div class="col-span-full text-center py-20 text-gray-500 text-xl">No products found</div>';
    return;
  }
  list.forEach(p => productGrid.appendChild(createCard(p)));
}

function updateResultsCount() {
  const countEl = document.getElementById('resultsCount');
  if (countEl) {
    countEl.textContent = `${filteredProducts.length} products found`;
  }
  updateTitle();
}

function updateTitle() {
  const titleEl = document.querySelector('h2.text-3xl');
  if (!titleEl) return;

  const categoryNames = {
    'all': 'Lifestyle Disorder Products',
    'diabetes': 'Diabetes Care Products',
    'heart-bp': 'Heart & Blood Pressure Support',
    'thyroid': 'Thyroid Support Products',
    'vitamins': 'Vitamins & Supplements'
  };

  let title = categoryNames[currentFilters.category] || 'Lifestyle Disorder Products';

  // Add brand to title if selected
  if (currentFilters.brand !== 'all') {
    title += ` - ${currentFilters.brand}`;
  }

  titleEl.textContent = title;
}

// Apply Filters Function
function applyFilters() {
  filteredProducts = products.filter(product => {
    // Category filter
    if (currentFilters.category !== 'all' && product.category !== currentFilters.category) {
      return false;
    }

    // Brand filter
    if (currentFilters.brand !== 'all' && product.brand !== currentFilters.brand) {
      return false;
    }

    // Price filter
    if (product.price < currentFilters.minPrice || product.price > currentFilters.maxPrice) {
      return false;
    }

    // Discount filter
    if (currentFilters.discount !== 'all') {
      const requiredDiscount = parseInt(currentFilters.discount);
      if (product.discount < requiredDiscount) {
        return false;
      }
    }

    return true;
  });

  render(filteredProducts);
  updateResultsCount();
}

// Initialize Desktop Filters
function initFilters() {
  // Desktop form submit
  const desktopForm = document.getElementById('filterForm');
  if (desktopForm) {
    desktopForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      currentFilters.category = document.querySelector('input[name="category"]:checked')?.value || 'all';
      currentFilters.brand = document.querySelector('input[name="brand"]:checked')?.value || 'all';
      currentFilters.discount = document.querySelector('input[name="discount"]:checked')?.value || 'all';
      
      applyFilters();
    });

    // Live filter on radio change
    desktopForm.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        currentFilters.category = document.querySelector('input[name="category"]:checked')?.value || 'all';
        currentFilters.brand = document.querySelector('input[name="brand"]:checked')?.value || 'all';
        currentFilters.discount = document.querySelector('input[name="discount"]:checked')?.value || 'all';
        applyFilters();
      });
    });
  }

  // Mobile filters apply button
  const applyMobileBtn = document.getElementById('applyMobileFilters');
  if (applyMobileBtn) {
    applyMobileBtn.addEventListener('click', () => {
      currentFilters.category = document.querySelector('input[name="mobileCategory"]:checked')?.value || 'all';
      currentFilters.brand = document.querySelector('input[name="mobileBrand"]:checked')?.value || 'all';
      currentFilters.discount = document.querySelector('input[name="mobileDiscount"]:checked')?.value || 'all';
      
      applyFilters();
      closeFilterSheet();
    });
  }

  // Mobile clear filters
  const clearMobileBtn = document.getElementById('clearMobileFilters');
  if (clearMobileBtn) {
    clearMobileBtn.addEventListener('click', () => {
      document.querySelectorAll('input[name="mobileCategory"], input[name="mobileBrand"], input[name="mobileDiscount"]').forEach(radio => {
        if (radio.value === 'all') radio.checked = true;
      });
      
      // Reset desktop filters too
      document.querySelectorAll('input[name="category"], input[name="brand"], input[name="discount"]').forEach(radio => {
        if (radio.value === 'all') radio.checked = true;
      });

      currentFilters = {
        category: 'all',
        brand: 'all',
        discount: 'all',
        minPrice: 0,
        maxPrice: 5000
      };

      // Reset price sliders
      document.getElementById('minThumb').value = 0;
      document.getElementById('maxThumb').value = 5000;
      document.getElementById('mobileMinThumb').value = 0;
      document.getElementById('mobileMaxThumb').value = 5000;
      updateDesktopSlider();
      updateMobileSlider();

      applyFilters();
    });
  }
}

// Navigate to Product Details Page with URL parameters
window.navigateToProductDetails = function(id) {
  const product = products.find(p => p.id === id);
  if (!product) {
    console.error('Product not found with id:', id);
    return;
  }

  // Store current page name/category for reference
  const currentPageName = document.title || 'Lifestyle Disorder';
  
  sessionStorage.setItem('selectedProduct', JSON.stringify(product));
  sessionStorage.setItem('currentPageProducts', JSON.stringify(products));
  sessionStorage.setItem('currentPageName', currentPageName);

  const params = new URLSearchParams({
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice || '',
    discount: product.discount || '',
    image: product.image,
    description: product.description || '',
    prescription: product.prescription,
    category: product.category || '',
    sourcePage: currentPageName
  });

  window.location.href = `/productdetails.html?${params.toString()}`;
}

function initSorting() {
  sortSelect.addEventListener('change', () => {
    const val = sortSelect.value;
    let sorted = [...filteredProducts];
    if (val === 'price-low') sorted.sort((a,b) => a.price - b.price);
    if (val === 'price-high') sorted.sort((a,b) => b.price - a.price);
    if (val === 'rating') sorted.sort((a,b) => (b.rating || 0) - (a.rating || 0));
    if (val === 'newest') sorted.sort((a,b) => b.id - a.id);
    render(sorted);
  });

  // Mobile sort apply
  const applySortBtn = document.getElementById('applySortBtn');
  if (applySortBtn) {
    applySortBtn.addEventListener('click', () => {
      const selectedSort = document.querySelector('input[name="mobileSort"]:checked')?.value || 'default';
      sortSelect.value = selectedSort;
      sortSelect.dispatchEvent(new Event('change'));
      closeSortSheet();
    });
  }
}

// Desktop Price Slider
function initSlider() {
  const minThumb = document.getElementById('minThumb');
  const maxThumb = document.getElementById('maxThumb');
  const mobileMinThumb = document.getElementById('mobileMinThumb');
  const mobileMaxThumb = document.getElementById('mobileMaxThumb');

  const updateDesktopSlider = () => {
    const minVal = parseInt(minThumb.value);
    const maxVal = parseInt(maxThumb.value);
    
    if (minVal > maxVal - 200) {
      minThumb.value = maxVal - 200;
    }
    
    const fill = document.getElementById('desktopFill');
    if (fill) {
      fill.style.left = (minVal / 5000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 5000) * 100 + '%';
    }
    
    const minValue = document.getElementById('minValue');
    const maxValue = document.getElementById('maxValue');
    if (minValue) minValue.textContent = '₹' + minVal;
    if (maxValue) maxValue.textContent = '₹' + maxVal;
    
    currentFilters.minPrice = minVal;
    currentFilters.maxPrice = maxVal;
  };

  const updateMobileSlider = () => {
    const minVal = parseInt(mobileMinThumb.value);
    const maxVal = parseInt(mobileMaxThumb.value);
    
    if (minVal > maxVal - 200) {
      mobileMinThumb.value = maxVal - 200;
    }
    
    const fill = document.getElementById('mobileFill');
    if (fill) {
      fill.style.left = (minVal / 5000) * 100 + '%';
      fill.style.width = ((maxVal - minVal) / 5000) * 100 + '%';
    }
    
    const minValue = document.getElementById('mobileMinValue');
    const maxValue = document.getElementById('mobileMaxValue');
    if (minValue) minValue.textContent = '₹' + minVal;
    if (maxValue) maxValue.textContent = '₹' + maxVal;
    
    currentFilters.minPrice = minVal;
    currentFilters.maxPrice = maxVal;
  };

  if (minThumb && maxThumb) {
    minThumb.oninput = () => {
      updateDesktopSlider();
      applyFilters();
    };
    maxThumb.oninput = () => {
      updateDesktopSlider();
      applyFilters();
    };
    updateDesktopSlider();
  }

  if (mobileMinThumb && mobileMaxThumb) {
    mobileMinThumb.oninput = updateMobileSlider;
    mobileMaxThumb.oninput = updateMobileSlider;
    updateMobileSlider();
  }

  window.updateDesktopSlider = updateDesktopSlider;
  window.updateMobileSlider = updateMobileSlider;
}

// Mobile Sheets
function initMobileSheets() {
  const backdrop = document.getElementById('mobileSheetBackdrop');
  const filterSheet = document.getElementById('filterSheet');
  const sortSheet = document.getElementById('sortSheet');
  
  // Open Filter Sheet
  document.getElementById('openFilterSheet')?.addEventListener('click', () => {
    backdrop.classList.remove('hidden');
    filterSheet.classList.remove('translate-y-full');
  });

  // Close Filter Sheet
  const closeFilterSheet = () => {
    backdrop.classList.add('hidden');
    filterSheet.classList.add('translate-y-full');
  };

  document.getElementById('closeFilterSheet')?.addEventListener('click', closeFilterSheet);
  window.closeFilterSheet = closeFilterSheet;

  // Open Sort Sheet
  document.getElementById('openSortSheet')?.addEventListener('click', () => {
    backdrop.classList.remove('hidden');
    sortSheet.classList.remove('translate-y-full');
  });

  // Close Sort Sheet
  const closeSortSheet = () => {
    backdrop.classList.add('hidden');
    sortSheet.classList.add('translate-y-full');
  };

  document.getElementById('closeSortSheet')?.addEventListener('click', closeSortSheet);
  window.closeSortSheet = closeSortSheet;

  // Click backdrop to close
  backdrop.addEventListener('click', () => {
    closeFilterSheet();
    closeSortSheet();
  });
}

window.sortProducts = function(type) {
  sortSelect.value = type;
  sortSelect.dispatchEvent(new Event('change'));
  document.getElementById('mobileSheetBackdrop')?.click();
};