import { useEffect, useState } from "react";

function App() {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    async function buscarComentarios() {
      const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/comments?postId=1"
      );

      const dados = await resposta.json();

      setComentarios(dados);
    }

    buscarComentarios();
  }, []);

  return (
    <div>
      <h1>Comentários do Post 1</h1>

      <ul>
        {comentarios.map((comentario) => (
          <li key={comentario.id}>
            <strong>{comentario.name}</strong> - {comentario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;