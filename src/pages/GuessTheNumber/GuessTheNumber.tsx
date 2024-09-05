import styles from './GuessTheNumber.module.scss';
import { useState, useEffect } from 'react';
import { getHalf } from './utils/utils';
import ButtonAction from '../../shared/ButtonAction';

enum IGameChoice {
  LESS,
  MORE,
  EQUAL,
}

enum IGameStatus {
  SETTINGS,
  START,
  END,
}

const GuessTheNumber = () => {
  const [isWin, setIsWin] = useState<boolean>(true);

  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeEnd, setRangeEnd] = useState<number>(1000000);
  const [gameStatus, setGameStatus] = useState<IGameStatus>(IGameStatus.SETTINGS);

  const [rangeHalf, setRangeHalf] = useState<number>(getHalf(rangeStart, rangeEnd));

  useEffect(() => {
    const half = getHalf(rangeStart, rangeEnd);
    setRangeHalf(half);
  }, [rangeStart, rangeEnd]);

  const handleChangeRangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') {
      setRangeStart(0);
    } else if (/^\d+$/.test(e.target.value)) {
      setRangeStart(Number(e.target.value));
    }
  };

  const handleChangeRangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') {
      setRangeEnd(0);
    } else if (/^\d+$/.test(e.target.value)) {
      setRangeEnd(Number(e.target.value));
    }
  };

  const startGame = () => {
    if (rangeEnd < rangeStart) {
      setRangeEnd(rangeStart);
      setRangeStart(rangeEnd);
    }
    setGameStatus(IGameStatus.START);
  };

  const resetGame = () => {
    setRangeStart(0);
    setRangeEnd(1000000);
    setGameStatus(IGameStatus.SETTINGS);
    setIsWin(true);
  };

  const makeMove = (choice: IGameChoice) => {
    switch (choice) {
      case IGameChoice.LESS:
        setRangeEnd(rangeHalf - 1);
        break;
      case IGameChoice.MORE:
        setRangeStart(rangeHalf + 1);
        break;
      case IGameChoice.EQUAL:
        setGameStatus(IGameStatus.END);
        return;
    }

    if (rangeEnd - rangeStart == 0) {
      setGameStatus(IGameStatus.END);
      setIsWin(false);
    }
  };

  return (
    <div className={styles.gameWrapper}>
      {gameStatus === IGameStatus.SETTINGS && (
        <div>
          <div className={styles.gameSettings}>
            <h2>Введите диапазон значений</h2>
            <div className={styles.range}>
              <input autoFocus type="text" value={rangeStart} onChange={handleChangeRangeStart} />
              <input type="text" value={rangeEnd} onChange={handleChangeRangeEnd} />
            </div>
          </div>
          <div className={styles.controls}>
            <ButtonAction
              onClick={startGame}
              color="white"
              backgroundColor="#007BFF"
              text="Начать игру"
            />
          </div>
        </div>
      )}
      {gameStatus === IGameStatus.START && (
        <div className={styles.gameBody}>
          <div className={styles.gameInfo}>
            <h2>Твое число {rangeHalf}?</h2>
          </div>
          <div className={styles.controls}>
            <div className={styles.controls__move}>
              <ButtonAction
                color="white"
                backgroundColor="red"
                text="Меньше < "
                onClick={() => makeMove(IGameChoice.LESS)}
              />
              <ButtonAction
                color="white"
                backgroundColor="#007BFF"
                text="Равно ="
                onClick={() => makeMove(IGameChoice.EQUAL)}
              />
              <ButtonAction
                color="white"
                backgroundColor="green"
                text="Больше > "
                onClick={() => makeMove(IGameChoice.MORE)}
              />
            </div>
            <div className={styles.controls__settings}>
              <ButtonAction
                onClick={resetGame}
                color="white"
                backgroundColor="grey"
                text="Начать заного"
              />
            </div>
          </div>
        </div>
      )}
      {gameStatus === IGameStatus.END && (
        <div className={styles.gameEnd}>
          <h2>{isWin ? `Робот угадал ваше число ${rangeHalf}` : 'Вы пытаетесь обмануть робота'}</h2>
          <div className={styles.controls}>
            <div className={styles.controls__move}>
              <div className={styles.controls__settings}>
                <ButtonAction
                  onClick={resetGame}
                  color="white"
                  backgroundColor="grey"
                  text="Начать заного"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuessTheNumber;
