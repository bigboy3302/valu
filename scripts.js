//const menuButtons = document.querySelectorAll('.menu-button');
const burgerMenu = document.getElementById('burgerMenu');
const darkModeButton = document.getElementById('darkModeButton');
const background = document.getElementById('background');
const imgBox = document.getElementById('imgBox');
const surpriseImages = document.querySelectorAll('.surpriseImage'); // Select all surprise images
let currentImageIndex = -1; // Initialize index for the current image

// Function to toggle menu visibility and randomize button positions
function toggleMenu() {
    menuButtons.forEach(button => {
        button.classList.toggle('show');
        if (button.classList.contains('show')) {
            // Get random positions within the viewport
            const x = Math.random() * (window.innerWidth - 100); // 100 is a rough estimate for button width
            const y = Math.random() * (window.innerHeight - 50); // 50 is a rough estimate for button height
            button.style.position = 'absolute'; // Allow absolute positioning
            button.style.left = `${x}px`;
            button.style.top = `${y}px`;
        }
    });
}

// Function to toggle dark mode and show/hide the surprise image
function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle('dark-mode'); // Toggle dark mode class

    // Show or hide the surprise image based on dark mode status
    if (isDarkMode) {
        imgBox.style.display = 'block'; // Show the image box
        darkModeButton.textContent = 'bff'; // Change button text to Light Mode
        showNextImage(); // Show the next image
        startSurpriseAnimation(); // Start jumping animation
    } else {
        imgBox.style.display = 'none'; // Hide the image box
        darkModeButton.textContent = 'bff'; // Change button text to Dark Mode
        stopSurpriseAnimation(); // Stop jumping animation
    }
}

// Function to show the next image
function showNextImage() {
    // Hide all images
    surpriseImages.forEach(img => {
        img.style.display = 'none';
    });

    // Update the current image index
    currentImageIndex = (currentImageIndex + 1) % surpriseImages.length; // Loop back to 0 when reaching the end
    surpriseImages[currentImageIndex].style.display = 'block'; // Show the next image
}

// Variables for animation
let jumpInterval;

// Function to make the surprise image jump around
function startSurpriseAnimation() {
    const boxSize = 100; // Size of the image box
    const maxWidth = window.innerWidth - boxSize;
    const maxHeight = window.innerHeight - boxSize;

    // Make the image jump around
    jumpInterval = setInterval(() => {
        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;
        imgBox.style.left = `${randomX}px`;
        imgBox.style.top = `${randomY}px`;
    }, 500); // Change position every 500ms
}

// Function to stop the surprise animation
function stopSurpriseAnimation() {
    clearInterval(jumpInterval); // Stop the jump interval
}

// Event listener for the burger menu button
burgerMenu.addEventListener('click', toggleMenu);

// Event listener for the dark mode button
darkModeButton.addEventListener('click', toggleDarkMode);
