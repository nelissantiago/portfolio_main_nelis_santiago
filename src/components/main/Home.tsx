/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss'
import { Discord, Githubb, Instagram, Whatsapp } from '../utils/CreateSVG'
import Typewriter from 'typewriter-effect';
import { HomeProps } from '../../@types/interfaces';
import Image from 'next/future/image'
import progress from '../../lib/progress';

export function HomePage({ logoImg, title, typerwriter, paragraph }: HomeProps) {
    function Progress() {
        progress.start()
        progress.done()
    }
    return (
        <>
        <div className={styles.profile}>
            <Image src={logoImg} alt="nelis_santiago" width={85} height={85} />
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
            <a href="https://www.instagram.com/nelis_santiago/"><Instagram /></a>
            <a href="/"><Whatsapp /></a>
            <a href="https://github.com/slaidezera"><Githubb /></a>
        </div>   
        </>
    )
}