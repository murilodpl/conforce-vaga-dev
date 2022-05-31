import { useState } from 'react'
import Ingrediente from "./components/Ingrediente/Ingrediente";
import Lanche from './components/Lanche/Lanche';

export default function App() {
  const [isIngrediente, setIsIngrediente] = useState(true)

  return (
    <div className='container bg-secondary p-4'>
      {isIngrediente ? <Ingrediente /> : <Lanche />}
    </div>
  )
}