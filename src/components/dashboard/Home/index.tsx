import styles from './styles.module.scss';
import { Form } from '../avaliacoes';
import { ThemeSwitch } from '../../utils/Darktoggle'
import { signOut, useSession } from "next-auth/react";
import { FragementParticles } from '../../utils/particles'
import "keen-slider/keen-slider.min.css";
import Image from 'next/future/image'

export function DashBoard() {
  const { data } = useSession();

  const dataSession = [
    {
      name: data?.user.name,
      avatar: data?.user.image,
      emailAccount: data?.user.email
    }
  ]
    return (
        <>
          <main id="embed" className={styles.main}>
            <div className={styles.grid}>
            <header className={styles.header}>
            <div className={styles.profile}>
              <Image src={data?.user.image} alt="" width={57} height={57} />
              <span>{data?.user.name ? data?.user.name : 'Anonimo'}</span>
            </div>
              <div className={styles.nav}>
                <button className={styles.button} onClick={() => signOut()}>Sair</button>
                <div className={styles.buttonDarkToogle}><ThemeSwitch /> </div>
              </div>
            </header>
              <section className={styles.container}>
              <div className={styles.gridContainer}>
                <div className={styles.form}>
                  {dataSession.map(react => {
                    return (
                      <>
                        <Form names={react.name} avatars={react.avatar} emailAccount={react.emailAccount} />
                      </>
                    )
                  })}
                </div>
              </div>
              </section>
            </div>
            <FragementParticles />
          </main>
        </>
    )
}