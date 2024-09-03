import { Outlet } from 'react-router-dom';
import Navbar from '../../widgets/Navbar';
// import GroupBar from '../../widgets/GroupBar';

import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      {/* <GroupBar /> */}
    </div>
  );
};

export default Layout;
