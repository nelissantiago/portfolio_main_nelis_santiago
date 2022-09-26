/* eslint-disable @next/next/no-html-link-for-pages */
import styles from './styles.module.scss';
import { Account } from "../../utils/CreateSVG";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

export function HeaderAvatarProfile() {
  const { data, status} = useSession()

  return (
    <>
       {status === 'authenticated' ? (
        <a href="/account/dashboard"><Account /></a>
       ) : (
        <>
          <a href="" onClick={() => signIn('github')}><Account /></a>
        </>
       )}
    </>
  );
}
