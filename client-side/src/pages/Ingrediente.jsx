import { useState } from 'react'
import RegisterIng from '../components/RegisterIng'
import ShowIng from '../components/ShowIng'

export default function Ingrediente(props) {
    return (
        <div className='bg-secondary p-4'>
            <h1>Ingrediente</h1>
            <RegisterIng setChangeIng={props.setChangeIng} />
            <ShowIng changeIng={props.changeIng} setChangeIng={props.setChangeIng} />
        </div>
    )
}