import { useEffect, useState } from 'react';
import ButtonAction from '../../shared/ButtonAction';
import styles from './MoreLess.module.scss';
import { generateRandomNumber, getHalf, isEven } from './utils/utils';

enum IGameChoice {
  LESS,
  MORE,
  EQUAL,
}

const MoreLess = () => {
  const [win, setWin] = useState<boolean | undefined>(undefined);
  const [winCount, setWinCount] = useState<number>(0);
  const [gamesCount, setGamesCount] = useState<number>(0);

  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeEnd, setRangeEnd] = useState<number>(1000000);

  const [rangeHalf, setRangeHalf] = useState<number>(getHalf(rangeStart, rangeEnd));
  const [isRangeHalfEven, setIsRangeHalfEven] = useState<boolean>(false);
  const [prevNumber, setPrevNumber] = useState<number>(0);

  useEffect(() => {
    const half = getHalf(rangeStart, rangeEnd);
    setRangeHalf(half);
    setIsRangeHalfEven(isEven(rangeStart + rangeEnd));
  }, [rangeStart, rangeEnd, isRangeHalfEven, rangeHalf]);

  const makeMove = (choice: IGameChoice) => {
    setGamesCount(gamesCount + 1);
    const generatedNumber = generateRandomNumber(rangeStart, rangeEnd);
    let isWin: boolean;

    switch (choice) {
      case IGameChoice.LESS:
        isWin = generatedNumber < rangeHalf;
        break;
      case IGameChoice.MORE:
        isWin = generatedNumber > rangeHalf;
        break;
      case IGameChoice.EQUAL:
        isWin = generatedNumber == rangeHalf;
        break;
    }

    setWin(isWin);
    if (isWin) setWinCount(winCount + 1);
    setPrevNumber(generatedNumber);
  };

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

  const resetGame = () => {
    setRangeStart(0);
    setRangeEnd(1000000);
    setWin(undefined);
    setWinCount(0);
    setGamesCount(0);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.gameWrapper}>
        <div className={styles.gameSettings}>
          <h2>Введите диапазон значений</h2>
          <div className={styles.range}>
            <input autoFocus type="text" value={rangeStart} onChange={handleChangeRangeStart} />
            <input type="text" value={rangeEnd} onChange={handleChangeRangeEnd} />
          </div>
        </div>

        <div className={styles.stats}>
          <ul className={styles.statsList}>
            <li>Побед: {winCount}</li>
            <li>Поражений: {gamesCount - winCount}</li>
            <li>Всего игр: {gamesCount}</li>
          </ul>
        </div>
        <div className={styles.gameInfo}>
          <h3>{gamesCount != 0 && 'Число было: ' + prevNumber}</h3>
          <h3 className={win ? styles.win : styles.lose}>
            {win == undefined ? 'Сделайте первый выбор' : win ? 'Вы угадали' : 'Вы не угадали'}
          </h3>
        </div>

        <div className={styles.controls}>
          <div className={styles.controls__move}>
            <ButtonAction
              color="white"
              backgroundColor="red"
              text={'Меньше < ' + (rangeHalf + Number(!isRangeHalfEven))}
              onClick={() => makeMove(IGameChoice.LESS)}
            />
            {isRangeHalfEven && (
              <ButtonAction
                color="white"
                backgroundColor="#007BFF"
                text={'Равно: ' + rangeHalf}
                onClick={() => makeMove(IGameChoice.EQUAL)}
              />
            )}
            <ButtonAction
              color="white"
              backgroundColor="green"
              text={'Больше > ' + rangeHalf}
              onClick={() => makeMove(IGameChoice.MORE)}
            />
          </div>
          <div className={styles.controls__settings}>
            <ButtonAction
              color="white"
              backgroundColor="grey"
              text="Сбросить"
              onClick={resetGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreLess;
