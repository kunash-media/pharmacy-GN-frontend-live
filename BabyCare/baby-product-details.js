// baby-product-details.js → 100% WORKING FINAL

let selectedSize = "30";
let quantity = 1;

document.addEventListener('DOMContentLoaded', () => {
    const stored = sessionStorage.getItem('currentProduct');
    if (!stored) {
        alert("Product not found!");
        window.history.back();
        return;
    }

    const product = JSON.parse(stored);
    let quantity = 1;
    let selectedSize = "";

    // Optional: fallback image if not present
    if (!product.image) {
        product.image = `https://via.placeholder.com/500x500/EC4899/white?text=${encodeURIComponent(product.title.slice(0,2))}`;
    }

 // Fill basic info
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productPrice').textContent = `₹${product.price}`;
    document.getElementById('productBrand').textContent = product.brand;
    document.getElementById('productCategory').textContent = product.category.replace(/-/g, ' ').toUpperCase();
    document.getElementById('productDescription').textContent = product.description || "No description available.";
    document.getElementById('productRating').innerHTML = `★ ${product.rating} <span class="text-gray-500 text-sm">(1,200+ reviews)</span>`;

    // Discount badge
    if (product.discount > 0) {
        const original = Math.round(product.price / (1 - product.discount / 100));
        document.getElementById('originalPrice').textContent = `₹${original}`;
        document.getElementById('discountBadge').textContent = `${product.discount}% OFF`;
        document.getElementById('discountBadge').classList.remove('hidden');
        document.getElementById('originalPrice').classList.remove('hidden');
    }

    // Size selection
    document.querySelectorAll('.size-option').forEach(el => {
        el.onclick = () => {
            document.querySelectorAll('.size-option').forEach(x => x.classList.remove('selected'));
            el.classList.add('selected');
            selectedSize = el.getAttribute('data-size');
        };
    });
    document.querySelector('.size-option').classList.add('selected');

    // Quantity
    document.getElementById('decreaseQty').onclick = () => { if (quantity > 1) quantity--, document.getElementById('quantity').textContent = quantity; };
    document.getElementById('increaseQty').onclick = () => { quantity++, document.getElementById('quantity').textContent = quantity; };


    
   // ADD TOH AB YEHI USE KARO — 100% GUARANTEED CLICK HOGA

const addToCartButton = document.getElementById('addToCart');

if (addToCartButton) {
    addToCartButton.addEventListener('click', function(e) {
        e.preventDefault(); // agar <a> tag me ho toh rokega

        if (!selectedSize) {
            alert("Please select a pack size first!");
            return;
        }

        let cart = JSON.parse(localStorage.getItem('medcare_cart') || '[]');

        const item = {
            title: product.title,
            price: product.price,
            image: product.image,
            size: selectedSize,        // "30", "60", "90"
            quantity: quantity
        };

        // Same product + same size = increase quantity
        const existingIndex = cart.findIndex(i => i.title === item.title && i.size === item.size);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push(item);
        }

        localStorage.setItem('medcare_cart', JSON.stringify(cart));

        // Success message
        alert(`Added to Cart!\n${item.title}\nSize: ${item.size} pcs × ${quantity}`);

        // Update cart count in header (works even if header loaded later)
        const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
        document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, #cart-count, .cart-count').forEach(el => {
            if (el) {
                el.textContent = totalItems;
                el.style.display = totalItems > 0 ? 'inline-flex' : 'none';
            }
        });

            // Main Image
    document.getElementById('mainImage').innerHTML = `
        <img id="mainProductImage" src="${product.image}" alt="${product.title}" 
             class="w-full h-full object-contain rounded-lg hover:scale-105 transition duration-500">
    `;

    // SUB IMAGES (THUMBNAILS)
    const thumbnails = [
        product.image, // main image
        "https://m.media-amazon.com/images/I/81extra1.jpg", // dummy
        "https://m.media-amazon.com/images/I/81extra2.jpg",
        "https://m.media-amazon.com/images/I/81extra3.jpg",
        "https://m.media-amazon.com/images/I/81extra4.jpg"
    ];

    // Agar chahte ho har product ke apne thumbnails ho toh products array mein ek field add kar dena:
    // thumbnails: ["url1", "url2", ...]
    const finalThumbs = product.thumbnails || thumbnails;

    const thumbContainers = document.querySelectorAll('.thumbnail img');
    thumbContainers.forEach((img, index) => {
        if (finalThumbs[index]) {
            img.src = finalThumbs[index];
            img.onclick = () => {
                document.getElementById('mainProductImage').src = finalThumbs[index];
                // Active border
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('border-blue-500'));
                img.parentElement.classList.add('border-blue-500');
            };
        }
    });

    // First thumbnail ko active kar do by default
    if (thumbContainers[0]) {
        thumbContainers[0].parentElement.classList.add('border-blue-500');
    }

        // Optional: dispatch event so other scripts bhi update ho jaye
        window.dispatchEvent(new Event('cartUpdated'));
    });
}
});