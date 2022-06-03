import { useState } from 'react'
import Ingrediente from "./pages/Ingrediente";
import Lanche from './pages/Lanche';

export default function App() {
  const [changeIng, setChangeIng] = useState(false)

  return (
    <div className='container'>
      <Ingrediente changeIng={changeIng} setChangeIng={setChangeIng} />
      <hr className='my-[8vh]' />
      <Lanche changeIng={changeIng} setChangeIng={setChangeIng} />
    </div>
  )
}