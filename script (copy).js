// Variables to store the current score and high score
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let scoreInterval;
let player = document.getElementById("player");
let lava = document.getElementById("lava");

// Update score display
function updateScore() {
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("highScore").textContent = `High Score: ${highScore}`;
}

// Start the score timer (score increases every second)
function startScore() {
  scoreInterval = setInterval(() => {
    score++;
    updateScore();
  }, 1000);
}

// Game Over function
function gameOver() {
  clearInterval(scoreInterval);

  // Check if the score is higher than the high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore); // Save to localStorage
  }

  alert(`Game Over!\nYour score: ${score}\nHigh Score: ${highScore}`);
  location.reload(); // Restart the game
}

// Collision detection function (detects if player hits lava)
function checkCollision() {
  if (player.getBoundingClientRect().bottom > lava.getBoundingClientRect().top) {
    gameOver(); // If collision, end the game
  }
}

// Set the player's jump (sample movement, add more as needed)
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    player.style.bottom = '150px'; // Simulate jump
    setTimeout(() => {
      player.style.bottom = '50px'; // Back to ground
    }, 500);
  }
});

// Start the game and begin tracking score
startScore();

// Check for collision every 50ms
setInterval(checkCollision, 50);

