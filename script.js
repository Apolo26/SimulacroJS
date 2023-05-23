const formulario = document.getElementById("miFormulario");
const nombreInput = document.getElementById("nombre");
const mensajeInput = document.getElementById("mensaje");
const emailInput = document.getElementById("email");
const listaErrores = document.getElementById("listaErrores");
const listaMensajes = document.getElementById("listaMensajes");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  limpiarErrores();

  const nombre = nombreInput.value.trim();
  const mensaje = mensajeInput.value.trim();
  const email = emailInput.value.trim();

  let errores = [];

  if (nombre === "") {
    errores.push("El nombre es obligatorio");
    resaltarError(nombreInput);
  }

  if (mensaje === "") {
    errores.push("El mensaje es obligatorio");
    resaltarError(mensajeInput);
  } else if (mensaje.length > 200) {
    errores.push("El mensaje debe tener máximo 200 caracteres");
    resaltarError(mensajeInput);
  }

  if (email !== "" && !validarEmail(email)) {
    errores.push("El email no es válido");
    resaltarError(emailInput);
  }

  if (errores.length > 0) {
    mostrarErrores(errores);
  } else {
    agregarMensaje(nombre, mensaje, email);
    limpiarCampos();
    nombreInput.focus();
  }
});

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarErrores(errores) {
  for (let i = 0; i < errores.length; i++) {
    const errorItem = document.createElement("li");
    errorItem.textContent = errores[i];
    listaErrores.appendChild(errorItem);
  }
}

function resaltarError(elemento) {
  elemento.classList.add("error");
}

function limpiarErrores() {
  while (listaErrores.firstChild) {
    listaErrores.removeChild(listaErrores.firstChild);
  }

  nombreInput.classList.remove("error");
  mensajeInput.classList.remove("error");
  emailInput.classList.remove("error");
}

function agregarMensaje(nombre, mensaje, email) {
  const mensajeItem = document.createElement("li");

  if (email !== "") {
    mensajeItem.textContent = `${nombre} dice: ${mensaje}. Contacto: ${email}.`;
  } else {
    mensajeItem.textContent = `${nombre} dice: ${mensaje}.`;
  }

  listaMensajes.appendChild(mensajeItem);
}

function limpiarCampos() {
  nombreInput.value = "";
  mensajeInput.value = "";
  emailInput.value = "";
}

nombreInput.focus();