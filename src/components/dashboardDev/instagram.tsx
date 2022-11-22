/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles.module.scss'

import axios from "axios"
import React, { useEffect, useState } from "react";
import Image from 'next/future/image'


interface IfeedItem {
    id: string;
    media_type: string;
    media_url: string;
    permalink: string;
    timestamp: string;
    username: string;
}

export function Instagram() {
    const [ feed, setFeed ] = useState<IfeedItem[]>([]) 

    async function handleLogin() {
        const token = process.env.NEXT_INSTAGRAM_SECRET;
        const fields = 'media_url,media_type,permalink,timestamp,username';
        const url = `https://graph.instagram.com/me/media?acess_token=${token}&fields=${fields}`
        const { data } = await axios.get(url)
        console.log(data)
        setFeed(data)
    }
    
    useEffect(() => {
        handleLogin()
    }, [])
    
    return (
        <>
        <section>
            {feed.map(react => {
                return (
                   <>
                     <div className={styles.container}>
                        <Image src={react.media_url} alt="adadadad" width={100} height={100} />
                    </div>
                   </>
                )
            })}
        </section>
        </>
    )
}
