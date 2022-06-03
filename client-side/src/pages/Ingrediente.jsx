import { useState } from 'react'
import RegisterIng from '../components/RegisterIng'
import ShowIng from '../components/ShowIng'

export default function Ingrediente() {
    const [changeIng, setChangeIng] = useState(false)

    return (
        <div>
            <h1>Ingrediente</h1>
            <RegisterIng setChangeIng={setChangeIng} />
            <ShowIng changeIng={changeIng} setChangeIng={setChangeIng} />
        </div>
    )
}