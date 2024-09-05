import { ISymbol } from '../types/types';
import styles from './GameSymbol.module.scss';

interface IGameSymbol {
  symbol: ISymbol;
}

const GameSymbol = ({ symbol }: IGameSymbol) => {
  const getSymbolClassName = (symbol: ISymbol) => {
    if (symbol === ISymbol.O) return styles.symbol__o;
    if (symbol === ISymbol.X) return styles.symbol__x;
    return '';
  };
  return <span className={`${styles.symbol} ${getSymbolClassName(symbol)}`}>{symbol}</span>;
};

export default GameSymbol;
