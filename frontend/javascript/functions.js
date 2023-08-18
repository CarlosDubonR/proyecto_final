//--------------------- experimentando con jsvascript se debe llamar desde el index porque no 
//defini la funcion con ('click', function(){codigo})
function modificarParrafo() {
    var parrafo = document.getElementById('texto');
    if (parrafo) {
      parrafo.innerHTML = 'Nuevo contenido del párrafo';
    } else {
      console.error("El elemento con ID 'texto' no fue encontrado.");
    }
  }
//-------------------------------------------------------------------------------
//---------------------- para mostrar y ocultar tablas ----------------------------
  var botonTabla1 = document.getElementById('botonTabla1');
  var botonTabla2 = document.getElementById('botonTabla2');
  var tabla1 = document.getElementById('tabla1');
  var tabla2 = document.getElementById('tabla2');

  // Función para alternar la visibilidad de la tabla 1
  botonTabla1.addEventListener('click', function() {
    tabla1.classList.toggle('tabla-visible');
  });

  // Función para alternar la visibilidad de la tabla 2
  botonTabla2.addEventListener('click', function() {
    tabla2.classList.toggle('tabla-visible');
  });
//-----------------------------------------------------------------
//-----------------------desplegar ventana--------------------------
//                         F1
  document.getElementById("F1").addEventListener('click',()=>{
    document.getElementById("mi_f1").style.display = "block";
    
    fetch('http://localhost:8080/Acceso') 
    .then(response => response.json()) // Parsea la respuesta como JSON
    .then(data => {
        const llenadoTabla = document.getElementById('mi_body_f1') 
        llenadoTabla.innerHTML='';
        data.forEach(dato => {
          const fila = CrearFila(dato);
          llenadoTabla.appendChild(fila);
      });
        function CrearFila(data){
          const fila = document.createElement('tr');
          const celdaNombre = document.createElement('td');
          const celdaId = document.createElement('td');
          const celdaCarrera = document.createElement('td');    
          const celdaNum_Cuenta = document.createElement('td');  
          const celdaEntrada = document.createElement('td');
          const celdaSalida = document.createElement('td');
        
          celdaNum_Cuenta.textContent = data.num_cuenta;
          celdaNombre.textContent = data.name;
          celdaId.textContent = data.id;
          celdaCarrera.textContent = data.carrera;
          celdaEntrada.textContent = data.entrada;
          celdaSalida.textContent = data.salida
          fila.appendChild(celdaNum_Cuenta);
          fila.appendChild(celdaNombre);
          fila.appendChild(celdaCarrera);
          fila.appendChild(celdaId);
          fila.appendChild(celdaEntrada);
          fila.appendChild(celdaSalida);
          return fila;
        }
    })
    .catch(error => {
      resultado.innerHTML = 'Error al obtener los datos';
  });
  })
  document.getElementById("cerrar_f1").addEventListener('click', ()=>{
    document.getElementById("mi_f1").style.display = "none";
  })
  //                        D1
  document.getElementById("D1").addEventListener('click',()=>{
    document.getElementById("mi_d1").style.display = "block";

  })
  document.getElementById("cerrar_d1").addEventListener('click', ()=>{
    document.getElementById("mi_d1").style.display = "none";
  })
  //                       Busqueda
  document.getElementById("Buscar").addEventListener('click',()=>{
    document.getElementById("mi_busqueda").style.display = "block";
  })
  document.getElementById("cerrar_busqueda").addEventListener('click', ()=>{
    document.getElementById("mi_busqueda").style.display = "none";
  })
//--------------------------------------------------
//                        desplegar datos buscados
let input_elemento = document.getElementById("nombre");
let boton = document.getElementById("mi_busqueda_nombre");
boton.addEventListener('click',()=>{
  var data = input_elemento.value;
  fetch('http://localhost:8080/Buscar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
})

//-------------------------------------------------
//para hacer peticion al servidor
const obtenerDatos = document.getElementById('obtener-datos');
const resultado = document.getElementById('resultado');

obtenerDatos.addEventListener('click', () => {
  fetch('http://localhost:8080/data') 
      .then(response => response.json()) // Parsea la respuesta como JSON
      .then(data => {
          let contenido = '';
          data.forEach(item => {
              contenido += `#Cuenta: ${item.num_cuenta} ,Nombre: ${item.name}, Id: ${item.id}, Carrera: ${item.carrera}<br>`;
          });
          resultado.innerHTML = contenido;
      })
      .catch(error => {
          resultado.innerHTML = 'Error al obtener los datos';
      });
});

  //________________________________________________
  // para cambiar entre paginas de html agregar, eliminar , reportar
const cambiar = document.getElementById('btn_agregar')
cambiar.addEventListener('click', function(){
  window.location.href = "Agregar.html";
})
//---------------------------------------------------
const pag_eliminar = document.getElementById('btn_eliminar')
pag_eliminar.addEventListener('click', function(){
  window.location.href = "Eliminar.html";
})
//---------------------------------------------------
const pag_reportar = document.getElementById('btn_Reportar')
pag_reportar.addEventListener('click', function(){
  window.location.href = "Reportar.html";
})