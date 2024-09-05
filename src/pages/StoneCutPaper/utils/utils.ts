import { ISymbol } from '../types/types';

const getRandomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const generateMove = (): ISymbol => {
  const values = Object.values(ISymbol);
  const randomIndex = getRandomInteger(0, 2);
  return values[randomIndex] as ISymbol;
};
