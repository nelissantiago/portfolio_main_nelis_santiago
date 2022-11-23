import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './styles.module.scss'

import { Delete } from '../../utils/CreateSVG'
import { Axios } from '../../../lib/axios';
import { FormEvent } from 'react';

interface Props {
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
  }
}



export function History(props: Props) {
    async function HandleDeletePool() {
        try {
            const response = await axios.delete('/api/post/delete', {
                data: {
                    id: props.pooluser.pool[0].userpoolId
                }
            })

            if(response.status === 200) {
                toast.success('Avaliação deletada com sucesso!', {
                    delay: 500,
                })

                setTimeout(() => {
                    window.location.reload() 
                }, 1500);

            } else {
                toast.error('Erro ao deletar avaliação!', {
                    delay: 500,
                })
            }
        } catch {
            toast.error('Tente Novamente mais tarde!', {
                delay: 500,
            })
        }
    }

    async function HandleDeleteDiscord() {
        try {
           const response = await Axios.delete('/post/deleteContact', {
                data: {
                    id: props.pooluser.discord[0].userpoolId
                }
            })

            if(response.status === 200) {
                toast.success('Contato deletado com sucesso!', {
                    delay: 500,
                })

                setTimeout(() => {
                    window.location.reload()
                  }, 1500);
                  
            } else {
                toast.error('Erro ao deletar contato!', {
                    delay: 500,
                })
            }
        } catch {
            toast.error('Tente Novamente mais tarde!', {
                delay: 500,
            })
        }
 }

    function CopyID(event: FormEvent) {
        event.preventDefault()

      const id =  navigator.clipboard.writeText(props.pooluser.discord[0].id)

        toast.success(`ID Copiado`, {
            delay: 500,
        })

    }

    return (
        <>
    
            {props.pooluser.pool.length === 0 && props.pooluser.discord.length === 0 ? "" : (
                <>
                     <div className={styles.history}>
                      {props.pooluser.discord.length === 0 ? "" : (
                        <>
                            <div className={styles.listHistory}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Discord</th>
                                            <th>Opçoes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={styles.id} onClick={CopyID}>{props.pooluser.discord[0].id}</td>
                                            <td>{props.pooluser.discord[0].discord}</td>
                                            <td><button type="button" onClick={HandleDeleteDiscord}><Delete />Deletar</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                      )}
                        {props.pooluser.pool.length === 0 ? "" : (
                            <>
                                  <div className={styles.listHistory}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Usuario</th>
                                                <th>Titulo</th>
                                                <th>Opçoes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{props.pooluser.name}</td>
                                                <td>{props.pooluser.pool[0].title}</td>
                                                <td><button type="button" onClick={HandleDeletePool}><Delete /> Deletar</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                        </div>
                </>
            )}
     
        </>
    )
}