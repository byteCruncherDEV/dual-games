export interface IGame {
  title: string;
  link: string;
  img: string;
}

export const games: IGame[] = [
  {
    title: 'Больше меньше',
    link: 'more-less',
    img: 'tiktaktoe.png',
  },
  {
    title: 'Крестики нолики',
    link: 'tik-tak-toe',
    img: 'tiktaktoe.png',
  },
  {
    title: 'КМБ',
    link: 'stone-cut-paper',
    img: 'tiktaktoe.png',
  },
  {
    title: 'Змейка',
    link: 'snake',
    img: 'tiktaktoe.png',
  },
  {
    title: 'Угадай число',
    link: 'guess-the-number',
    img: 'tiktaktoe.png',
  },
];
