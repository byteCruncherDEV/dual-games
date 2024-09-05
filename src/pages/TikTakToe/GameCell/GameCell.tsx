import { ISymbol } from '../types/types';
import styles from './GameCell.module.scss';
import GameSymbol from '../GameSymbol';

interface IGameCell {
  isWinner: boolean | undefined;
  onClick: () => void;
  symbol: ISymbol | undefined;
}

const GameCell = ({ isWinner, onClick, symbol }: IGameCell) => {
  return (
    <button className={`${styles.cell} ${isWinner ? styles.cell__win : ''}`} onClick={onClick}>
      {symbol ? <GameSymbol symbol={symbol} /> : null}
    </button>
  );
};

export default GameCell;
