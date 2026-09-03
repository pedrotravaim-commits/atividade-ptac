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
    const controle = new AbortController();

    async function buscarUsuarios() {
      try {
        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controle.signal }
        );

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErro(e.message);
        }
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuarios();
    return () => controle.abort();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <h1>usuarios lista</h1>
      {usuarios.length === 0 ? (
        <p>Nenhum usuário encontrado.</p>
      ) : (
        <ListaUsuarios usuarios={usuarios} />
      )}
    </div>
  );
}

export default App;