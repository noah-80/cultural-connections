// Function to navigate to the next or previous story
function navigateStory(direction) {
    let currentPage = window.location.pathname.split('/').pop();

    if (currentPage === '2.html' && direction === 'left') {
        window.location.href = 'index.html';
        return;
    }

    let currentStoryNumber = 1;
    if (currentPage !== 'index.html') {
        currentStoryNumber = parseInt(currentPage.split('.')[0]);
    }

    if (direction === 'left') {
        if (currentStoryNumber === 1) {
            return;
        } else {
            currentStoryNumber--;
        }
    } else if (direction === 'right') {
        if (currentStoryNumber === 33) {
            window.location.href = 'index.html';
            return;
        } else {
            currentStoryNumber++;
        }
    }

    window.location.href = `${currentStoryNumber}.html`;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        navigateStory('left');
    } else if (event.key === 'ArrowRight') {
        navigateStory('right');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.title');
    const smallRectangle = document.getElementById('smallrectangle');
    let expansionTimeout;

    title.addEventListener('mouseenter', () => {
        clearTimeout(expansionTimeout);

        const expandRectangle = () => {
            smallRectangle.style.width = '750px';
            smallRectangle.style.height = '750px';
        };

        const computedStyle = window.getComputedStyle(smallRectangle);
        const currentWidth = parseFloat(computedStyle.width);
        const currentHeight = parseFloat(computedStyle.height);

        if (Math.abs(currentWidth - 120) < 5 && Math.abs(currentHeight - 120) < 5) {
            expandRectangle();
        } else {
            smallRectangle.classList.add('rapid-glow');
            expansionTimeout = setTimeout(expandRectangle, 300);
        }
    });

    title.addEventListener('mouseleave', () => {
        clearTimeout(expansionTimeout);
        
        smallRectangle.style.width = '120px';
        smallRectangle.style.height = '120px';
        smallRectangle.classList.remove('rapid-glow');
    });
});
