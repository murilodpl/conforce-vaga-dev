import { useState } from 'react'
import Ingrediente from "./pages/Ingrediente";
import Lanche from './pages/Lanche';

export default function App() {
  const [isIngrediente, setIsIngrediente] = useState(true)

  return (
    <div className='container bg-secondary p-4'>
      {isIngrediente ? <Ingrediente /> : <Lanche />}
    </div>
  )
}