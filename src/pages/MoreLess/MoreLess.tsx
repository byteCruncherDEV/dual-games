import { useEffect, useState } from 'react';
import ButtonAction from '../../shared/ButtonAction';
import styles from './MoreLess.module.scss';
import { generateRandomNumber, getHalf, isEven } from './utils/utils';

const MoreLess = () => {
  const [win, setWin] = useState<boolean | undefined>(undefined);
  const [winCount, setWinCount] = useState<number>(0);
  const [gamesCount, setGamesCount] = useState<number>(0);

  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeEnd, setRangeEnd] = useState<number>(1000000);

  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [rangeHalf, setRangeHalf] = useState<number>(getHalf(rangeStart, rangeEnd));
  const [isRangeHalfEven, setIsRangeHalfEven] = useState<boolean>(false);

  useEffect(() => {
    setCurrentNumber(generateRandomNumber(rangeStart, rangeEnd));
  }, [gamesCount, rangeStart, rangeEnd]);

  useEffect(() => {
    const half = getHalf(rangeStart, rangeEnd);
    setRangeHalf(half);
    setIsRangeHalfEven(isEven(rangeStart + rangeEnd));
    console.log(rangeHalf, isRangeHalfEven);
  }, [rangeStart, rangeEnd, isRangeHalfEven, rangeHalf]);

  const tryLess = () => {
    setGamesCount(gamesCount + 1);
    const isWin = currentNumber < rangeHalf;
    setWin(isWin);
    if (isWin) setWinCount(winCount + 1);
  };

  const tryMore = () => {
    setGamesCount(gamesCount + 1);
    const isWin = currentNumber > rangeHalf;
    setWin(isWin);
    if (isWin) setWinCount(winCount + 1);
  };

  const tryEqual = () => {
    setGamesCount(gamesCount + 1);
    const isWin = currentNumber == rangeHalf;
    setWin(isWin);
    if (isWin) setWinCount(winCount + 1);
  };

  const resetGame = () => {
    setRangeStart(0);
    setRangeEnd(1000000);
    setWin(undefined);
    setWinCount(0);
    setGamesCount(0);
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

  return (
    <div className={styles.wrapper}>
      <h2>Введите диапазон значений</h2>
      <div className={styles.range}>
        <input type="text" value={rangeStart} onChange={handleChangeRangeStart} />
        <input type="text" value={rangeEnd} onChange={handleChangeRangeEnd} />
      </div>
      <ul className={styles.statsList}>
        <li>Побед: {winCount}</li>
        <li>Поражений: {gamesCount - winCount}</li>
        <li>Всего игр: {gamesCount}</li>
      </ul>
      <div className={styles.gameInfo}>
        <h3>{gamesCount != 0 && 'Число было: ' + currentNumber}</h3>
        <h3 className={win ? styles.win : styles.lose}>
          {win == undefined ? 'Сделайте первый выбор' : win ? 'Вы угадали' : 'Вы не угадали'}
        </h3>
      </div>

      <div className={styles.actions}>
        <ButtonAction
          color="white"
          backgroundColor="red"
          text={'Меньше < ' + (rangeHalf + Number(!isRangeHalfEven))}
          onClick={tryLess}
        />
        {isRangeHalfEven && (
          <ButtonAction
            color="white"
            backgroundColor="#007BFF"
            text={'Равно: ' + rangeHalf}
            onClick={tryEqual}
          />
        )}

        <ButtonAction
          color="white"
          backgroundColor="green"
          text={'Больше > ' + rangeHalf}
          onClick={tryMore}
        />
      </div>
      <ButtonAction color="white" backgroundColor="grey" text="Сбросить" onClick={resetGame} />
    </div>
  );
};

export default MoreLess;
