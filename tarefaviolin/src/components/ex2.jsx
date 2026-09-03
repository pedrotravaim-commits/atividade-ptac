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
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/usuariosenterrado"
        );
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
        }
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    buscarUsuarios();
  }, []);

  if (carregando) return <p>Carregando</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <h1>usuarios lista</h1>
      <ListaUsuarios usuarios={usuarios} />
    </div>
  );
}

export default App;