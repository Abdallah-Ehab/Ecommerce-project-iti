const thumbnails = document.querySelectorAll('.thumbnail');
const currentImage = document.getElementById('currentImage');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const quantityInput = document.getElementById('quantity');
const colorBtns = document.querySelectorAll('.colorBtn');
const addToCartBtn = document.querySelector('.addToCartBtn');
const wishlistBtn = document.querySelector('.wishlistBtn');

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id') || '1';

const products = {
    '1': { name: 'Luxury Watch', price: 299.99 },
    '2': { name: 'Designer Bag', price: 459.99 },
    '3': { name: 'Premium Shoes', price: 189.99 }
};

const currentProduct = products[productId] || products['1'];

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
        currentImage.src = thumbnail.src.replace('150x150', '600x600');
    });
});

decreaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    const maxValue = parseInt(quantityInput.max);
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
    }
});

colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    const color = document.querySelector('.colorBtn.active').dataset.color;
    
    const product = {
        id: productId,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentImage.src,
        color: color,
        quantity: quantity
    };
    
    if (CartManager.addItem(product)) {
        addToCartBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Added to Cart!</span>';
        addToCartBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            addToCartBtn.innerHTML = '<i class="fa-solid fa-cart-plus"></i><span>Add to Cart</span>';
            addToCartBtn.style.background = '';
        }, 2000);
    }
});

wishlistBtn.addEventListener('click', () => {
    wishlistBtn.classList.toggle('active');
    const icon = wishlistBtn.querySelector('i');
    
    if (wishlistBtn.classList.contains('active')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
    }
});