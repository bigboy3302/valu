const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boxSize = 20;
let snake, direction, apple, bombs, volumeLevel, gameInterval, gameStarted;

// Update volume display and slider
function updateVolume() {
    const volumeSlider = document.getElementById("volume");
    const volumeDisplay = document.getElementById("volume-display");
    volumeSlider.value = volumeLevel;
    volumeDisplay.textContent = volumeLevel;
}

// Increase volume when apple is collected
function collectApple() {
    volumeLevel = Math.min(volumeLevel + 2, 100);
    updateVolume();
}

// Decrease volume when snake hits bomb
function hitBomb() {
    volumeLevel = Math.max(volumeLevel - 3, 0);
    updateVolume();
}

// Reset the game state after death
function resetGame() {
    snake = [{ x: 10 * boxSize, y: 10 * boxSize }];
    direction = 'RIGHT';
    apple = spawnApple();
    bombs = spawnBombs(4);
    volumeLevel = 0;
    gameStarted = false;
    updateVolume();
}

// Start the game loop
function startGame() {
    if (!gameStarted) {
        resetGame();
        gameStarted = true;
        gameInterval = setInterval(draw, 100);
    }
}

// End the game when snake dies
function endGame() {
    clearInterval(gameInterval);
    gameStarted = false;
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