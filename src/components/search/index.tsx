import { useEffect, useState } from 'react'
import { formatDate } from './format';
import { LoadingSearch } from './Loading';
import { ListRepositorys } from './RepositorysList'
import styles from './styles.module.scss'
import { Repos, Search } from '../utils/CreateSVG'
import { FragementParticles } from '../utils/particles';

export function SearchCreate() {
    const [data, setData] = useState([]);
    const [ search, SetSearch] = useState('')

    useEffect(() => {
        fetch('https://api.github.com/users/slaidezera/repos')
        .then(response => response.json())
        .then(data => setData(data))
    }, [])

    if(data.length === 0){
        return <LoadingSearch />
    }

    const filterItens = data.filter((item) => {
        const Filter = item.name + item.description + item.language
        return Filter.toLowerCase().includes(search.toLowerCase())
    })

    return (
            <>
                <main className={styles.main}>
                    <div className={styles.grid}>
                            <header className={styles.header}>
                                <h2 className={styles.title}>Repositorios</h2>
                                <div className={styles.search}>
                                <Search />
                                    <input
                                        type="text"
                                        placeholder="Pesquisar por conteudo"
                                        className={styles.inputSearch}
                                        onChange={e => SetSearch(e.target.value)}
                                    />
                                    <div className={styles.repos}>
                                        <Repos /> {filterItens.length}
                                    </div>
                                </div>
                            </header>
                            <div className={styles.content}>
                                {filterItens.map(react => {
                                    return (
                                        <>
                                            <ListRepositorys
                                                key={react.id}
                                                title={react.name}
                                                link={react.html_url}
                                                description={react.description}
                                                charge={react.visibility}
                                                date={formatDate(react.created_at)}
                                                types={react.language}
                                            />
                                        </>
                                    )
                                })}
                                {filterItens.length === 0 && (
                                    <p className={styles.error}>Nenhum resultado encontrado</p>
                                )}
                            </div>
                        </div>
                </main>
                <FragementParticles />
            </>
    )
}