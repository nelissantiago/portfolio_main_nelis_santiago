import { useEffect, useState } from 'react'

export default function Teste() {
    const [data, setData] = useState([]);
    const [ search, SetSearch] = useState('')

    useEffect(() => {
        fetch('https://api.github.com/users/slaidezera/repos').then(response => response.json())
        .then(data => setData(data))
    }, [])

    if(data.length === 0){
        return <div>Carregando...</div>
    }

    const filterItens = data.filter((item) => {
        const Filter = item.name + item.description
        return Filter.toLowerCase().includes(search.toLowerCase())
    })
    
    console.log(data)
    return (
        <>
        <input 
            type="text"
            onChange={e => SetSearch(e.target.value)} 
        />

        <ul>
            {filterItens.map(item => (
                <li key={item.id}>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                </li>
            ))}
        </ul>
        {filterItens.length === 0 && (
            <p>Nenhum resultado encontrado</p>
        )}
        </>
    )
}