import { Link } from 'react-router-dom';
import { links } from './config/config';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <header>
      <nav className={styles.wrapper}>
        <div className={styles.logo}>
          <Link to="/">Krasnov & Kartashov</Link>
        </div>
        <div className={styles.menu}>
          <ul>
            {links.map((link) => (
              <li>
                <NavLink
                  key={link.link}
                  to={link.link}
                  className={({ isActive, isPending }) =>
                    isPending ? styles.pending : isActive ? styles.active : ''
                  }>
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
