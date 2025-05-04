const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Размеры ячеек
const gridSize = 20;
const canvasSize = 400;
const totalCells = canvasSize / gridSize;

// Начальные параметры змейки
let snake = [{ x: 8, y: 8 }];
let direction = 'RIGHT';
let food = generateFood();
let score = 0;

// Основной игровой цикл
function gameLoop() {
  moveSnake();
  if (checkCollision()) {
    resetGame();
  }
  if (eatFood()) {
    score += 10;
    food = generateFood();
  }
  clearCanvas();
  drawSnake();
  drawFood();
  drawScore();
}

// Очистка экрана
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Отрисовка змейки
function drawSnake() {
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
  }
}

// Отрисовка еды
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Отрисовка счета
function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Счет: ' + score, 10, 20);
}

// Движение змейки
function moveSnake() {
  let head = { ...snake[0] };

  switch (direction) {
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
  }

  snake.unshift(head);
  snake.pop();
}

// Проверка на столкновение
function checkCollision() {
  let head = snake[0];
  // Столкновение с границей
  if (head.x < 0 || head.x >= totalCells || head.y < 0 || head.y >= totalCells) {
    return true;
  }
  // Столкновение с собой
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

// Проверка на поедание еды
function eatFood() {
  let head = snake[0];
  return head.x === food.x && head.y === food.y;
}

// Генерация новой еды в случайном месте
function generateFood() {
  let x = Math.floor(Math.random() * totalCells);
  let y = Math.floor(Math.random() * totalCells);
  return { x, y };
}

// Сброс игры
function resetGame() {
  snake = [{ x: 8, y: 8 }];
  direction = 'RIGHT';
  food = generateFood();
  score = 0;
}

// Управление
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'DOWN') direction = 'UP';
      break;
    case 'ArrowDown':
      if (direction !== 'UP') direction = 'DOWN';
      break;
    case 'ArrowLeft':
      if (direction !== 'RIGHT') direction = 'LEFT';
      break;
    case 'ArrowRight':
      if (direction !== 'LEFT') direction = 'RIGHT';
      break;
  }
});

// Запуск игры
setInterval(gameLoop, 100);