import { useEffect, useState } from "react";

// ---------- HOOK: encapsula as 3 regras de ouro para qualquer URL ----------
function useFetchStatus(url, atrasoMs = 0) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const controle = new AbortController();

    async function buscar() {
      setCarregando(true);
      setErro(null);

      try {
        // latência artificial opcional, útil pra visualizar o loading
        if (atrasoMs) {
          await new Promise((r) => setTimeout(r, atrasoMs));
        }

        const resposta = await fetch(url, { signal: controle.signal });

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - ${resposta.statusText}`);
        }

        const json = await resposta.json();
        setDados(json);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErro(e.message);
        }
      } finally {
        setCarregando(false);
      }
    }

    buscar();
    return () => controle.abort();
  }, [url, atrasoMs]);

  return { dados, carregando, erro };
}

// ---------- COMPONENTE: exibe os 4 estados textualmente ----------
function StatusAPI({ url, atrasoMs }) {
  const { dados, carregando, erro } = useFetchStatus(url, atrasoMs);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!dados || dados.length === 0) return <p>Nenhum item encontrado.</p>;

  return (
    <div>
      <p>Sucesso: {dados.length} itens carregados.</p>
      <ul>
        {dados.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

// ---------- APP: botões que trocam o cenário simulado ----------
const URL_SUCESSO = "https://jsonplaceholder.typicode.com/users";
const URL_VAZIA = "https://jsonplaceholder.typicode.com/users?id=99999";
const URL_ERRO = "https://jsonplaceholder.typicode.com/rota-que-nao-existe";

function App() {
  const [cenario, setCenario] = useState("sucesso");

  const config = {
    sucesso: { url: URL_SUCESSO, atrasoMs: 0 },
    lenta: { url: URL_SUCESSO, atrasoMs: 2000 }, // força loading visível
    vazia: { url: URL_VAZIA, atrasoMs: 0 },
    erro: { url: URL_ERRO, atrasoMs: 0 },
  };

  return (
    <div>
      <h1>Componente StatusAPI</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setCenario("lenta")}>Simular Loading</button>
        <button onClick={() => setCenario("erro")}>Simular Erro</button>
        <button onClick={() => setCenario("vazia")}>Simular Vazio</button>
        <button onClick={() => setCenario("sucesso")}>Simular Sucesso</button>
      </div>

      {/* key={cenario} força o componente a remontar a cada troca,
          garantindo que o useEffect rode do zero para o novo cenário */}
      <StatusAPI
        key={cenario}
        url={config[cenario].url}
        atrasoMs={config[cenario].atrasoMs}
      />
    </div>
  );
}
export default App;