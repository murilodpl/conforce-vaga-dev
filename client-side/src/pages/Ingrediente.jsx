import { useState } from 'react'
import CadastroIng from '../components/CadastroIng'
import ShowIng from '../components/ShowIng'

export default function Ingrediente() {
    const [changeIng, setChangeIng] = useState(false)

    return (
        <div>
            <h1>Ingrediente</h1>
            <CadastroIng setChangeIng={setChangeIng} />
            <ShowIng changeIng={changeIng} />
        </div>
    )
}