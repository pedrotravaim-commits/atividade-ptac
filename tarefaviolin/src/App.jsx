import { useEffect, useState } from "react";

function App() {
const [usuario, setUsuario] = useState(null);

useEffect(() => {
async function buscarUsuario() {
const resposta = await fetch("https://reqres.in/api/users/5");

const dados = await resposta.json();
setUsuario(dados.data);
}
buscarUsuario();
}, []);

if (usuario === null) {
return <h1>Carregando</h1>;
}

return (
<div>
<h1>
{usuario.primeiro_nome} {usuario.ultimo_nome}
</h1>

<p>{usuario.email}</p>
</div>
);
}

export default App;