import { Link } from 'react-router-dom';
import { links } from './config/config';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useState } from 'react';

const Navbar = () => {
  const [isToggle, setIsToggle] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link to="/">Krasnov & Kartashov</Link>
        </div>
        <div className={styles.menu}>
          <ul>
            {links.map((link) => (
              <li key={link.link}>
                <NavLink
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
        <div className={styles.burgerButton} onClick={() => setIsToggle(!isToggle)}>
          <img src="menu-2.svg" alt="" />
        </div>
      </div>
      {isToggle && (
        <div className={styles.burgerMenu}>
          <ul onClick={() => setIsToggle(false)}>
            {links.map((link) => (
              <li key={link.link}>
                <NavLink
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
      )}
    </header>
  );
};

export default Navbar;
