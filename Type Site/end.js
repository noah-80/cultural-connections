// scripts.js

// Function to navigate to the next or previous story
function navigateStory(direction) {
    // Get the current page name from the URL (e.g., "index.html", "2.html", "3.html", etc.)
    let currentPage = window.location.pathname.split('/').pop(); // Get the current page name (e.g., "index.html", "2.html", etc.)

    // Hard-code navigation for 2.html, if left arrow is pressed, go directly to index.html
    if (currentPage === '2.html' && direction === 'left') {
        window.location.href = 'index.html'; // Always go to index.html if we're on 2.html and left arrow is pressed
        return;
    }

    // Handle navigation normally for other pages
    let currentStoryNumber = 1; // Default to 1 for index.html
    if (currentPage !== 'index.html') {
        currentStoryNumber = parseInt(currentPage.split('.')[0]);  // Extract the story number from the URL
    }

    // Adjust the story number based on the direction (left or right)
    if (direction === 'left') {
        // Prevent navigating left from story 1 (index.html)
        if (currentStoryNumber === 1) {
            return; // Do nothing if we're on index.html and left arrow is pressed
        } else {
            currentStoryNumber--; // Go to the previous story
        }
    } else if (direction === 'right') {
        // If we're on page 33, move to index.html
        if (currentStoryNumber === 33) {
            window.location.href = 'index.html'; // Navigate back to index.html when right arrow is pressed on story 33
            return;
        } else {
            currentStoryNumber++; // Go to the next story
        }
    }

    // Navigate to the appropriate page
    window.location.href = `${currentStoryNumber}.html`;
}

// Listen for keypress events for left and right arrow keys
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        navigateStory('left');  // Navigate left when the left arrow key is pressed
    } else if (event.key === 'ArrowRight') {
        navigateStory('right'); // Navigate right when the right arrow key is pressed
    }
});

// test

document.addEventListener('DOMContentLoaded', function () {
    const smallRectangle = document.getElementById('smallrectangle');
    const title = document.querySelector('.title');
    let animationFrame;
    let currentSize = 120;
    let isHovered = false;

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateSize(targetSize, duration, callback) {
        const startSize = currentSize;
        const startTime = performance.now();
        
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            currentSize = startSize + (targetSize - startSize) * easedProgress;
            smallRectangle.style.width = `${currentSize}px`;
            smallRectangle.style.height = `${currentSize}px`;

            if (progress < 1) {
                animationFrame = requestAnimationFrame(update);
            } else {
                currentSize = targetSize;
                smallRectangle.style.width = `${targetSize}px`;
                smallRectangle.style.height = `${targetSize}px`;
                
                if (callback) callback();
            }
        }

        animationFrame = requestAnimationFrame(update);
    }

    function startPulseAnimation() {
        let growing = true;
        const minSize = 120;
        const maxSize = 160;
        const duration = 1500;

        function pulse() {
            if (isHovered) return; // Stop pulsing if hovered
            const targetSize = growing ? maxSize : minSize;
            animateSize(targetSize, duration / 2, () => {
                growing = !growing;
                if (!isHovered) requestAnimationFrame(pulse);
            });
        }

        pulse();
    }

    startPulseAnimation();

    title.addEventListener('mouseenter', function () {
        isHovered = true;
        cancelAnimationFrame(animationFrame);
        animateSize(600, 500);
    });

    title.addEventListener('mouseleave', function () {
        isHovered = false;
        animateSize(120, 500, startPulseAnimation);
    });
});
