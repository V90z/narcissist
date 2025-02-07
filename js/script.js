let currentIndex = 0;
const sections = document.querySelectorAll(".section");
let isScrolling = false;
let touchStartY = 0;
let touchEndY = 0;

// Scroll to the correct section
function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true;
    currentIndex = index;

    sections[index].scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
        isScrolling = false;
    }, 700); // Slightly increased delay for smoother transitions
}

// Handle mouse scroll (Desktop)
document.addEventListener("wheel", (event) => {
    if (isScrolling) return;
    event.preventDefault(); // Stop default scrolling
    if (event.deltaY > 0) {
        scrollToSection(currentIndex + 1);
    } else {
        scrollToSection(currentIndex - 1);
    }
}, { passive: false });

// Handle keyboard navigation (Desktop)
document.addEventListener("keydown", (event) => {
    if (isScrolling) return;
    if (event.key === "ArrowDown") {
        scrollToSection(currentIndex + 1);
    } else if (event.key === "ArrowUp") {
        scrollToSection(currentIndex - 1);
    }
});

// Handle touch swipes (Mobile)
document.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
});

document.addEventListener("touchend", (event) => {
    touchEndY = event.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    const threshold = 50; // Minimum swipe distance to trigger scrolling

    if (isScrolling) return;

    if (swipeDistance > threshold) {
        scrollToSection(currentIndex + 1); // Swipe up → Scroll down
    } else if (swipeDistance < -threshold) {
        scrollToSection(currentIndex - 1); // Swipe down → Scroll up
    }
}

// Prevent default touch scrolling but allow smooth swipe detection
document.addEventListener("touchmove", (event) => {
    event.preventDefault();
}, { passive: false });
