import { useState } from 'react';
import ButtonAction from '../../shared/ButtonAction';
import { ISymbol } from './types/types';
import { generateMove } from './utils/utils';
import styles from './StoneCutPaper.module.scss';

enum GameResult {
  WIN,
  LOSE,
  TIE,
}

const StoneCutPaper = () => {
  const [botMove, setBotMove] = useState<ISymbol>();
  const [userMove, setUserMove] = useState<ISymbol>();
  const [gameResult, setGameResult] = useState<GameResult>();

  const move = (userSymbol: ISymbol) => {
    setUserMove(userSymbol);
    const randomMove = generateMove();
    console.log(randomMove);

    setBotMove(randomMove);

    if (userSymbol === randomMove) {
      setGameResult(GameResult.TIE);
    } else if (
      (userSymbol === ISymbol.STONE && randomMove === ISymbol.CUT) ||
      (userSymbol === ISymbol.CUT && randomMove === ISymbol.PAPER) ||
      (userSymbol === ISymbol.PAPER && randomMove === ISymbol.STONE)
    ) {
      setGameResult(GameResult.WIN);
    } else {
      setGameResult(GameResult.LOSE);
    }
  };

  return (
    <div className={styles.gameWrapper}>
      <h2>
        Вы выбрали: <span>{userMove}</span>
      </h2>
      <h2>
        Бот выбрал: <span>{botMove}</span>
      </h2>
      <h2 className={styles.result}>
        {'Исход матча: '}
        {gameResult === GameResult.WIN ? (
          <span>Победа</span>
        ) : gameResult === GameResult.LOSE ? (
          <span>Поражение</span>
        ) : (
          <span>Ничья</span>
        )}
      </h2>
      <div className={styles.controls}>
        <ButtonAction
          onClick={() => move(ISymbol.STONE)}
          text="КАМЕНЬ"
          backgroundColor="red"
          color="white"
        />
        <ButtonAction
          onClick={() => move(ISymbol.CUT)}
          text="НОЖНИЦЫ"
          backgroundColor="#007BFF"
          color="white"
        />
        <ButtonAction
          onClick={() => move(ISymbol.PAPER)}
          text="БУМАГА"
          backgroundColor="green"
          color="white"
        />
      </div>
    </div>
  );
};

export default StoneCutPaper;
