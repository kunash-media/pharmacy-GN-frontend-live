// cart-manager.js - Save this in your project root or js folder
class CartManager {
    constructor() {
        this.CART_STORAGE_KEY = 'cart';
        this.ORDERS_STORAGE_KEY = 'sweetOrders';
    }

    // Get cart from localStorage
    getCart() {
        try {
            return JSON.parse(localStorage.getItem(this.CART_STORAGE_KEY)) || [];
        } catch (e) {
            console.error('Error reading cart:', e);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart(cart) {
        try {
            localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
            this.updateCartCount(cart);
            this.dispatchCartChangeEvent();
            return true;
        } catch (e) {
            console.error('Error saving cart:', e);
            return false;
        }
    }

    // Clear cart completely
    clearCart() {
        localStorage.removeItem(this.CART_STORAGE_KEY);
        this.updateCartCount([]);
        this.dispatchCartChangeEvent();
    }

    // Add item to cart
    addToCart(product) {
        const cart = this.getCart();
        const existingIndex = cart.findIndex(item => 
            item.id === product.id && 
            item.size === product.size
        );
        
        if (existingIndex >= 0) {
            // Update quantity if item exists
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + (product.quantity || 1);
        } else {
            // Add new item
            cart.push({
                ...product,
                quantity: product.quantity || 1
            });
        }
        
        return this.saveCart(cart);
    }

    // Remove item from cart
    removeFromCart(index) {
        const cart = this.getCart();
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            return this.saveCart(cart);
        }
        return false;
    }

    // Update item quantity
    updateQuantity(index, newQuantity) {
        const cart = this.getCart();
        if (index >= 0 && index < cart.length) {
            cart[index].quantity = Math.max(1, Math.min(10, newQuantity));
            return this.saveCart(cart);
        }
        return false;
    }

    // Calculate cart total
    calculateTotal() {
        const cart = this.getCart();
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += (item.price || 0) * (item.quantity || 1);
        });
        const shipping = subtotal >= 799 ? 0 : 49;
        return {
            subtotal: subtotal,
            shipping: shipping,
            total: subtotal + shipping,
            items: cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
        };
    }

    // Update cart count in header
    updateCartCount(cart = null) {
        if (!cart) cart = this.getCart();
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        // Update all cart count elements
        document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, #cart-count, #cartItemsCount, .cart-count').forEach(el => {
            if (el) {
                el.textContent = totalItems;
                el.style.display = totalItems > 0 ? 'inline-flex' : 'none';
            }
        });

        // Update cart badge
        const badge = document.getElementById('cart-count-badge');
        if (badge) {
            badge.classList.toggle('hidden', totalItems === 0);
            const countSpan = badge.querySelector('#cart-count');
            if (countSpan) countSpan.textContent = totalItems;
        }
    }

    // Dispatch event when cart changes
    dispatchCartChangeEvent() {
        window.dispatchEvent(new CustomEvent('cartChanged', {
            detail: { cart: this.getCart() }
        }));
    }

    // Save order to history
    saveOrder(paymentMethod, address) {
        const cart = this.getCart();
        if (cart.length === 0) return null;

        const orderId = Date.now();
        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0];
        
        const order = {
            id: orderId,
            placedOn: formattedDate,
            timestamp: now.getTime(),
            status: 'placed',
            items: cart.map(item => ({
                name: item.name || 'Product',
                qty: item.quantity || 1,
                price: item.price || 0,
                img: item.image || 'https://via.placeholder.com/120?text=Product',
                weight: item.size || '1 unit'
            })),
            total: this.calculateTotal().total,
            paymentMethod: paymentMethod,
            address: address || {},
            itemCount: cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
        };
        
        // Get existing orders
        let existingOrders = JSON.parse(localStorage.getItem(this.ORDERS_STORAGE_KEY) || '[]');
        existingOrders.push(order);
        localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
        
        // Clear cart after successful order
        this.clearCart();
        
        return orderId;
    }
}

// Create global instance
window.cartManager = new CartManager();