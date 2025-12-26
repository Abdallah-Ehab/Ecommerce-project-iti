
const CartManager = {
    getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    },

    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateAllBadges();
    },

    addItem(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => 
            item.id === product.id && item.color === product.color
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            cart.push(product);
        }

        this.saveCart(cart);
        return true;
    },

    getTotalItems() {
        const cart = this.getCart();
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    updateAllBadges() {
        const totalItems = this.getTotalItems();
        const badges = document.querySelectorAll('.cartBadge');
        badges.forEach(badge => {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }
};

// Update cart badge on page load
document.addEventListener('DOMContentLoaded', () => {
    CartManager.updateAllBadges();
});
