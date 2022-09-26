import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './styles.module.scss'

export const CustomLink = ({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
    <div className={styles.dark}>
        <Link href={href}>
        <a {...rest} />
      </Link>
    </div>
    );
  }

  if (isAnchorLink) {
    return <a href={href} {...rest} />;
  }

  return <a href={href} {...rest} />;
};

