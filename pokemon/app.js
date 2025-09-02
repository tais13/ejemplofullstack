// --- Registro, Login y Sesión ---
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
  
    // Mostrar botón de cerrar sesión si hay usuario logueado
    const nav = document.querySelector("nav");
    if (usuario && nav) {
        const logoutLink = document.createElement("a");
        logoutLink.href = "#";
        logoutLink.textContent = "Cerrar sesión";
        logoutLink.onclick = (e) => {
          e.preventDefault();
          cerrarSesion();
        };
        nav.appendChild(logoutLink);
    }
      
  
    // --- Registro ---
    const formRegistro = document.getElementById("formRegistro");
    if (formRegistro) {
      formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;
        const direccion = document.getElementById("direccion").value;
  
        if (nombre.length < 3) {
          alert("El nombre debe tener al menos 3 caracteres.");
          return;
        }
        if (!correo.includes("@")) {
          alert("Correo inválido.");
          return;
        }
        if (password.length < 6) {
          alert("La contraseña debe tener mínimo 6 caracteres.");
          return;
        }
        if (direccion.length < 5) {
          alert("Por favor ingresa una dirección válida.");
          return;
        }
  
        localStorage.setItem("usuario", JSON.stringify({ nombre, correo, password, direccion }));
        alert("Registro exitoso. ¡Bienvenido " + nombre + "! Tu pedido será enviado a " + direccion);
        window.location.href = "login.html";
      });
    }
  
    // --- Login ---
    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
      formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const correo = document.getElementById("loginCorreo").value;
        const password = document.getElementById("loginPassword").value;
  
        const usuario = JSON.parse(localStorage.getItem("usuario"));
  
        if (usuario && usuario.correo === correo && usuario.password === password) {
          alert("Bienvenido " + usuario.nombre + "!");
          window.location.href = "index.html";
        } else {
          alert("Credenciales incorrectas.");
        }
      });
    }
  
    // --- Carrito ---
    mostrarCarrito();
  });
  
  // --- Carrito ---
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  function agregarCarrito(producto, precio, cantidad = 1) {
    cantidad = parseInt(cantidad);   // Convertimos cantidad a número
    precio = Number(precio);         // Aseguramos que precio sea número
  
    if (isNaN(cantidad) || cantidad < 1 || cantidad > 50) {
      alert("La cantidad debe estar entre 1 y 50.");
      return;
    }
  
    carrito.push({ producto, precio, cantidad });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${cantidad} carta(s) de ${producto} añadida(s) al carrito.`);
    mostrarCarrito();
  }
  
  function mostrarCarrito() {
    const lista = document.getElementById("listaCarrito");
    const total = document.getElementById("total");
    if (lista && total) {
      lista.innerHTML = "";
      let suma = 0;
      carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.cantidad}x ${item.producto} - $${item.precio * item.cantidad}`;
        lista.appendChild(li);
        suma += item.precio * item.cantidad;
      });
      total.textContent = "Total: $" + suma;
    }
  }
  
  function vaciarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
  
  function comprar() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      alert("Debes iniciar sesión para comprar.");
      window.location.href = "login.html";
      return;
    }
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert(
      "¡Gracias por tu compra, " +
        usuario.nombre +
        "! Tu pedido será enviado a: " +
        usuario.direccion
    );
    vaciarCarrito();
  }
  
  // --- Cerrar sesión ---
  function cerrarSesion() {
    localStorage.removeItem("usuario");
    alert("Has cerrado sesión correctamente.");
    window.location.href = "index.html";
  }
  