import { useState } from 'react';
import ButtonAction from '../../shared/ButtonAction';
import styles from './MoreLess.module.scss';

const MoreLess = () => {
  const [win, setWin] = useState<boolean | undefined>(undefined);
  const [winCount, setWinCount] = useState<number>(0);
  const [gamesCount, setGamesCount] = useState<number>(0);
  const [lastNumber, setLastNumber] = useState<number | undefined>(undefined);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const tryLess = () => {
    setGamesCount(gamesCount + 1);
    const randNumber = generateRandomNumber(0, 1000000);
    const isWin = randNumber < 500001;

    setLastNumber(randNumber);
    setWin(isWin);
    if (isWin) setWinCount(winCount + 1);
  };

  const tryMore = () => {
    setGamesCount(gamesCount + 1);
    const randNumber = generateRandomNumber(0, 1000000);
    const isWin = randNumber > 500000;

    setLastNumber(randNumber);
    setWin(isWin);
    if (isWin) setWinCount(winCount + 1);
  };

  const resetGame = () => {
    setLastNumber(undefined);
    setWin(undefined);
    setWinCount(0);
    setGamesCount(0);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.statsList}>
        <li>Диапазон: 0 - 1.000.000</li>
        <li>Побед: {winCount}</li>
        <li>Поражений: {gamesCount - winCount}</li>
        <li>Всего игр: {gamesCount}</li>
      </ul>
      <div className={styles.gameInfo}>
        <h3>{lastNumber && 'Число было: ' + lastNumber}</h3>
        <h3 className={win ? styles.win : styles.lose}>
          {win == undefined ? 'Сделайте первый выбор' : win ? 'Вы угадали' : 'Вы не угадали'}
        </h3>
      </div>

      <div className={styles.actions}>
        <ButtonAction
          color="white"
          backgroundColor="red"
          text="Меньше < 500001"
          onClick={tryLess}
        />
        <ButtonAction
          color="white"
          backgroundColor="green"
          text="Больше > 500000"
          onClick={tryMore}
        />
        <ButtonAction color="white" backgroundColor="grey" text="Сбросить" onClick={resetGame} />
      </div>
    </div>
  );
};

export default MoreLess;
