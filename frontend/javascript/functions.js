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
          const fechaEntrada = new Date(data.entrada)
          const HoraEntrada = `${fechaEntrada.getHours()}:${fechaEntrada.getMinutes()}:${fechaEntrada.getSeconds()}`
          celdaEntrada.textContent = HoraEntrada;
          if (data.salida !== "0001-01-01T00:00:00Z") {
            const fechaSalio = new Date(data.salida);
            const horaSalio = `${fechaSalio.getHours()}:${fechaSalio.getMinutes()}:${fechaSalio.getSeconds()}`;
            celdaSalida.textContent = horaSalio;
          }
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
//--Busca en base a Nombre y manda los resultados con ese nombre nada mas junto con los lugares donde estuvieron
let input_elemento = document.getElementById("nombre");
let boton = document.getElementById("mi_busqueda_nombre");
boton.addEventListener('click',()=>{
  var data = input_elemento.value;
  const MyData ={
    Name: data
  }
  fetch('http://localhost:8080/BuscarNombre', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(MyData)
  })
  .then(response => response.json())
  .then(resultados =>{
    console.log(resultados)
    const llenadoTabla = document.getElementById('my_resultado_busqueda') 
    llenadoTabla.innerHTML='';
    resultados.forEach(dato => {
      const fila = CrearFila(dato);
      llenadoTabla.appendChild(fila);
  });
  function CrearFila(data){
    const fila = document.createElement('tr');
    const celdaNombre = document.createElement('td');
    const celdaCarrera = document.createElement('td');    
    const celdaNum_Cuenta = document.createElement('td');
    const celdaRutas= document.createElement('td');
  
    //que le lleguen todos los datos despues de recorrer el forEach
    celdaNum_Cuenta.textContent = data.num_cuenta;
    celdaNombre.textContent = data.name;
    celdaCarrera.textContent = data.carrera;

    const tablaRutas = document.createElement('table');
    data.rutas.forEach(ruta => {
      const filaRuta = CrearFila_Ruta(ruta);
      tablaRutas.appendChild(filaRuta);
    });
    celdaRutas.appendChild(tablaRutas);

    fila.appendChild(celdaNum_Cuenta);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCarrera);
    fila.appendChild(celdaRutas);
    return fila;
  }
  function CrearFila_Ruta(datos) {
    const fila = document.createElement('tr');
    const celdaEdificio = document.createElement('td');
    const celdaEntrada = document.createElement('td');
    const celdaSalida = document.createElement('td');

    celdaEdificio.textContent = datos.edificio;
    const fechaEntro = new Date(datos.entro)
    const horaEntrada = `${fechaEntro.getHours()}:${fechaEntro.getMinutes()}:${fechaEntro.getSeconds()}`;
    celdaEntrada.textContent = horaEntrada;
    if (datos.salio !== "0001-01-01T00:00:00Z") {
      const fechaSalio = new Date(datos.salio);
      const horaSalio = `${fechaSalio.getHours()}:${fechaSalio.getMinutes()}:${fechaSalio.getSeconds()}`;
      celdaSalida.textContent = horaSalio;
    }

    fila.appendChild(celdaEdificio);
    fila.appendChild(celdaEntrada);
    fila.appendChild(celdaSalida);

    return fila;
  }
   
  })

  .catch(error => {
    resultado.innerHTML = 'Error al obtener los datos';
});
})
//---------busca en base a #Cuenta y muestra los lugares donde estuvo ---------------------------
let input_Id = document.getElementById("id");
let btn_buscar_id = document.getElementById("mi_busqueda_id");
btn_buscar_id.addEventListener('click',()=>{
  var data_id = parseInt(input_Id.value);
  const MyData ={
    Num_cuenta: data_id
  }
  fetch('http://localhost:8080/BuscarId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(MyData)
  })
  .then(respuesta_cuenta => respuesta_cuenta.json())
  .then(resultados =>{
    console.log(resultados)
    const llenadoTabla = document.getElementById('my_resultado_busqueda') 
    llenadoTabla.innerHTML='';
    resultados.forEach(dato => {
      const fila = CrearFila(dato);
      llenadoTabla.appendChild(fila);
  });
  function CrearFila(data){
    const fila = document.createElement('tr');
    const celdaNombre = document.createElement('td');
    const celdaCarrera = document.createElement('td');    
    const celdaNum_Cuenta = document.createElement('td');
    const celdaRutas= document.createElement('td');
  
    //que le lleguen todos los datos despues de recorrer el forEach
    celdaNum_Cuenta.textContent = data.num_cuenta;
    celdaNombre.textContent = data.name;
    celdaCarrera.textContent = data.carrera;

    const tablaRutas = document.createElement('table');
    data.rutas.forEach(ruta => {
      const filaRuta = CrearFila_Ruta(ruta);
      tablaRutas.appendChild(filaRuta);
    });
    celdaRutas.appendChild(tablaRutas);

    fila.appendChild(celdaNum_Cuenta);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCarrera);
    fila.appendChild(celdaRutas);
    return fila;
  }
  function CrearFila_Ruta(datos) {
    const fila = document.createElement('tr');
    const celdaEdificio = document.createElement('td');
    const celdaEntrada = document.createElement('td');
    const celdaSalida = document.createElement('td');

    celdaEdificio.textContent = datos.edificio;
    const fechaEntro = new Date(datos.entro)
    const horaEntrada = `${fechaEntro.getHours()}:${fechaEntro.getMinutes()}:${fechaEntro.getSeconds()}`;
    celdaEntrada.textContent = horaEntrada;
    if (datos.salio !== "0001-01-01T00:00:00Z") {
      const fechaSalio = new Date(datos.salio);
      const horaSalio = `${fechaSalio.getHours()}:${fechaSalio.getMinutes()}:${fechaSalio.getSeconds()}`;
      celdaSalida.textContent = horaSalio;
    }

    fila.appendChild(celdaEdificio);
    fila.appendChild(celdaEntrada);
    fila.appendChild(celdaSalida);

    return fila;
  }
   })
   .catch(error => {
    resultado.innerHTML = 'Error al obtener los datos';
});
 })
//-------------------------------------------------
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