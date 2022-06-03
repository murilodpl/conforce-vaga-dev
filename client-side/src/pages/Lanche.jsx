import { useState } from 'react'
import RegisterLanche from '../components/RegisterLanche'
import ShowLanche from '../components/ShowLanche'

export default function Lanche(props) {
    const [changeLanche, setChangeLanche] = useState(false)

    return (
        <div className='bg-secondary p-4'>
            <h1>Lanche</h1>
            <RegisterLanche setChangeLanche={setChangeLanche} changeIng={props.changeIng} />
            <ShowLanche changeLanche={changeLanche} setChangeLanche={setChangeLanche} />
        </div>
    )
}