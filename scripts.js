const menuButtons = document.querySelectorAll('.menu-button');
const burgerMenu = document.getElementById('burgerMenu');
const darkModeButton = document.getElementById('darkModeButton');
const background = document.getElementById('background');
const imgBox = document.getElementById('imgBox');
const surpriseImages = document.querySelectorAll('.surpriseImage');
let currentImageIndex = -1;

// Function to toggle menu visibility and randomize button positions
function toggleMenu() {
    menuButtons.forEach(button => {
        button.classList.toggle('show');
        if (button.classList.contains('show')) {
            // Get random positions within the viewport
            const x = Math.random() * (window.innerWidth - 120); // Adjusted width
            const y = Math.random() * (window.innerHeight - 60); // Adjusted height
            button.style.position = 'absolute';
            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
        } else {
            button.style.left = ''; // Reset left position
            button.style.top = ''; // Reset top position
        }
        console.log(button); // Debugging to check button state
    });
}

// Function to toggle dark mode and show/hide the surprise image
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode'); // Changed class name for clarity

    if (isDarkMode) {
        imgBox.style.display = 'block';
        darkModeButton.textContent = 'BFF'; // Updated text for clarity
        showNextImage();
        startSurpriseAnimation();
    } else {
        imgBox.style.display = 'none';
        darkModeButton.textContent = 'BFF'; // Updated text for clarity
        stopSurpriseAnimation();
    }
}

// Function to show the next image
function showNextImage() {
    surpriseImages.forEach(img => {
        img.style.display = 'none';
    });
    currentImageIndex = (currentImageIndex + 1) % surpriseImages.length;
    surpriseImages[currentImageIndex].style.display = 'block';
}

let jumpInterval;

// Function to make the surprise image jump around
function startSurpriseAnimation() {
    const boxSize = 100;
    const maxWidth = window.innerWidth - boxSize;
    const maxHeight = window.innerHeight - boxSize;

    jumpInterval = setInterval(() => {
        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;
        imgBox.style.left = `${randomX}px`;
        imgBox.style.top = `${randomY}px`;
    }, 500);
}

// Function to stop the surprise animation
function stopSurpriseAnimation() {
    clearInterval(jumpInterval);
}

// Event listener for the burger menu button
burgerMenu.addEventListener('click', toggleMenu);

// Event listener for the dark mode button
darkModeButton.addEventListener('click', toggleDarkMode);
