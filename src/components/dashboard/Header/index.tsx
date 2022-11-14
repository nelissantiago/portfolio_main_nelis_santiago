/* eslint-disable @next/next/no-html-link-for-pages */
import styles from './styles.module.scss';
import { Account } from "../../utils/CreateSVG";
import { signIn, useSession } from 'next-auth/react';

export function HeaderAvatarProfile() {
  const { status } = useSession()


  return (
    <>
       {status === 'authenticated' ? (
        <a className={styles.buttonLink} href="/account/dashboard"><Account /></a>
       ) : (
        <>
          <button className={styles.buttonLink} onClick={() => signIn('github')} type='submit'><Account /></button>
        </>
       )}
    </>
  );
}
