import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const[usuarios, setUsuarios] = useState([])

  useEffect(() => {
    async function  buscarUsuarios() {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/users')
      const dados = await resposta.json()
      setUsuarios(dados)
    
    }
    buscarUsuarios()
  }, [])
  
  return (
    <>
      <section id="center">
       <h1>Lista de usuarios</h1>
       <ul>usuarios.map(usuario) =(
        <li key={usuarios.id}>
          </li>)</ul>
      </section>
    </>
  )
}
export default App


