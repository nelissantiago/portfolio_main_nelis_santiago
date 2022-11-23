import { HistoryAdmin } from '../history'
import { useState, FormEvent } from 'react'
import styles from './styles.module.scss'

import { Axios } from '../../../../lib/axios'
import { toast } from 'react-toastify'

interface Props {
    user: {
        name: string,
        email: string,
        id: string,
        roles: string
      }[]
}
export function HomeAdmin(props: Props) {
    const [email, SetEmail] = useState('')
    const [Roles, SetRoles] = useState('Membro')
    
      async  function HandleUpdateUser(event: FormEvent) {
        event.preventDefault()
        await Axios.put('/post/update', {
            email: email,
            roles: Roles
        })


        if(email && Roles) {
            toast.success('Sucesso Foi Alterado.', {
                delay: 500
            })

            SetEmail('')
            SetRoles('')

          
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        } else if(props.user[0].email !== email) {
            toast.info('Email Invalido', {
                delay: 500
            })
        }
    }


 
    return (
        <>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <div className={styles.container}>
                        <div className={styles.table}>
                                    <table>
                                    <thead>
                                        <tr>
                                            <th>#ID</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Roles</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {props.user?.map(react => {
                                        return (
                                            <>
                                                <HistoryAdmin  user={react} />
                                            </>
                                        )
                                    })}                                        
                                    </tbody>
                                    </table>

                        </div>
                        <div className={styles.content}>
                        <form onSubmit={HandleUpdateUser}>
                                  <input type="text" placeholder="Email do usuario" onChange={e => SetEmail(e.target.value)} />
                                    <select placeholder='Cargos' onChange={e => SetRoles(e.target.value)}>
                                        <option>Membro</option>
                                        <option>Comprador</option>
                                        <option>Admin</option>
                                    </select>
                                  <button type="submit">Atualizar</button>
                              </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}