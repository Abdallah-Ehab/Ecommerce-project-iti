const carousel = document.querySelector(".carousel");
const arrowLeft = document.querySelector(".arrowLeft");
const arrowRight = document.querySelector(".arrowRight");


let isDragging = false;
let startX;
let startScrollLeft;

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    carousel.style.cursor = "grabbing";
});

carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const currentX = e.pageX;
    const distance = currentX - startX;
    const cardWidth = carousel.querySelector(".card").offsetWidth + 24;
    const maxDragDistance = cardWidth * 3;
    const clampedDistance = Math.max(-maxDragDistance, Math.min(maxDragDistance, distance));
    
    carousel.scrollLeft = startScrollLeft - clampedDistance;
});

carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
    carousel.style.cursor = "grab";
});

carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
    carousel.style.cursor = "grab";
});

const scrollCarousel = (direction) => {
    const cardWidth = carousel.querySelector(".card").offsetWidth + 24;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    
    carousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
    });
};

arrowLeft.addEventListener("click", () => scrollCarousel("left"));
arrowRight.addEventListener("click", () => scrollCarousel("right"));

carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") scrollCarousel("left");
    if (e.key === "ArrowRight") scrollCarousel("right");
});



