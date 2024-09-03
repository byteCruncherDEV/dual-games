import { games } from './config/config';
import GamesListItem from './GamesListItem';
import styles from './GameList.module.scss';

const GamesList = () => {
  return (
    <div>
      <ul className={styles.gamesList}>
        {games.map((game) => (
          <li key={game.link}>
            <GamesListItem {...game} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GamesList;
