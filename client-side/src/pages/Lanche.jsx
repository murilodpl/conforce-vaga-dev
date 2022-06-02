import { useState } from 'react'
import EditLanche from '../components/EditLanche'
import RegisterLanche from '../components/RegisterLanche'
import ShowLanche from '../components/ShowLanche'

export default function Lanche() {
    const [changeLanche, setChangeLanche] = useState(false)

    return (
        <div>
            <h1>Lanche</h1>
            <RegisterLanche setChangeLanche={setChangeLanche} />
            <EditLanche setChangeLanche={setChangeLanche} />
            {/* <ShowLanche changeLanche={changeLanche} setChangeLanche={setChangeLanche} /> */}
        </div>
    )
}