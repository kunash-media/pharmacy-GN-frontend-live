// mother-product-details.js → 100% DYNAMIC FROM mother.js DATA

let currentProduct = null;
let quantity = 1;

const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
const selectedId = localStorage.getItem("selectedProductId");

function getStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) html += '<i class="fas fa-star text-yellow-400"></i>';
        else if (i === Math.ceil(rating) && rating % 1 >= 0.5) html += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
        else html += '<i class="far fa-star text-yellow-400"></i>';
    }
    return html;
}
function updateProductPage() {
    if (!currentProduct) return;

    // Basic Info
    document.getElementById('product-title').textContent = currentProduct.title;
    document.getElementById('breadcrumb-name').textContent = currentProduct.title.split(' (')[0];
    document.getElementById('mainImage').src = currentProduct.mainImageUrl;
    document.getElementById('product-description').textContent = currentProduct.description || "Premium quality product for mother care.";

    // Price
    document.getElementById('current-price').textContent = `₹${currentProduct.price}`;
    if (currentProduct.originalPrice) {
        document.getElementById('original-price').textContent = `₹${currentProduct.originalPrice}`;
        document.getElementById('discount-badge').textContent = `${currentProduct.discount}% OFF`;
        document.getElementById('discount-badge').classList.remove('hidden');
        document.getElementById('original-price').classList.remove('hidden');
    }

    // Rating
    document.getElementById('stars-small').innerHTML = getStars(currentProduct.rating || 4.5);
    document.getElementById('reviews-count').textContent = `(${currentProduct.reviewCount || 0} reviews)`;

    // Thumbnails
    const thumbContainer = document.getElementById('thumbnailContainer');
    thumbContainer.innerHTML = '';
    [currentProduct.mainImageUrl, currentProduct.mainImageUrl, currentProduct.mainImageUrl].forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src; img.className = 'thumbnail' + (i === 0 ? ' thumbnail-active' : '');
        img.onclick = () => {
            document.getElementById('mainImage').src = src;
            thumbContainer.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('thumbnail-active'));
            img.classList.add('thumbnail-active');
        };
        thumbContainer.appendChild(img);
    });

    // Key Features (you can extend product object with this if needed)
    const features = currentProduct.keyFeatures || [
        "Premium Quality", "Dermatologically Tested", "Safe for Daily Use", "Doctor Recommended"
    ];
    const kf = document.getElementById('key-features');
    kf.innerHTML = features.map(f => `<li><i class="fas fa-check text-green-600 mr-2"></i>${f}</li>`).join('');

    // Specifications (you can add specs object per product in mother.js if needed)
    const specs = currentProduct.specifications || {
        "Brand": currentProduct.brand || "Premium Brand",
        "Category": currentProduct.category,
        "Suitable For": "Pregnant & New Mothers",
        "Country of Origin": "India"
    };
    const specsList = document.getElementById('specifications-list');
    specsList.innerHTML = Object.entries(specs).map(([k, v]) => 
        `<div class="flex justify-between py-3 ${k !== Object.keys(specs)[Object.keys(specs).length-1] ? 'border-b' : ''}">
            <span class="font-medium">${k}</span><span>${v}</span>
        </div>`).join('');

    // Reviews
    document.getElementById('overall-rating').textContent = currentProduct.rating || 4.7;
    document.getElementById('stars-large').innerHTML = getStars(currentProduct.rating || 4.7);
    document.getElementById('review-summary').textContent = `Based on ${currentProduct.reviewCount || 342} reviews`;

    // Rating Bars (mock)
    document.getElementById('rating-bars').innerHTML = `
        <div class="flex items-center"><span class="w-12 text-sm">5</span><div class="flex-1 mx-3 rating-bar"><div class="rating-bar-fill w-9/12"></div></div><span class="text-sm text-gray-600">75%</span></div>
        <div class="flex items-center"><span class="w-12 text-sm">4</span><div class="flex-1 mx-3 rating-bar"><div class="rating-bar-fill w-2/12"></div></div><span class="text-sm text-gray-600">15%</span></div>
        <div class="flex items-center"><span class="w-12 text-sm">3</span><div class="flex-1 mx-3 rating-bar"><div class="rating-bar-fill w-1/12"></div></div><span class="text-sm text-gray-600">8%</span></div>
        <div class="flex items-center"><span class="w-12 text-sm">2</span><div class="flex-1 mx-3 rating-bar"><div class="rating-bar-fill w-1/20"></div></div><span class="text-sm text-gray-600">1%</span></div>
        <div class="flex items-center"><span class="w-12 text-sm">1</span><div class="flex-1 mx-3 rating-bar"><div class="rating-bar-fill w-0"></div></div><span class="text-sm text-gray-600">1%</span></div>
    `;

    // Top Reviews (mock or extend product.reviews)
    const topReviews = currentProduct.reviews || [
        { name: "Priya Sharma", rating: 5, text: "Excellent product! Highly recommend for new moms.", date: "2 weeks ago" },
        { name: "Anjali Verma", rating: 4, text: "Good quality and fast delivery. Satisfied!", date: "1 month ago" }
    ];
    document.getElementById('top-reviews').innerHTML = topReviews.map(r => `
        <div class="bg-gray-50 p-6 rounded-lg">
            <div class="flex items-center mb-3">
                <div class="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center text-pink-600 font-bold">${r.name[0]}</div>
                <div class="ml-4">
                    <h4 class="font-semibold">${r.name}</h4>
                    <div class="flex text-yellow-400">${getStars(r.rating)}</div>
                </div>
            </div>
            <p class="text-gray-700">"${r.text}"</p>
            <span class="text-sm text-gray-500 mt-2 block">Verified Purchase • ${r.date}</span>
        </div>
    `).join('');

    // Non-returnable note
    if (currentProduct.nonReturnable) {
        document.getElementById('non-returnable-note').classList.remove('hidden');
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    document.querySelectorAll("#cartCount, .cart-count").forEach(el => {
        if (el) {
            el.textContent = total;
            el.classList.toggle("hidden", total === 0);
        }
    });
}

function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    document.querySelectorAll("#wishlistCount, .wishlist-count").forEach(el => {
        if (el) {
            el.textContent = wishlist.length;
            el.classList.toggle("hidden", wishlist.length === 0);
        }
    });
}

function addToCart() {
    if (!currentProduct) return;

    const qty = parseInt(document.getElementById("quantity")?.textContent || "1");

    // Reuse exact same logic as mother.js
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(item => item.id === currentProduct.id);

    if (existing) {
        existing.quantity += qty;
    } else {
        cart.push({
            ...currentProduct,
            quantity: qty
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showToast("Added to Cart");

    // Update button to "Go to Bag"
    const btn = document.getElementById("addToCartBtn");
    btn.innerHTML = `<i class="fas fa-check mr-3"></i> Go to Bag`;
    btn.className = "flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-lg font-bold text-lg shadow-lg flex items-center justify-center";
    btn.onclick = () => window.location.href = "../cart.html";
}

function toggleWishlist() {
    if (!currentProduct) return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const index = wishlist.findIndex(p => p.id === currentProduct.id);

    if (index > -1) {
        wishlist.splice(index, 1);
        document.querySelector("#addToWishlistBtn i").className = "far fa-heart";
        showToast("Removed from Wishlist");
    } else {
        wishlist.push(currentProduct);
        document.querySelector("#addToWishlistBtn i").className = "fas fa-heart text-pink-600";
        showToast("Added to Wishlist");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
}

// Toast (same as mother.js)
function showToast(msg) {
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.className = "fixed bottom-24 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full z-50 shadow-2xl text-sm font-medium";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

// Quantity Controls
function setupQuantity() {
    let qty = 1;
    const display = document.getElementById("quantity");

    document.getElementById("increaseQty")?.addEventListener("click", () => {
        qty++;
        display.textContent = qty;
    });

    document.getElementById("decreaseQty")?.addEventListener("click", () => {
        if (qty > 1) qty--;
        display.textContent = qty;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (!selectedId || allProducts.length === 0) {
        alert("Product not found!");
        return;
    }

    currentProduct = allProducts.find(p => p.id == selectedId);
    if (!currentProduct) return;

    updateProductPage();

    document.getElementById("increaseQty").onclick = () => { quantity++; document.getElementById("quantity").textContent = quantity; };
    document.getElementById("decreaseQty").onclick = () => { if (quantity > 1) { quantity--; document.getElementById("quantity").textContent = quantity; }};
    document.getElementById("addToCartBtn").onclick = addToCart;
    document.getElementById("addToWishlistBtn").onclick = toggleWishlist;

    // Tabs
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('[id$="Content"]').forEach(c => c.classList.add('hidden'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + 'Content').classList.remove('hidden');
        };
    });

    // Accordion
    document.querySelectorAll('.accordion-header').forEach(h => {
        h.onclick = () => {
            h.nextElementSibling.classList.toggle('active');
            h.querySelector('i').classList.toggle('rotate-180');
        };
    });

    // Wishlist icon
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishlist.some(p => p.id === currentProduct.id)) {
        document.querySelector("#addToWishlistBtn i").className = "fas fa-heart text-pink-600";
    }
});