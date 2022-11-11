import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import styles from './styles.module.scss'
import { Axios } from '../../../lib/axios'

interface UsersProps {
  names: string;
  avatars: string;
  emailAccount: string;
}

export function Form({ names, avatars, emailAccount}: UsersProps) {
  const [name, SetName] = useState('')
  const [title, SetTitle] = useState('')
  const [disability, SetDisability] = useState(false)
  const [description, SetDescription] = useState('')

    async function HandleForm(event: FormEvent) {
        event.preventDefault()
        
        try {
            const response = await Axios.post('api', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
                name: names,
                avatar: avatars,
                title: title,
                emailAccount: emailAccount,
                description: description,
         })
            
            const data = await response.data

            SetName('')
            SetTitle('')
            SetDescription('')
            SetDisability(false)



            toast('Avaliação enviada com sucesso!', {
              type: 'success',
              className: styles.error,
              delay: 500,
            })
            
        } catch {
            toast('Tente Novamente Mais Tarde!!', {
              type: 'error',
              className: styles.error,
              delay: 500,
            })

            SetName('')
            SetTitle('')
            SetDescription('')
            SetDisability(false)
        }
    }

  return (
    <>
    <form onSubmit={HandleForm} className={styles.form}>
      <input
        placeholder={names === undefined ? 'Anonimo' : names}
        //value={name}
        onChange={event => SetName(event.target.value)}
        type="text"
        maxLength={14}
        disabled
      />
      <input
        placeholder="Titulo"
        required
        type="text"
        value={title}
        onChange={event => SetTitle(event.target.value)}
        maxLength={32}
      />
      <textarea
        placeholder="Mensagem"
        value={description}
        maxLength={100}
        required
        onChange={event => SetDescription(event.target.value)}
      />
      <div className={styles.carac}>
        {description.length ? `${description.length} / 100`: description.length === 0 && ''}
      </div>
    
          <button disabled={disability} type="submit" >
          Enviar Avaliação
      </button>
     
    </form>
    </>
  );
}