const SerialPort = require('serialport').SerialPort;
const { DelimiterParser }= require('@serialport/parser-delimiter') //sirve para detectar el salto de linea

const puerto = new SerialPort({ //instanciamos lib serial port con los parametros que necesito
    path: 'COM3',
    baudRate: 9600
});

const parser = puerto.pipe(new DelimiterParser({delimiter: '\n'}))//creamos constante de parsero, cada salto de linea indica nueva lectura

parser.on('open', function(){ //indica cuando el puerto esta abierto
    console.log('conexion abiserta....');
});

parser.on('data', function(data){//indica cuando se envian datos, al mismo tiempo decodifica
    var enc = new TextDecoder();    //asi podemos entenderlos, esto se hace con las 3 primeras lineas
    var arr = new Uint8Array(data); //esto es un formato de decodificacion
    ready = enc.decode(arr); //aqui se decodifica como tal
    //console.log(typeof(ready));   //esta linea era para saber el tipo de dato que resivo
    console.log(ready);
    
    const datos  = {
        id : ready
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
    console,log(err);
});
})
