/* eslint-disable jsx-a11y/alt-text */

import { KnowledgeProps } from '../../@types/interfaces'
import Image from 'next/future/image'
import styles from './styles.module.scss'

export function KnowledgePage({tooltip, img, width, height}: KnowledgeProps) {
    return (
        <>
      <article className={styles.wrapper}>
        <div className={styles.react} id={styles.facebook}>
            <span className={styles.tooltip}>{tooltip}</span>
            <Image src={img} width={width} height={height}/>
        </div>
    </article>
        </>
    )
}