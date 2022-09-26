import { useState } from 'react';
import { toast } from 'react-toastify';
import { sendContactMail } from '../../../services/email';
import styles from './styles.module.scss'


export default function Form() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const [loading, setLoading] = useState(false);
   
  async function handleSubmit(event) {
    event.preventDefault();

    await sendContactMail(nome, email, mensagem);

    if (nome === '' || email === '' || mensagem === '' || loading) {
      toast.error('Preencha todos os campos.')
    } else {
      toast.success('Enviamos sua mensagem.')
    }
  }

  return (
    <>
    <form data-aos="fade-up" onSubmit={handleSubmit} className={styles.form}>
      <input
        placeholder="Nome"
        value={nome}
        onChange={({ target }) => setNome(target.value)}
        type="name"
      />
      <input
        placeholder="E-mail"
        required
        type="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />
      <textarea
        placeholder="Mensagem"
        value={mensagem}
        maxLength={200}
        required
        onChange={({ target }) => setMensagem(target.value)}
      />
      <div className={styles.carac}>
        {mensagem.length ? `${mensagem.length} / 200`: mensagem.length === 0 && ''}
      </div>
      <button type="submit" disabled>
        Enviar mensagem
      </button>
    </form>
    </>
  );
}
