/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import { Discord, GitHub, Instagram, Whatsapp } from '../utils/CreateSVG'
import Typewriter from 'typewriter-effect';
import { HomeProps } from '../../@types/interfaces';
import Link from 'next/link';
import progress from '../../lib/progress';

export function HomePage({ logoImg, title, typerwriter, paragraph }: HomeProps) {

    function Progress() {
        progress.start()
        progress.done()
    }

    return (
        <>
        <div className={styles.profile}>
            <img src={logoImg} alt="nelis_santiago" />
            <h1>{title}</h1>
                <Typewriter 
                onInit={(typewriter) => {
                    typewriter
                    .typeString(typerwriter)
                    .pauseFor(2500)
                    .start()
                }}
            />
            {}
        </div>
        <div className={styles.text}>
            <p>
                {paragraph}
            </p>
        </div>
        <div className={styles.links}>
                <a href='/status' onClick={Progress}><Discord /></a>
            <a href="https://github.com/slaidezera"><GitHub /></a>
            <a href="https://instagram.com/nelis_code"><Instagram /></a>
            <a href=""><Whatsapp /></a>
        </div>   
        </>
    )
}