const btnEnviar = document.getElementById("enviar");
const btnReset = document.getElementById("resetBtn");
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const formulario = document.getElementById("enviar-mail");
const er =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



eventListener();
function eventListener() {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
  
  //reiniciar form
  btnReset.addEventListener('click',resetearFormulario);

  //enviar rmail
  formulario.addEventListener('submit',enviarEmail);
}

//Desabilitar el boton enviar al inicio
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

//Validar Formulario
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error !== null) {
      error.remove();
    }
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }
  //validar email
  if (e.target.type === "email") {

    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
    if (error !== null) {
      error.remove();
    }
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
      
    }else{
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no válido");
    }
  }

  if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  
  }
}

//Mostrar error
function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

//EnviarEmail
function enviarEmail(e){
  e.preventDefault();

  const spinner = document.querySelector("#spinner");
  spinner.style.display = 'flex';

  setTimeout( ()=>{
    spinner.style.display = 'none';

    const parrafo = document.createElement('p');
    parrafo.textContent ='El mensaje se envio correctamente';
    parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

    //insertar el parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner)

    setTimeout(()=>{
      parrafo.remove(); //eliminar el msj
      resetearFormulario();
    },2000)
  },3000);
}


//resetear formulario
function resetearFormulario(e){
  e.preventDefault();
  formulario.reset();

  iniciarApp()
}