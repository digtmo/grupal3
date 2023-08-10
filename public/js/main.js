const emailCrearUsuario=  document.getElementById("emailCrearUsuario");
const contraseñaCrearUsuario = document.getElementById("contraseñaCrearUsuario");
const emailIniciarSesion = document.getElementById("emailIniciarSesion");
const contraseñaIniciarSesion = document.getElementById("contraseñaIniciarSesion");



async function cargar() {
  const resultado = await fetch("/getUsuarios");
  const usuarios = await resultado.json();

  const tablausuarios = document.getElementById('tabla-usuarios')
  tablausuarios.innerHTML = ""

  usuarios.forEach(element => {
    const fila = document.createElement('tr')

    const columnaId = document.createElement('td')
    columnaId.textContent = element.id
    fila.appendChild(columnaId)

    const columnaemail = document.createElement('td')
    columnaemail.textContent = element.email
    fila.appendChild(columnaemail)

    const columnaPassword = document.createElement('td')
    columnaPassword.textContent = element.password
    fila.appendChild(columnaPassword)


    tablausuarios.appendChild(fila)
  });
}

cargar() 



async function agregar(){
    
    const data ={
         email:emailCrearUsuario.value,
         password:contraseñaCrearUsuario.value};
    console.log(data)
     const resultado = await fetch("http://localhost:3000/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), 
      })
      if(resultado.status==400){
        alert("Error en el ingreso");
      }else{
        alert("Dato Ingresado");
        cargar(); 
      }
     

}

async function ingresar(){
    
  const data ={
       email:emailIniciarSesion.value,
       password:contraseñaIniciarSesion.value};
  console.log(data)
      const resultado = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), 
    })
    if(resultado.status==400){
      alert("Usarios o contraseña incorrecto");
    }else{
      alert("Inicio de sesion exitoso");
    }

}

