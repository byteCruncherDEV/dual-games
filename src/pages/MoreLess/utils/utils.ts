export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isEven = (x: number) => {
  return x % 2 == 0;
};

export const getHalf = (start: number, end: number) => {
  if (start > end) return Math.floor((start + end) / 2);
  return Math.floor((end + start) / 2);
};
