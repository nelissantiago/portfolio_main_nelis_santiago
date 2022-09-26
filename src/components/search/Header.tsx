import { ReactNode } from "react";
import { Search } from "../utils/CreateSVG";
import styles from './styles.module.scss'
interface BaseProps {
  className?: string;
  children?: ReactNode;
}

interface HeaderProps extends BaseProps {
  title: string;
  subtitle?: ReactNode;
}

export function Header(props: HeaderProps): React.ReactElement {
  const {title, children } = props;

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.search}>
      <Search />
       {children}
      </div>
      <div>
      </div>
    </div>
  );
}