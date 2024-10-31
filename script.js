const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boxSize = 20;
let snake, direction, apple, bombs, volumeLevel, gameInterval, gameStarted, frameCount;

// Add the audio element for the jump scare
const jumpScareSound = new Audio('ssd.mp3'); // Make sure this file is in the correct path
const appleSound = new Audio('num num.mp3'); // Sound for eating apple
const bombSound = new Audio('cabum.mp3');   // Sound for hitting bomb

// Initialize volume level
volumeLevel = 0; // Start with 0% volume

// Update volume display and slider
function updateVolume() {
    const volumeSlider = document.getElementById("volume");
    const volumeDisplay = document.getElementById("volume-display");
    volumeSlider.value = volumeLevel;
    volumeDisplay.textContent = volumeLevel;
    jumpScareSound.volume = volumeLevel / 100; // Update jump scare sound volume
    appleSound.volume = volumeLevel / 100; // Update apple sound volume
    bombSound.volume = volumeLevel / 100; // Update bomb sound volume
}

// Increase volume when apple is collected
function collectApple() {
    volumeLevel = Math.min(volumeLevel + 2, 100);
    updateVolume();
    appleSound.currentTime = 0; // Reset sound to start
    appleSound.play().catch(error => {
        console.error('Error playing apple sound:', error);
    }); // Play apple sound immediately
}

// Decrease volume when snake hits bomb
function hitBomb() {
    volumeLevel = Math.max(volumeLevel - 3, 0);
    updateVolume();
    bombSound.currentTime = 0; // Reset sound to start
    bombSound.play().catch(error => {
        console.error('Error playing bomb sound:', error);
    }); // Play bomb sound immediately
}

// Reset the game state after death
function resetGame() {
    snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
    direction = 'RIGHT';
    apple = spawnApple();
    bombs = spawnBombs(4);
    gameStarted = false;
    frameCount = 0; // Reset frame count
    updateVolume();
}

// Start the game loop
function startGame() {
    if (!gameStarted) {
        resetGame();
        gameStarted = true;
        gameInterval = requestAnimationFrame(gameLoop); // Start the game loop using requestAnimationFrame
    }
}

// Game loop to continuously update the game state
function gameLoop() {
    if (gameStarted) {
        frameCount++; // Increment the frame count
        if (frameCount % 10 === 0) { // Slow down the speed by updating every 10 frames
            draw(); // Update the game visuals
        }
        gameInterval = requestAnimationFrame(gameLoop); // Continue the loop
    }
}

// End the game when snake dies
function endGame() {
    gameStarted = false;
    playJumpScare(); // Call jump scare when the game ends
}

// Function to play jump scare sound
function playJumpScare() {
    jumpScareSound.currentTime = 0; // Reset sound to start
    jumpScareSound.volume = volumeLevel / 100; // Ensure it uses the current volume level
    jumpScareSound.play().catch(error => {
        console.error('Error playing sound:', error);
    }); // Play jump scare sound immediately
}

// Spawn apple at random position
function spawnApple() {
    return {
        x: Math.floor(Math.random() * 20) * boxSize,
        y: Math.floor(Math.random() * 20) * boxSize
    };
}

// Spawn multiple bombs at random positions
function spawnBombs(numBombs) {
    let bombArray = [];
    for (let i = 0; i < numBombs; i++) {
        bombArray.push({
            x: Math.floor(Math.random() * 20) * boxSize,
            y: Math.floor(Math.random() * 20) * boxSize
        });
    }
    return bombArray;
}

// Draw the snake, apple, bombs, and handle collisions
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake with rounded segments
    ctx.fillStyle = 'blue';
    snake.forEach(segment => {
        ctx.beginPath();
        ctx.arc(segment.x + boxSize / 2, segment.y + boxSize / 2, boxSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw apple as a rounded yellow circle
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(apple.x + boxSize / 2, apple.y + boxSize / 2, boxSize / 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw bombs as small black circles
    ctx.fillStyle = 'black';
    bombs.forEach(bomb => {
        ctx.beginPath();
        ctx.arc(bomb.x + boxSize / 2, bomb.y + boxSize / 2, boxSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Move snake
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === 'LEFT') head.x -= boxSize;
    if (direction === 'RIGHT') head.x += boxSize;
    if (direction === 'UP') head.y -= boxSize;
    if (direction === 'DOWN') head.y += boxSize;

    // Check if snake eats apple
    if (head.x === apple.x && head.y === apple.y) {
        collectApple();
        apple = spawnApple();
        bombs = spawnBombs(4); // Randomize bombs on apple collection
    } else {
        snake.pop();
    }

    // Check if snake hits any bomb
    if (bombs.some(bomb => bomb.x === head.x && bomb.y === head.y)) {
        hitBomb();
        bombs = spawnBombs(4); // Spawn new bombs after hitting one
    }

    // Check for collisions with walls or itself
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        // If it hits a wall, divide the volume by 2
        volumeLevel = Math.max(volumeLevel / 2, 0);
        updateVolume();
        
        endGame();
        return;
    }

    snake.unshift(head);
}

// Initialize the game state on page load
resetGame();

// Start the game when Start Game button is clicked
document.getElementById('startButton').addEventListener('click', () => {
    if (!gameStarted) {
        startGame();
    }
});

// Control snake direction with arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

// Initial volume setup
updateVolume();

const menuButtons = document.querySelectorAll('.menu-button');
const burgerMenu = document.getElementById('burgerMenu');

// Function to toggle menu visibility and randomize button positions
function toggleMenu() {
    menuButtons.forEach(button => {
        button.classList.toggle('show');
        if (button.classList.contains('show')) {
            button.style.top = `${Math.random() * 80 + 10}vh`;
            button.style.left = `${Math.random() * 80 + 10}vw`;
        }
    });
}

// Event listener for burger menu button click
burgerMenu.addEventListener('click', toggleMenu);
