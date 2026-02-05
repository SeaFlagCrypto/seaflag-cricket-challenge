// Game State
let score = 0;
let wickets = 0;
let currentOver = 0;
let ballsInOver = 0;
let isGameOver = false;
let ballBowling = false;
let canHit = false;

// DOM Elements
const scoreEl = document.getElementById('score');
const wicketsEl = document.getElementById('wickets');
const oversEl = document.getElementById('overs');
const ballEl = document.getElementById('ball');
const batterEl = document.getElementById('batter');
const resultEl = document.getElementById('result');
const modalEl = document.getElementById('gameOverModal');
const finalScoreEl = document.getElementById('finalScore');

// Constants
const MAX_WICKETS = 5;
const MAX_OVERS = 3;
const BALLS_PER_OVER = 6;

// Initialize game
function initGame() {
  updateDisplay();
  startNewBall();
}

// Update scoreboard
function updateDisplay() {
  scoreEl.textContent = score;
  wicketsEl.textContent = `${wickets}/${MAX_WICKETS}`;
  oversEl.textContent = `${currentOver}.${ballsInOver} / ${MAX_OVERS}.0`;
}

// Start a new ball
function startNewBall() {
  if (isGameOver) return;
  
  ballBowling = false;
  canHit = false;
  ballEl.classList.remove('bowling', 'hit');
  resultEl.textContent = 'Get ready...';
  
  // Random delay before bowling (1-2 seconds)
  const delay = 1000 + Math.random() * 1000;
  
  setTimeout(() => {
    if (isGameOver) return;
    bowlBall();
  }, delay);
}

// Bowler delivers ball
function bowlBall() {
  ballBowling = true;
  canHit = true;
  ballEl.classList.add('bowling');
  resultEl.textContent = 'BALL COMING! TAP TO HIT!';
  
  // Ball reaches batter after 500ms
  setTimeout(() => {
    if (!canHit) return; // Already hit or missed
    
    // Missed - wicket falls
    if (wickets < MAX_WICKETS) {
      wicketFalls();
    }
  }, 500);
}

// Player hits the ball
function hitBall() {
  if (!canHit || isGameOver) return;
  
  canHit = false;
  batterEl.classList.add('swinging');
  
  // Determine hit outcome
  const outcome = Math.random();
  
  if (outcome < 0.3) {
    // 30% - Dot ball (0 runs)
    runsScored(0, '🟢 DOT BALL!');
  } else if (outcome < 0.55) {
    // 25% - 1 run
    runsScored(1, '1 RUN');
  } else if (outcome < 0.7) {
    // 15% - 2 runs
    runsScored(2, '2 RUNS');
  } else if (outcome < 0.8) {
    // 10% - 4 runs
    runsScored(4, 'FOUR! 🏏');
  } else if (outcome < 0.88) {
    // 8% - 6 runs
    runsScored(6, 'SIXER! 🚀');
  } else if (outcome < 0.93) {
    // 5% - Wicket!
    bowledOut();
  } else {
    // 7% - Caught out
    caughtOut();
  }
  
  setTimeout(() => {
    batterEl.classList.remove('swinging');
  }, 200);
}

// Runs scored
function runsScored(runs, message) {
  score += runs;
  ballEl.classList.remove('bowling');
  ballEl.classList.add('hit');
  resultEl.textContent = message;
  updateDisplay();
  nextBall();
}

// Wicket falls (bowled)
function bowledOut() {
  ballEl.classList.remove('bowling');
  ballEl.classList.add('hit');
  wickets++;
  resultEl.textContent = 'BOWLED! 🎯';
  updateDisplay();
  
  if (wickets >= MAX_WICKETS) {
    endGame();
  } else {
    nextBall();
  }
}

// Caught out
function caughtOut() {
  ballEl.classList.remove('bowling');
  ballEl.classList.add('hit');
  wickets++;
  resultEl.textContent = 'CAUGHT! 🙌';
  updateDisplay();
  
  if (wickets >= MAX_WICKETS) {
    endGame();
  } else {
    nextBall();
  }
}

// Wicket falls (missed ball)
function wicketFalls() {
  canHit = false;
  wickets++;
  ballEl.classList.add('hit');
  resultEl.textContent = 'MISSED! WICKET! ❌';
  updateDisplay();
  
  if (wickets >= MAX_WICKETS) {
    endGame();
  } else {
    nextBall();
  }
}

// Move to next ball
function nextBall() {
  ballsInOver++;
  
  if (ballsInOver >= BALLS_PER_OVER) {
    // Over complete
    currentOver++;
    ballsInOver = 0;
    
    if (currentOver >= MAX_OVERS) {
      endGame();
    } else {
      resultEl.textContent = `🎉 OVER ${currentOver} COMPLETE!`;
      updateDisplay();
      setTimeout(startNewBall, 2000);
    }
  } else {
    updateDisplay();
    setTimeout(startNewBall, 1500);
  }
}

// End the game
function endGame() {
  isGameOver = true;
  finalScoreEl.textContent = `You scored ${score} runs with ${wickets} wickets in ${currentOver}.${ballsInOver} overs`;
  modalEl.classList.add('show');
}

// Restart game
function restartGame() {
  score = 0;
  wickets = 0;
  currentOver = 0;
  ballsInOver = 0;
  isGameOver = false;
  modalEl.classList.remove('show');
  initGame();
}

// Share score (basic version)
function shareScore() {
  const text = `🏏 Seaflag Cricket Challenge\n\nScore: ${score} runs\nWickets: ${wickets}/5\nOvers: ${currentOver}.${ballsInOver}/3.0\n\nPlay: https://your-vercel-url.vercel.app`;
  
  // Copy to clipboard (simple sharing)
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Score copied! Share it on FarCast or Twitter!');
    });
  } else {
    alert('Score: ' + text);
  }
}

// Start the game
initGame();
