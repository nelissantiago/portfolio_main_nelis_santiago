interface Props {
    user: {
        name: string,
        email: string,
        id: string,
        roles: string
      }
}
import styles from '../home/styles.module.scss'
export function HistoryAdmin(props: Props) {
    return (
        <>
                                        <tr>
                                            <td className={styles.id}>{props.user.id}</td>
                                            <td>{props.user.name}</td>
                                            <td>{props.user.email}</td>
                                            <td>{props.user.roles}</td>
                                        </tr>  
        </>
    )
}