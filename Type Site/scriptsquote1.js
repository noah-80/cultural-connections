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


// wall

document.addEventListener('DOMContentLoaded', function() {
    const hoverArea = document.querySelector('.hoverarea');
    const originalText = document.querySelector('.original-text');
    const newText = document.querySelector('.new-text');

    hoverArea.addEventListener('mouseenter', function() {
        originalText.style.opacity = '0';
        newText.style.opacity = '1';
    });

    hoverArea.addEventListener('mouseleave', function() {
        originalText.style.opacity = '1';
        newText.style.opacity = '0';
    });
});

// Proposed script for whole highlight

document.addEventListener('DOMContentLoaded', function() {
    const hoverarea = document.querySelector('.hoverarea');
    const fuzzyBackground = document.querySelector('.fuzzy-background');
    
    // Function to animate width
    function animateWidth(element, targetWidth, duration) {
        const startWidth = parseFloat(getComputedStyle(element).width);
        const changeInWidth = targetWidth - startWidth;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Easing function
                element.style.width = (startWidth + changeInWidth * easeProgress) + 'px';
                requestAnimationFrame(update);
            } else {
                element.style.width = targetWidth + 'px';
            }
        }
        
        requestAnimationFrame(update);
    }

    // Event listeners for hover
    hoverarea.addEventListener('mouseenter', function() {
        animateWidth(fuzzyBackground, 912, 200); // Animate to 912px over 500ms
    });

    hoverarea.addEventListener('mouseleave', function() {
        animateWidth(fuzzyBackground, 260, 200); // Animate back to 260px over 500ms
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hoverarea = document.querySelector('.hoverarea');
    const fuzzyBackground = document.querySelector('.fuzzy-background');

    hoverarea.addEventListener('mouseenter', () => {
        fuzzyBackground.style.animationPlayState = 'paused'; // Stop pulse
    });

    hoverarea.addEventListener('mouseleave', () => {
        fuzzyBackground.style.animationPlayState = 'running'; // Resume pulse
    });
});
