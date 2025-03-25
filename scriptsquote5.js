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

document.addEventListener('DOMContentLoaded', function() {
    const hoverArea = document.querySelector('.hoverarea');
    const mainText = document.getElementById('mainText');
    const leftText = document.getElementById('lefttext');
    const rightText = document.getElementById('righttext');

    hoverArea.addEventListener('mouseenter', function() {
        // Fade out the main text
        mainText.classList.remove('visible');
        mainText.classList.add('hidden');

        // Fade in the new text
        leftText.classList.remove('hidden');
        leftText.classList.add('visible');
        rightText.classList.remove('hidden');
        rightText.classList.add('visible');
    });

    hoverArea.addEventListener('mouseleave', function() {
        // Fade out the new text
        leftText.classList.remove('visible');
        leftText.classList.add('hidden');
        rightText.classList.remove('visible');
        rightText.classList.add('hidden');

        // Fade in the main text
        mainText.classList.remove('hidden');
        mainText.classList.add('visible');
    });
});


// test2

document.addEventListener('DOMContentLoaded', function() {
    const hoverArea = document.querySelector('.hoverarea');
    const body = document.body;
    let hoverTimeout;

    hoverArea.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        body.classList.add('hovered');
    });

    hoverArea.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
            body.classList.remove('hovered');
        }, 50);
    });
});

