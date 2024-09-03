import { useState } from 'react';
import ButtonAction from '../../shared/ButtonAction';
import { count } from 'console';

const MoreLess = () => {
  const [win, setWin] = useState<boolean | undefined>(undefined);
  const [winCount, setWinCount] = useState<number>(0);
  const [gamesCount, setGamesCount] = useState<number>(0);

  const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const tryLess = () => {
    setGamesCount(gamesCount + 1);
    const isWin = generateRandomNumber(0, 1000000) < 500001;

    setWin(isWin);
    if (isWin) setWinCount(winCount + 1);
  };

  const tryMore = () => {
    setGamesCount(gamesCount + 1);
    const isWin = generateRandomNumber(0, 1000000) > 500000;

    setWin(isWin);
    if (isWin) setWinCount(winCount + 1);
  };

  return (
    <div>
      <h2>Диапазон 0 - 1000000</h2>
      <h3>Побед: {winCount}</h3>
      <h3>Поражений: {gamesCount - winCount}</h3>
      <h3>Всего игр: {gamesCount}</h3>
      <h3>{win == undefined ? 'Сделайте первый выбор' : win ? 'Вы угадали' : 'Вы не угадали'}</h3>
      <ButtonAction color="white" backgroundColor="red" text="Меньше < 500001" onClick={tryLess} />
      <ButtonAction
        color="white"
        backgroundColor="green"
        text="Больше > 500000"
        onClick={tryMore}
      />
    </div>
  );
};

export default MoreLess;
