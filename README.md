# Acceso y rastreo inteligente con RFID 

el uso de este proyecto es orientado a la seguridad y la eficiencia en el flujo estudiantil dentro de CU,
con este proyecto busca como objetivos 
  1. reducir el tiempo que se pierde en revision de carnets y personal a cargo de esa labor.
  2. controlar el acceso de personas dentro de las instalaciones sabiendo exactamente quienes son y donde estuvieron.
  3. saber la cantidad de personas dentro de cada edificio para poder hacer una distribucion de aulas mas eficiente.
     
el funcionamiento se basa en una antena emisora de señal en cada portal de acceso, esta antena emite una señal de radio que al estar lo suficientemente cerca esta exita un receptor ubicado en cada tarjeta y llavero para saber su codigo unico, luego manda este codigo junto con la ubicacion de la lectura para ser procesado por el servidor que agrega la hora del evento y lo almacena en una base de datos interna.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación 
La instalacion se divide en 3 pasos:
  1. instalar un gestor de codigo c++ para arduino (PlatformIo)
  2. descargar Node.js usando npm
  3. seleccionar el paqueten donde estara su proyecto y asignarle la libreria #include <MFRC522.h>

**instalacion de gestor:**

en el buscador de visualstudio buscar platformio y descargarlo, la instalacion correcta no anexara un simbolo de ![image](https://github.com/CarlosDubonR/proyecto_final/assets/134743314/d09b5521-8553-433a-958d-35601ac8a5ac) que nos haran poder compilar y subir el codigo a nuestra placa arduino

**Descargar Node.js**:
inicializamos un proyecto creando una carpeta especifica solo para este, nos iremos al navegador y descargaremos la verison mas reciente a fecha de hoy (21/08/23) aceptamos los terminos y de preferencia escoger la carpeta de instalacion en la carpeta que creamos y luego todo lo dejamos por defecto.

**seleccionar el paquete MRFC22.h**
en platformio seleccionamos la carpeta donde estara nuestro codigo c++ para arduino y buscamos esta libreria<MFRC522.h>, la descargamos y dejamos para uso dentro de esa carpeta.

## USO
arrancamos el servidor y luego la aplicacion node.js con node app.js , no hacerlo a la inversa sino tendran errores, luego el sistema procede a mostrar en consola de visual las personas que entran y salen al mismo tiempo que se actualiza los datos en el servidor, dentro del sitio web se podran visualisar y gestionar de la manera que se deseen.


