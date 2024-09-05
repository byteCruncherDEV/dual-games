import { useState } from 'react';
import styles from './TikTakToe.module.scss';

enum ISymbol {
  X = 'X',
  O = 'O',
}

const computeWinner = (cells: (ISymbol | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return [a, b, c];
    }
  }
};

const TikTakToe = () => {
  const [cells, setCells] = useState<(ISymbol | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentStep, setCurrentStep] = useState(ISymbol.O);
  const [winnerSequence, setWinnerSequence] = useState<number[]>();

  const handleCellClick = (index: number) => {
    if (cells[index] || winnerSequence) {
      return;
    }
    const cellsCopy = cells.slice();
    cellsCopy[index] = currentStep;
    const winner = computeWinner(cellsCopy);

    setCells(cellsCopy);
    setCurrentStep(currentStep === ISymbol.O ? ISymbol.X : ISymbol.O);
    setWinnerSequence(winner);
  };

  const handleResetClick = () => {
    setCells(Array.from({ length: 9 }, () => null));
    setCurrentStep(ISymbol.X);
    setWinnerSequence(undefined);
  };

  const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;
  const isDraw = !winnerSequence && cells.filter((value) => value).length === 9;

  return (
    <div className={styles.game}>
      <GameInfo isDraw={isDraw} winnerSymbol={winnerSymbol} currentStep={currentStep} />
      <div className={styles.game__field}>
        {cells.map((symbol, index) => (
          <GameCell
            key={index}
            symbol={symbol}
            isWinner={winnerSequence?.includes(index)}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
      <button className={styles.reset} onClick={handleResetClick}>
        Сбросить
      </button>
    </div>
  );
};

function GameInfo({
  isDraw,
  winnerSymbol,
  currentStep,
}: {
  isDraw: boolean;
  winnerSymbol: ISymbol;
  currentStep: ISymbol;
}) {
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
}

function GameCell({
  isWinner,
  onClick,
  symbol,
}: {
  isWinner: boolean;
  onClick: () => void;
  symbol: ISymbol;
}) {
  return (
    <button className={`${styles.cell} ${isWinner ? styles.cell__win : ''}`} onClick={onClick}>
      {symbol ? <GameSymbol symbol={symbol} /> : null}
    </button>
  );
}

function GameSymbol({ symbol }: { symbol: ISymbol }) {
  const getSymbolClassName = (symbol: ISymbol) => {
    if (symbol === ISymbol.O) return styles.symbol__o;
    if (symbol === ISymbol.X) return styles.symbol__x;
    return '';
  };
  return <span className={`${styles.symbol} ${getSymbolClassName(symbol)}`}>{symbol}</span>;
}

export default TikTakToe;
