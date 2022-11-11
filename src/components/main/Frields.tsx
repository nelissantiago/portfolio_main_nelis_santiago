/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { toast } from 'react-toastify'
import { FrieldsProps } from '../../@types/interfaces'
import { Githubb, Instagram } from '../utils/CreateSVG'
import Image from 'next/future/image'
import styles from './styles.module.scss'

export function FrieldPage({ name, profissao, avatar, buttonCopy, href, copy }: FrieldsProps) {

    function HandleProfile() {
        navigator.clipboard.writeText(copy)

        toast(copy, {
            delay: 1000,
            type: 'success',
            className: styles.toast,
        })
    }
    
    return (  
        <>
        <article className={styles.frield}>
            <div className={styles.image}>
                <Image src={avatar} alt=""  width={108} height={108}/>
              </div>
                <span>{name}</span>
                <p>{profissao}</p>
                <div className={styles.btn}>
                <button type="button" onClick={HandleProfile}>
                    {buttonCopy}
                </button>
                <a href="/"  className={styles.inst}>
                    <Githubb />
                </a>
                <a href={href} className={styles.inst}>
                     <Instagram />
                </a>
            </div>
        </article>
        </>
    )
}
