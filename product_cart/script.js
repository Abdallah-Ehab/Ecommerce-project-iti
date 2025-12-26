const cartItemsContainer = document.getElementById('cartItems');
const emptyCartDiv = document.getElementById('emptyCart');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const cartBadge = document.getElementById('cartBadge');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
    }
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartDiv.style.display = 'flex';
        document.querySelector('.cartContent').style.display = 'none';
        updateCartBadge();
        return;
    }

    emptyCartDiv.style.display = 'none';
    document.querySelector('.cartContent').style.display = 'grid';

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cartItem" style="animation-delay: ${index * 100}ms">
            <div class="itemImage">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="itemDetails">
                <h3 class="itemName">${item.name}</h3>
                <div class="itemColor">
                    <span>Color:</span>
                    <div class="colorIndicator" style="background: ${getColorCode(item.color)}"></div>
                    <span>${item.color}</span>
                </div>
                <div class="itemPrice">$${item.price.toFixed(2)}</div>
            </div>
            <div class="itemActions">
                <div class="quantityControl">
                    <button class="quantityBtn" onclick="updateQuantity(${index}, -1)">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <span class="quantityValue">${item.quantity}</span>
                    <button class="quantityBtn" onclick="updateQuantity(${index}, 1)">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <button class="removeBtn" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                    <span>Remove</span>
                </button>
            </div>
        </div>
    `).join('');

    updateSummary();
    updateCartBadge();
}


function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : subtotal > 0 ? 10 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = shipping === 0 && subtotal > 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

document.querySelector('.checkoutBtn')?.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Proceeding to checkout...\nTotal: ' + totalEl.textContent);
    }
});

renderCart();
