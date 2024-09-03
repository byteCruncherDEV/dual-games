import { Link } from 'react-router-dom';
import styles from './ButtonAction.module.scss';

export interface IButtonLink {
  text: string;
  link: string;
}

const ButtonLink = ({ text, link }: IButtonLink) => {
  return (
    <Link to={link} className={styles.button}>
      {text}
    </Link>
  );
};

export default ButtonLink;
