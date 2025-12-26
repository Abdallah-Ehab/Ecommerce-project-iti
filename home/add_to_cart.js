
const productCards = document.querySelectorAll(".productCard");



productCards.forEach((card) => {
    const addBtn = card.querySelector(".addToCart");
    const viewBtn = card.querySelector(".viewProduct");
    
    const productData = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: parseFloat(card.dataset.price),
        image: card.querySelector('.productImage img').src,
        color: 'black',
        quantity: 1
    };

    addBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        
        if (CartManager.addItem(productData)) {
            const originalText = addBtn.innerHTML;
            addBtn.innerHTML = '<i class="fa-solid fa-check"></i><span>Added!</span>';
            addBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                addBtn.innerHTML = originalText;
                addBtn.style.background = '';
            }, 1500);
        }
    });

    viewBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `../product_details/index.html?id=${productData.id}`;
    });
});