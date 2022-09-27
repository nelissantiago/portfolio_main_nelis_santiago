import { gql, useQuery }  from '@apollo/client'
import styles from './styles.module.scss'
import Image from 'next/future/image'

const GET_BY_AVALIATION_GRAPH = gql`
query MyQuery {
    avaliationClientes(stage: PUBLISHED, orderBy: publishedAt_ASC) {
      conteudo
      avatar
      nome
      titulo
    }
  }
`
interface GetAssessmentsProps {
    avaliationClientes: {
        conteudo: string;
        avatar: string;
        nome: string;
        titulo: string;
    }[]
}
  
export function UsersList() {
    const { data } = useQuery<GetAssessmentsProps>(GET_BY_AVALIATION_GRAPH)
    
    return (
        <>
             {data?.avaliationClientes.map(react => {
                return (
                    <>
                    <div className={styles.list}>
                    <div className={styles.profile}>
                        <Image src={react.avatar} alt="" width={49} height={49} />
                        <span>{react.nome}</span>
                    </div>
                    <div className={styles.text}>
                        <strong>{react.titulo}</strong>
                        <p>
                            {react.conteudo}
                        </p>
                    </div>
                </div>
                    </>
                )
             })}
        </>
    )
}