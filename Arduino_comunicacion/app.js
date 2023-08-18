const SerialPort = require('serialport').SerialPort;
const { DelimiterParser }= require('@serialport/parser-delimiter') //sirve para detectar el salto de linea

const puerto = new SerialPort({ //instanciamos lib serial port con los parametros que necesito
    path: 'COM3',
    baudRate: 9600
});

//creamos constante de parsero, cada salto de linea indica nueva lectura
const parser = puerto.pipe(new DelimiterParser({delimiter: '\n'}))

//indica cuando el puerto esta abierto
parser.on('open', function(){ 
    console.log('conexion abiserta....');
});

//indica cuando se envian datos, al mismo tiempo decodifica
//asi podemos entenderlos, esto se hace con las 3 primeras lineas
parser.on('data', function(data){
    var enc = new TextDecoder();    
    var arr = new Uint8Array(data); //esto es un formato de decodificacion
    ready = enc.decode(arr).split(','); //aqui se decodifica y se separan los datos en el codigo y lugar
    let codigo = ready[0];
    let lugar = ready[1];
    console.log(codigo, lugar);
    
    const datos  = {
        id : codigo,
        edificio: lugar,
    };

    // Hacemos la solicitud del método POST para enviarle datos para que el servidor los procese
fetch('http://localhost:8080/procesar', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(datos) // data es el string de ready convertido en JSON para compararlo con el ID que tengo en el servidor
})

puerto.on('error',function(err){
    console.log(err);
});
})
