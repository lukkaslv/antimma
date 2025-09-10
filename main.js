let scenes = [];
let currentScene = 0;
let score = 0;

const gameContainer = document.getElementById('game-container');
const progressBar = document.getElementById('progress');
const currentSceneText = document.getElementById('current-scene');
const scoreText = document.getElementById('score');
const finalScoreText = document.getElementById('final-score');
const finalFeedbackDiv = document.getElementById('final-feedback');

async function loadScenes() {
  const response = await fetch('scenes.json');
  scenes = await response.json();
  showScene(0);
}

function showScene(index) {
  currentScene = index;
  const scene = scenes[index];
  gameContainer.innerHTML = `
    <h2>${scene.title}</h2>
    <p>${scene.description}</p>
    <div class="options">
      ${scene.options.map((opt, i) => `<div class="option" onclick="selectOption(${i})">${opt.text}</div>`).join('')}
    </div>
    <div id="feedback" class="feedback"></div>
  `;
  updateStats();
  updateProgress();
}

function selectOption(optionIndex) {
  const scene = scenes[currentScene];
  const option = scene.options[optionIndex];
  score += option.score;
  
  const feedbackDiv = document.getElementById('feedback');
  feedbackDiv.textContent = option.feedback;
  feedbackDiv.style.display = 'block';
  
  // заблокировать выбор после клика
  document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
  
  setTimeout(() => {
    if(currentScene + 1 < scenes.length - 1) {
      showScene(currentScene + 1);
    } else {
      showFinal();
    }
  }, 1200);
}

function updateStats() {
  currentSceneText.textContent = currentScene + 1;
  scoreText.textContent = score;
}

function updateProgress() {
  const percent = ((currentScene) / (scenes.length - 1)) * 100;
  progressBar.style.width = percent + '%';
}

function showFinal() {
  const finalScene = scenes[scenes.length - 1];
  gameContainer.innerHTML = `
    <h2>${finalScene.title}</h2>
    <p>${finalScene.description} ${score} / 20</p>
    <div class="motivation">
      <
