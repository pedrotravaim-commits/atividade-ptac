import { useEffect, useState } from "react";

function ListaUsuarios({ usuarios }) {
return (
<ul>
{usuarios.map((usuario) => (
<li key={usuario.id}>
{usuario.name}
</li>
))}
</ul>
);
}

function App() {
const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
async function buscarUsuarios() {
const resposta = await fetch(
"https://jsonplaceholder.typicode.com/users"
);

const dados = await resposta.json();

setUsuarios(dados);}
buscarUsuarios();}, []);

return (
<div>
<h1>usuarios lista</h1>
<ListaUsuarios usuarios={usuarios} />
</div>
);}
export default App;