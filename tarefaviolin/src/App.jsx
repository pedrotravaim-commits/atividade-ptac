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
    const controle = new AbortController(); // controlador desta requisição

    async function buscarUsuarios() {
      try {
        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controle.signal } // amarra o fetch ao AbortController
        );

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
        }

        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (e) {
        // REGRA DE OURO 3: ignora o erro "esperado" do cancelamento
        if (e.name !== "AbortError") {
          setErro(e.message);
        }
      } finally {
        setCarregando(false);
      }
    }
    buscarUsuarios();

    // Cleanup: roda ao desmontar (ou antes do efeito rodar de novo)
    return () => controle.abort();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <h1>usuarios lista</h1>
      <ListaUsuarios usuarios={usuarios} />
    </div>
  );
}
export default App;