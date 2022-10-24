import styles from './styles.module.scss';
import { signOut, useSession } from "next-auth/react";
import Form from '../contact';
import {useKeenSlider} from 'keen-slider/react';
import "keen-slider/keen-slider.min.css";
import Image from 'next/future/image'
import { ThemeSwitch } from '../../utils/Darktoggle'

export function DashBoard() {
  const [ sliderREF ] = useKeenSlider({
    slides: {
      spacing: 10,
      perView: 2.5,
    }
  })
  const { data } = useSession();
    return (
        <>
          <main id="embed" className={styles.main}>
            <div className={styles.grid}>
            <header className={styles.header}>
            <div className={styles.profile}>
              <Image src={data?.user.image} alt="" width={57} height={57} />
              <span>{data?.user.name}</span>
            </div>
              <div className={styles.nav}>
                <button className={styles.button} onClick={() => signOut()}>Sair</button>
                <div className={styles.buttonDarkToogle}><ThemeSwitch /> </div>
              </div>
            </header>
              <section className={styles.container}>
              <div className={styles.gridContainer}>
                <div className={styles.form}>
                  <Form />
                </div>
             
              </div>
              </section>
            </div>
          </main>
        </>
    )
}

/**
 * 
 *    <div className={styles.info}>            
                <div className='keen-slider' ref={sliderREF}>
                  <article className='keen-slider__slide'>
                    <div className={styles.card}>
                      <img src="https://github.com/slaidezera.png" alt="" />
                    </div>
                  </article>
                  <article className='keen-slider__slide'>
                    <div className={styles.card}>
                    <img src="https://github.com/slaidezera.png" alt="" />
                    </div>
                  </article>
                  <article className='keen-slider__slide'>
                    <div className={styles.card}>
                    <img src="https://github.com/slaidezera.png" alt="" />
                    </div>
                  </article>
                </div>
                </div>
 * 
 */