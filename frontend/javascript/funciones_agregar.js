const enviar = document.getElementById('Mandar_server');
const volver_home = document.getElementById('regresar_al_index')
volver_home.addEventListener('click', function(){
  window.location.href = "index.html";
})
//-----------------funcion que envia datos al servidor para almacenarlos en la base de datos-----------
enviar.addEventListener('click', () => {
    const formData = new FormData(formulario);

    const data = {
        Name: formData.get('nombre'),   
        ID: formData.get('id'),         
        Num_cuenta: formData.get(num_cuenta),
        Carrera: formData.get('carrera')
    };

    fetch('http://localhost:8080/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())//le damos el formato json 
    .then(responseData => {//responseData es el dato json que retorna el then anterior 
        console.log(responseData);//imprimimos el valor
    })
    .catch(error => {
        console.error('Error:', error);
    });
});