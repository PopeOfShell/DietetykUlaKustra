export function initHomeSlider(app) {
    const track = app.querySelector(".heroTrack");
    const slides = app.querySelectorAll(".heroSlide");
    const prevButton = app.querySelector(".heroArrowLeft");
    const nextButton = app.querySelector(".heroArrowRight");

    if (!track || slides.length === 0 || !prevButton || !nextButton) {
        return;
    }

    let currentIndex = 0;

    function updateSlider() {
        const offset = currentIndex * -100;
        track.style.transform = "translateX(" + offset + "%)";
    }

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex = currentIndex - 1;
        } else {
            currentIndex = slides.length - 1;
        }

        updateSlider();
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < slides.length - 1) {
            currentIndex = currentIndex + 1;
        } else {
            currentIndex = 0;
        }

        updateSlider();
    });

    updateSlider();
}
