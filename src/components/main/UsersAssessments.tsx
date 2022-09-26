import { gql, useQuery }  from '@apollo/client'
import styles from './styles.module.scss'

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
                        <img src={react.avatar} alt="" />
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