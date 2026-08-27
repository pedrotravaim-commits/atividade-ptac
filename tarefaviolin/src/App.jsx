import { useEffect, useState } from "react";

function ListaUsuarios({ usuarios }) {
  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>{usuario.name}</li>
      ))}
    </ul>
  );
}

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true); // <-- novo estado

  useEffect(() => {
    async function buscarUsuarios() {
      const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      const dados = await resposta.json();

      setUsuarios(dados);
      setCarregando(false); // <-- desliga o loading só quando os dados chegam
    }
    buscarUsuarios();
  }, []);

  return (
    <div>
      <h1>usuarios lista</h1>

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <ListaUsuarios usuarios={usuarios} />
      )}
    </div>
  );
}
export default App;