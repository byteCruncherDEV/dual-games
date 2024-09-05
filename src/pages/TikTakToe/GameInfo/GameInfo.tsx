import { ISymbol } from '../types/types';
import styles from './GameInfo.module.scss';
import GameSymbol from '../GameSymbol';

interface IGameInfo {
  isDraw: boolean;
  winnerSymbol: ISymbol | undefined;
  currentStep: ISymbol;
}

const GameInfo = ({ isDraw, winnerSymbol, currentStep }: IGameInfo) => {
  if (isDraw) {
    return <div className={styles.game__info}>Ничья</div>;
  }

  if (winnerSymbol) {
    return (
      <div className={styles.game__info}>
        Победитель: <GameSymbol symbol={winnerSymbol} />
      </div>
    );
  }

  return (
    <div className={styles.game__info}>
      Ход: <GameSymbol symbol={currentStep} />
    </div>
  );
};

export default GameInfo;
