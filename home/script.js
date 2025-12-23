const carousel = document.querySelector(".carousel");

let isDragging = false;
let startX;
let startScrollLeft;

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    e.preventDefault();
    const currentX = e.pageX;
    const distance = currentX - startX;

    carousel.scrollLeft = startScrollLeft - distance;
});

carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
});

carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
});
