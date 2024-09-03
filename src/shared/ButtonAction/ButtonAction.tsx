import styles from './ButtonAction.module.scss';

export interface IButtonAction {
  text: string;
  onClick: React.MouseEventHandler;
  backgroundColor?: string;
  color?: string;
}

const ButtonAction = ({ text, onClick, ...props }: IButtonAction) => {
  return (
    <button style={{ ...props }} onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default ButtonAction;
