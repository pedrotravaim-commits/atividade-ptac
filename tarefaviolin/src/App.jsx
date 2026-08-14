import { useEffect, useState } from "react";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function buscarUsuarios() {
      const resposta = await fetch("https://reqres.in/api/users?page=2");

      const dados = await resposta.json();

      setUsuarios(dados.data);
    }

    buscarUsuarios();
  }, []);

  return (
    <div>
      <h1>Usuários</h1>

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.primeiro_nome} {usuario.ultimo_nome} - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;