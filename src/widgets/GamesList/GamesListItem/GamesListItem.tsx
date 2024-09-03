import { IGame } from '../config/config';
import styles from './GamesListItem.module.scss';
import ButtonLink from '../../../shared/ButtonLink';

const GamesListItem = ({ title, link, img }: IGame) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <img src={img} alt="" />
      </div>
      <div className={styles.card__body}>
        <h2>{title}</h2>
      </div>
      <div className={styles.card__footer}>
        <ButtonLink text="Играть" link={'games/' + link} />
      </div>
    </div>
  );
};

export default GamesListItem;
