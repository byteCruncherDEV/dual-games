import { useEffect, useState } from 'react';
import styles from './Snake.module.scss';

const box = 20; // Размер ячейки
const canvasSize = 400;

const Snake = () => {
  const [snake, setSnake] = useState([{ x: 9 * box, y: 9 * box }]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState(generateFood());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37: // Left
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 38: // Up
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 39: // Right
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case 40: // Down
          if (direction !== 'UP') setDirection('DOWN');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  function generateFood() {
    return {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box,
    };
  }

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    if (direction === 'LEFT') head.x -= box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'DOWN') head.y += box;

    // Проверка на столкновение с границами
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= canvasSize ||
      head.y >= canvasSize ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      alert('Игра окончена!');
      return;
    }

    newSnake.unshift(head);

    // Проверка на поедание еды
    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(moveSnake, 100);
      return () => clearInterval(interval);
    }
  }, [snake, gameOver]);

  return (
    <div className={styles.App}>
      <h1>Игра Змейка</h1>
      <canvas
        id="gameCanvas"
        width={canvasSize}
        height={canvasSize}
        style={{ border: '1px solid black', backgroundColor: 'white' }}
        ref={(canvas) => {
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvasSize, canvasSize);

              // Рисуем змейку
              snake.forEach((segment, index) => {
                ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
                ctx.fillRect(segment.x, segment.y, box, box);
                ctx.strokeStyle = 'darkgreen';
                ctx.strokeRect(segment.x, segment.y, box, box);
              });

              // Рисуем еду
              ctx.fillStyle = 'red';
              ctx.fillRect(food.x, food.y, box, box);
            }
          }
        }}
      />
    </div>
  );
};

export default Snake;
