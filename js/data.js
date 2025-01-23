// Variable to store the previous shuffle index
let previousIndexes = [];

// Function to shuffle Swiper slides with a unique order
function shuffleSlides() {
    const swiperWrapper = $('.blog_onecol_carousel .swiper-wrapper');
    const slides = swiperWrapper.children('.swiper-slide').toArray();

    let indexes, newOrder;

    do {
        // Generate a shuffled array of indexes
        indexes = Array.from(slides.keys());
        indexes.sort(() => 0.5 - Math.random());

        // Create a new slide order using the shuffled indexes
        newOrder = indexes.map(index => slides[index]);
    } while (JSON.stringify(indexes) === JSON.stringify(previousIndexes));

    // Update the previous shuffle order
    previousIndexes = indexes;

    console.log("New shuffle indexes:", indexes); // Debug log

    // Empty the wrapper and append the shuffled slides
    swiperWrapper.empty().append(newOrder);

    // Update the Swiper instance after the shuffle
    if (blogOneColCarousel) {
        blogOneColCarousel.update();  // Update Swiper to reflect the changes
    }
}

// Function to initialize Swiper
let blogOneColCarousel;

function initBlogCarousel() {
    console.log("Initializing Swiper...");
    blogOneColCarousel = new Swiper(".blog_onecol_carousel", {
        loop: true, // Enable looping
        speed: 1000, // Slide transition speed (in ms)
        spaceBetween: 5, // Space between slides
        navigation: {
            nextEl: ".b1cc-swiper-button-next", // Next button selector
            prevEl: ".b1cc-swiper-button-prev", // Previous button selector
        },
        autoplay: {
            delay: 4000, // Delay between slides (in ms)
            disableOnInteraction: false, // Continue autoplay after user interaction
        },
        pagination: {
            el: ".b1cc-swiper-pagination", // Pagination element
            clickable: true, // Make pagination dots clickable
        },
        on: {
            // Shuffle slides when transitioning back to the first slide dynamically
            transitionEnd: function () {
                if (this.realIndex === 0) { 
                    console.log("Reached the first slide, reshuffling...");
                    shuffleSlides(); // Shuffle slides dynamically when returning to the first slide
                }
            },
        },
    });

    console.log("Swiper initialized:", blogOneColCarousel); // Debug log
}

// Document ready
$(document).ready(function () {
    console.log("Page loaded, starting setup...");
    shuffleSlides(); // Initial shuffle
    initBlogCarousel(); // Initialize Swiper
});

