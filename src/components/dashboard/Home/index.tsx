import { Account, Admin, EBookAcess, Email, Nota, Repos } from '../../utils/CreateSVG';
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
    roles: string,
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
} []
}


export function DashBoard(props: Props) {
  const { data: session, status} = useSession();

  //Avaliação - States
  const [Title, setTitle] = useState('')
  const [Note, setNote] = useState(0)
  const [Description, setDescription] = useState('')
  
  //Contato - States
  const [DiscordUser, setUserDiscord] = useState('')
  const [Mensagem, setMensagem] = useState('')

  
  const nota = [
    {
      nota: 
      Note === 0 && "" ||
      Note  === 1 && <><Nota/></> || 
      Note === 2 && <><Nota/><Nota/></> || 
      Note ===  3 && <><Nota/><Nota/><Nota/></> ||
      Note === 4 && <><Nota/><Nota/><Nota/><Nota/></> || 
      Note ===  5 && <><Nota/><Nota/><Nota/><Nota/><Nota/></> ||
      Note >= 6 && "Nota de 1 a 5"
    }
  ]

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
          toast.error('Voce ja enviou uma mensagem!', {
            delay: 500,
          })
        }

        setUserDiscord('')
        setMensagem('')

      } catch {
        toast.error('Erro ao enviar mensagem', {
          delay: 500,
        })
      }
    }

    const PermissionRoles = (event: FormEvent) => {
      event.preventDefault()
        toast.error('Voce não tem permissão.', {
          delay: 500
        })
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
                        <span>{props.pooluser[0].roles}</span>
                        <button onClick={() => signOut()}>SAIR</button>
                    </div>
                    <div className={styles.info}>
                        <span><Email /><p>{props.pooluser[0].email}</p></span>
                        <span><EBookAcess /><p>{props.pooluser[0].pool.length} Avaliação</p></span>
                        <span><Repos /><p>{props.pooluser[0].discord.length} Contato</p></span>
                        <span><Account /><p>{status === 'authenticated' ? 'Logado' : ""}</p></span>
                    </div>
                      {props.pooluser[0].roles === 'Admin' ? (
                        <>
                        <button className={styles.button} onClick={() => {
                          toast.success('Redirecionando...', {
                            delay: 500
                          })
                          window.location.href = '/account/admin'
                        }}>
                          <span><Admin />Painel Do Administrador</span>
                        </button>
                        </>
                      ) : ""}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.formList}>
                            {props.pooluser[0].roles === 'Membro' ? (
                              <>
                                <form onSubmit={HandleAddReview} onClick={PermissionRoles}>
                                  <input type="text" placeholder={props.pooluser[0].name} disabled />
                                  <input type="text" placeholder="Titulo"  required onChange={event => setTitle(event.target.value)} value={Title} maxLength={32}  disabled/>
                                  <input type="number" placeholder="Nota de 1 a 5" max={5} min={1} required  onChange={event => setNote(Number(event.target.value))} disabled />
                                  <textarea maxLength={120} placeholder="Descrição" required onChange={event => setDescription(event.target.value)} value={Description} disabled />
                                  {Description.length === 0 ? "" : <span className={styles.lengthDescription}>{Description.length}/120</span>}
                                  <button type="submit" disabled={true} >Avaliação</button>
                              </form>
                              </>
                            ) : (
                              <>
                                <form onSubmit={HandleAddReview}>
                                  <input type="text" placeholder={props.pooluser[0].name} disabled />
                                  <input type="text" placeholder="Titulo" required onChange={event => setTitle(event.target.value)} value={Title} maxLength={32} />
                                  <input type="number" placeholder="Nota de 1 a 5" max={5} min={1} required  onChange={event => setNote(Number(event.target.value))} value={Note} />
                                    {Note ? (
                                      <>
                                      {nota.map(react => {
                                      return (
                                        <>
                                        <div className={styles.lengthDescription}>
                                          <span>{react.nota}</span>
                                        </div>
                                        </>
                                      )
                                    })}
                                    </>
                                    ) : ""}
                                  <textarea maxLength={120} placeholder="Descrição" required onChange={event => setDescription(event.target.value)} value={Description} />
                                  {Description.length === 0 ? "" : <span className={styles.lengthDescription}>{Description.length}/120</span>}
                                  <button type="submit">Avaliação</button>
                              </form>
                              </>
                            )}
                            {props.pooluser[0].roles ? (
                              <>
                                <form onSubmit={HandleContact}>
                                  <input type="text" placeholder={props.pooluser[0].name} disabled />
                                  <input type="text" maxLength={20} placeholder="Ex: Anonimo#0000" required  onChange={event => setUserDiscord(event.target.value)} value={DiscordUser} />
                                  <textarea maxLength={220} placeholder="Mensagem" required onChange={event => setMensagem(event.target.value)} value={Mensagem}></textarea>
                                  {Mensagem.length === 0 ? "" : <span className={styles.lengthDescription}>{Mensagem.length}/220</span>}
                                  <button type="submit" >Contato</button>
                              </form>
                              </>
                            ) : ""}
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