import { Outlet } from 'react-router-dom';
import styles from './GameLayout.module.scss';

const GameLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Outlet />
    </div>
  );
};

export default GameLayout;
