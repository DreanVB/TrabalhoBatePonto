
adm = localStorage.adm
if(adm != "1")
{
    location.href = "index.html"
}
async function getUsuarios()
{
   usuarios = await (await fetch("http://127.0.0.1:3000/usuarios")).json()
    for (let elemento of usuarios)
    {
        document.getElementById("customers").innerHTML += `<tr><td>${elemento.login}</td><td>${elemento.senha}</td><td ><i onClick="apagarUsuario('${elemento.id}')" class="fa-solid fa-trash-can iconevermelho"></i></td></tr>`
    } 
}
async function apagarUsuario(id)
{
  if(confirm()){
    await (await fetch("http://127.0.0.1:3000/apagar/"+id)).json()
    location.reload()    }
}
async function criarUsuario()
{
  event.preventDefault()  
  login=document.getElementById("login").value
    senha=document.getElementById("senha").value
    nome=document.getElementById("nome").value
    id=uuidv4()
    idFolha=uuidv4()
    await (await fetch(`http://127.0.0.1:3000/criarUsuario/${login}/${senha}/${id}/${nome}/${idFolha}`)).json()
    location.reload()

}

getUsuarios()
