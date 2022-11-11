import { useQuery } from "@apollo/client"
import { useState, useEffect } from 'react'
import { GET_LESSON_BY_GRAPH, Props } from "../ListContent"
import { Account, Discord, Repos, Conteudo, EBookAcess } from "../utils/CreateSVG"
import styles from './styles.module.scss'


interface Propss {
    counts: {
        avaliacoescount: number
        count: number
    }
}

export function Created(props: Propss) {
    const [countData, setCountData ]= useState('')
    const { data } = useQuery<Props>(GET_LESSON_BY_GRAPH)

    useEffect(() => {
        fetch('https://api.github.com/users/slaidezera/repos')
        .then(response => response.json())
        .then (data => setCountData(data))

    }, [])

    return (
        <>
            <div className={styles.listCount}>
                <span><Account /></span>
                <strong>+ de {props.counts.count ? props.counts.count : '0'}</strong>
                <p>Contas Criadas</p>
            </div>
            <div className={styles.listCount}>
                <span><Conteudo /></span>
                <strong>+ de {data?.contents.length ? data.contents.length : '0'}</strong>
                <p>Conteudos Criadas</p>
            </div>
            <div className={styles.listCount}>
                <span><Repos /></span>
                <strong>+ de {countData.length ? countData.length : '0'}</strong>
                <p>Repos Criadas</p>
            </div>
            <div className={styles.listCount}>
                <span><EBookAcess /></span>
                <strong>+ de {props.counts.avaliacoescount ? props.counts.avaliacoescount : '0'}</strong>
                <p>Avaliaçoes Criadas</p>
            </div>
        </>
    )
}