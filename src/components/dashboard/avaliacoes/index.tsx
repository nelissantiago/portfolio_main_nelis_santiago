import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import styles from './styles.module.scss'
import { Axios } from '../../../lib/axios'
import { avaliacoesProps } from '../../../@types/interfaces';
interface UsersProps {
  name: string;
  avatar: string;
  email: string;
  pool: avaliacoesProps
}


export function Form({ name, avatar, email, pool }: UsersProps) {
  const [title, SetTitle] = useState('')
  const [disability, SetDisability] = useState(false)
  const [description, SetDescription] = useState('')

    async function HandleForm(event: FormEvent) {
        event.preventDefault()
        
        try {
            const response = await Axios.post('/post', {
              title: title,
              description: description,
              avatar: avatar,
              createdAt: new Date(),
              userpool: {
                name: name,
                email: email
              }
         })         

         if(pool.userpool === response.data.userpool) {
          toast.error('Você já postou uma avaliação')
         } else {
          toast.success('Postado com sucesso')
          }

          
            SetTitle('')
            SetDescription('')
            SetDisability(false)

            } catch {
                toast('Tente Novamente Mais Tarde!!', {
                  type: 'error',
                  className: styles.error,
                  delay: 500,
                })

                
                SetTitle('')
                SetDescription('')
                SetDisability(false)
          }}

  return (
    <>
    <form onSubmit={HandleForm} className={styles.form}>
      <input
        placeholder={name === undefined ? 'Anonimo' : name}
        //value={name}
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