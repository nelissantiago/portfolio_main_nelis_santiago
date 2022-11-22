import { Account, EBookAcess, Email, Repos } from '../../utils/CreateSVG';
import { signOut, useSession } from "next-auth/react";
import { FragementParticles } from '../../utils/particles'

import { avaliacoesProps } from '../../../@types/interfaces';
import styles from './styles.module.scss';
import { Axios } from '../../../lib/axios'
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { History } from '../history';

interface Props{
  pool: avaliacoesProps 
  pooluser: {
    name: string,
    image: string,
    email: string,
    pool: {
        title: string,
        description: string,
        avatar: string,
        createdAt: Date,
        length?: number,
        userpoolId: number,
    }
    discord: {
      id: string,
        name: string,
        avatar: string,
        discord: string,
        mensagem: string,
        length?: number,
        userpoolId: number,
    }
}[]
}


export function DashBoard(props: Props) {
  const { data: session, status} = useSession();

  //Avaliação - States
  const [Title, setTitle] = useState('')
  const [Note, setNote] = useState<Number>()
  const [Description, setDescription] = useState('')
  
  //Contato - States
  const [DiscordUser, setUserDiscord] = useState('')
  const [Mensagem, setMensagem] = useState('')

    async function HandleAddReview(e: FormEvent) {
      e.preventDefault()

      try {

      const response = await Axios.post('/post', {
        title: Title,
        nota: Note,
        description: Description,
        createdAt: new Date(),
        })

        if(response.status === 201) {
          toast.success('Avaliação publicada com sucesso!')

          setTimeout(() => {
            window.location.reload()
          }, 1500);

        } else {
          toast.error('Voce ja postou uma avaliação!')
        }

        setTitle('')
        setNote(0)
        setDescription('')

      } catch {
        toast.error('Erro ao postar avaliação', {
          delay: 500,
          className: styles.toastr
        })

        setTitle('')
        setNote(0)
        setDescription('')
      }
    }

    async function  HandleContact(e: FormEvent) {
      e.preventDefault()

      try {
        const response = await Axios.post('/post/contact', {
          discord: DiscordUser,
          mensagem: Mensagem,
        })

        if(response.status === 201) {
          toast.success('Mensagem enviada com sucesso!')

          fetch('https://discord.com/api/webhooks/1020524751006998569/NIIQWIN6eyRBFEt6U-OlvEfhlQJIItSGkMfi1FHuWx_1XH_v1pqpvzIFcjjaWOAQOoqC', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
              body: JSON.stringify({
                username: 'Bot de contatos',
                delay: 500,
                embeds: [
                  {
                    title: 'Nelis Santiago - Portfolio',
                    color: 0x00ff00,
                    
                    fields: [
                      {
                        name: 'Nome do usuário',
                        value: props.pooluser[0].name,
                      },
                      {
                        name: 'Discord do usuário',
                        value: DiscordUser
                      },
                      {
                        name: 'Mensagem do usuario',
                        value: Mensagem
                      }
                    ],
                    footer: {
                      text: `Nelis Santiago Todos os direitos reservados ${new Date().getFullYear()}`,
                    },
                    timestamp: new Date(),
                  }, 
                ],
                
              })
            })
    
          setTimeout(() => {
            window.location.reload()
          }, 1500);
          
        } else {
          toast.error('Voce ja enviou uma mensagem!')
        }

        setUserDiscord('')
        setMensagem('')

      } catch {
        toast.error('Erro ao enviar mensagem', {
          delay: 500,
          className: styles.toastr
        })
      }
    }

    return (
        <>
        <main className={styles.main} id="embed" >
            <div className={styles.grid}>
                <div className={styles.container}>
                    <div className={styles.profileInformation}>
                    <div className={styles.profile}>
                        <img src={session?.user.image} alt="" />
                        <strong>{props.pooluser[0].name}</strong>
                        <span>Membro</span>
                        <button onClick={() => signOut()}>SAIR</button>
                    </div>
                    <div className={styles.info}>
                        <span><Email /><p>{props.pooluser[0].email}</p></span>
                        <span><EBookAcess /><p>{props.pooluser[0].pool.length} Avaliação</p></span>
                        <span><Repos /><p>{props.pooluser[0].discord.length} Contato</p></span>
                        <span><Account /><p>{status === 'authenticated' && 'Logada'}</p></span>
                    </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.formList}>
                            <form onSubmit={HandleAddReview}>
                                <input type="text" placeholder={props.pooluser[0].name} disabled />
                                <input type="text" placeholder="Titulo" required onChange={event => setTitle(event.target.value)} value={Title} maxLength={32} />
                                <input type="number" placeholder="Nota de 1 a 5" max={5} min={1} required  onChange={event => setNote(Number(event.target.value))} value={Number(Note)} />
                                <textarea maxLength={120} placeholder="Descrição" required onChange={event => setDescription(event.target.value)} value={Description} />
                                {Description.length === 0 ? "" : <span className={styles.lengthDescription}>{Description.length}/120</span>}
                                <button type="submit">Avaliação</button>
                            </form>
                            <form onSubmit={HandleContact}>
                                <input type="text" placeholder={props.pooluser[0].name} disabled />
                                <input type="text" placeholder="Ex: Anonimo#0000" required  onChange={event => setUserDiscord(event.target.value)} value={DiscordUser} />
                                <textarea maxLength={220} placeholder="Mensagem" required onChange={event => setMensagem(event.target.value)} value={Mensagem}></textarea>
                                {Mensagem.length === 0 ? "" : <span className={styles.lengthDescription}>{Mensagem.length}/220</span>}
                                <button type="submit" >Contato</button>
                            </form>
                        </div>
                        {props.pooluser.map(react => {
                          return (
                            <>
                            <History pooluser={react} />
                            </>
                          )
                        })}
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}