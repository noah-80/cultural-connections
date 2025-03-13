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

// moving back and forth

document.addEventListener('DOMContentLoaded', function () {
    const fuzzyElement = document.querySelector('.fuzzy');
    let isAtTop = false; // Track the current state

    fuzzyElement.addEventListener('mouseenter', function () {
        if (isAtTop) {
            fuzzyElement.classList.remove('fuzzy-up'); // Move back to top: 55%
        } else {
            fuzzyElement.classList.add('fuzzy-up'); // Move to top: 46%
        }
        isAtTop = !isAtTop; // Toggle the state
    });
});
