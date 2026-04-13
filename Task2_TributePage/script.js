// SLIDER
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
    index = (index + 1) % slides.length;
}

setInterval(showSlide, 3000);

// SCROLL ANIMATION
let sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        let top = section.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
            section.classList.add("show");
        }
    });
});