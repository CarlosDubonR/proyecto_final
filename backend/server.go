package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/rs/cors"
)

// usado para dar la lista de los lugares donde estuvo
type RutaAlumno struct {
	Edificio string    `json:"edificio"`
	Entro    time.Time `json:"entro"`
	Salio    time.Time `json:"salio"`
}

// Data es un objeto que almacena los datos del alumno
type Data struct {
	Num_cuenta int          `json:"num_cuenta"`
	Name       string       `json:"name"`
	Id         string       `json:"id"`
	Carrera    string       `json:"carrera"`
	Estado     bool         `json:"estado"` //si es verdadero esta dentro sino pues por defecto esta fuera
	Entrada    time.Time    `json:"entrada"`
	Salida     time.Time    `json:"salida"`
	Rutas      []RutaAlumno `json:"rutas"`
}

// una mini base de datos
var miSlice []Data

// una base de datos donde solo estan los que entran a la U
var dentroU []Data

// mostrar los datos de alumnos dentro de la U (GET)
// vamos almacenando las personas que estan dentro de la UNAH
func handleAcceso(w http.ResponseWriter, r *http.Request) {
	// Configurar la cabecera para indicar que la respuesta será JSON
	w.Header().Set("Content-Type", "application/json")

	// Convertir el slice de objetos Data a JSON
	DentroUNAH, err := json.Marshal(dentroU)
	if err != nil {
		http.Error(w, "Error al convertir a JSON", http.StatusInternalServerError)
		return
	}
	// Escribir la respuesta JSON en el cuerpo de la respuesta
	w.Write(DentroUNAH)
}

// Manejo de la base de datos dentro del servidor (GET)
// es una base de datos de las personas que tienen acceso para entrar
func handleData(w http.ResponseWriter, r *http.Request) {
	// Configurar la cabecera para indicar que la respuesta será JSON
	w.Header().Set("Content-Type", "application/json")

	// Convertir el slice de objetos Data a JSON
	jsonData, err := json.Marshal(miSlice)
	if err != nil {
		http.Error(w, "Error al convertir a JSON", http.StatusInternalServerError)
		return
	}
	// Escribir la respuesta JSON en el cuerpo de la respuesta
	w.Write(jsonData)
}

// Manejador para la ruta /add (POST)
func handleAddData(w http.ResponseWriter, r *http.Request) {
	// Decodificar el JSON recibido en la solicitud
	var newData Data
	if err := json.NewDecoder(r.Body).Decode(&newData); err != nil {
		http.Error(w, "Error al decodificar JSON", http.StatusBadRequest)
		return
	}

	// Agregar el nuevo dato al slice utilizando append
	miSlice = append(miSlice, newData)

	// Enviar una respuesta de éxito
}

// maneja la comprobacion de si es o no es un alumno (POST)
func buscarUID(w http.ResponseWriter, r *http.Request) {
	// Decodificar el JSON recibido en la solicitud
	var data map[string]string
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "Error al decodificar JSON", http.StatusBadRequest)
		return
	}

	// Obtener el ID que se desea buscar
	idBuscado := data["id"]
	ubicacion := data["edificio"]
	// Realizar la búsqueda en el slice
	encontrado := false
	var datosEncontrados Data
	for i, dato := range miSlice {
		if dato.Id == idBuscado {
			encontrado = true
			datosEncontrados = dato
			if !(datosEncontrados.Estado) {
				fmt.Println("alumno entrando")
				datosEncontrados.Entrada = time.Now()
				datosEncontrados.Salida = time.Time{}
				miSlice[i].Estado = true
				datosEncontrados.Estado = miSlice[i].Estado
				//busca si ya esta dentro de la U y luego actualiza los datos
				//agrega solamente los datos de Ruta a MiSlice para hacer la busqueda general luego
				elemento := false
				for j, data := range dentroU {
					fmt.Println("entro al for")
					if idBuscado == data.Id {
						elemento = true
						fmt.Println("el alumno esta registrado en dentroU, actualizar datos de entrada")
						dentroU[j].Entrada = datosEncontrados.Entrada
						dentroU[j].Salida = datosEncontrados.Salida
						dentroU[j].Estado = datosEncontrados.Estado
						dentroU[j].Rutas = append(dentroU[j].Rutas, RutaAlumno{
							Edificio: ubicacion,
							Entro:    datosEncontrados.Entrada,
							Salio:    datosEncontrados.Salida,
						})
						break
					}
				}
				if !(elemento) {
					fmt.Println("se agrego un nuevo elemento a la lista dentroU")
					datosEncontrados.Rutas = append(datosEncontrados.Rutas, RutaAlumno{
						Edificio: ubicacion,
						Entro:    datosEncontrados.Entrada,
						Salio:    datosEncontrados.Salida,
					})
					dentroU = append(dentroU, datosEncontrados)
				}
				//Acciones si el estudiante salio
			} else {
				datosEncontrados.Salida = time.Now()
				miSlice[i].Estado = false
				datosEncontrados.Estado = miSlice[i].Estado
				fmt.Println("alumno saliendooooo")
				datosEncontrados.Estado = miSlice[i].Estado
				//busca si ya esta dentro de la U y luego actualiza los datos
				//agrega solamente los datos de Ruta a MiSlice para hacer la busqueda general luego
				//elemento := false
				for j, data := range dentroU {
					fmt.Println("entro al for para actualizar salidas")
					if idBuscado == data.Id {

						fmt.Println("el alumno esta registrado en dentroU, actualizar datos de salida")
						dentroU[j].Salida = datosEncontrados.Salida
						dentroU[j].Estado = datosEncontrados.Estado
						longitud := len(dentroU[j].Rutas) - 1
						dentroU[j].Rutas[longitud].Salio = datosEncontrados.Salida
						break
					}
				}
			}
			fmt.Println("encontrado")
			break
		}
	}

	// Devolver la respuesta al cliente
	//revisaremos si el dato esta en el arreglo
	//Si esta entonces solo actualizar la hora nada mas
	if encontrado {
		fmt.Println("El ID se encuentra en el slice. Todo bien todo correcto")
	} else {
		fmt.Println("El ID no se encuentra en el slice. Mandar una alerta")
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/data", handleData) //muestra la mini base de datos
	mux.HandleFunc("/Acceso", handleAcceso)
	mux.HandleFunc("/add", handleAddData)
	mux.HandleFunc("/procesar", buscarUID)
	//inicializamos la base de datos con algunos datos en ella y asumimos que antes de iniciar todos estan fuera
	miSlice = []Data{
		{Num_cuenta: 201810321267,
			Name:    "Carlos Dubon",
			Id:      "E9AA60A3",
			Carrera: "Matematicas",
			Estado:  false,
			Entrada: time.Time{},
			Salida:  time.Time{},
			Rutas:   []RutaAlumno{},
		},
		{Num_cuenta: 201810321289,
			Name: "María", Id: "otro string",
			Carrera: "Medicina",
			Estado:  false,
			Entrada: time.Time{},
			Salida:  time.Time{},
			Rutas: []RutaAlumno{
				{Edificio: "C1", Entro: time.Time{}, Salio: time.Time{}},
				{Edificio: "D1", Entro: time.Time{}, Salio: time.Time{}},
				{Edificio: "F1", Entro: time.Time{}, Salio: time.Time{}},
			},
		},
	}

	dentroU = []Data{{
		Num_cuenta: 27288292,
		Name:       "jose kaaja",
		Id:         "E933A32DAE",
		Carrera:    "biologia",
		Estado:     true,
		Entrada:    time.Date(0, time.July, 28, 13, 0, 0, 0, time.UTC),
		Salida:     time.Date(0, time.July, 28, 14, 0, 0, 0, time.UTC),
		Rutas: []RutaAlumno{
			{Edificio: "f1", Entro: time.Date(0, time.July, 28, 13, 0, 0, 0, time.UTC), Salio: time.Date(0, time.July, 28, 14, 1, 0, 0, time.UTC)},
			{Edificio: "D1", Entro: time.Date(0, time.July, 28, 14, 5, 0, 0, time.UTC), Salio: time.Date(0, time.July, 28, 14, 9, 0, 0, time.UTC)},
			{Edificio: "F1", Entro: time.Date(0, time.July, 28, 15, 0, 0, 0, time.UTC), Salio: time.Date(0, time.July, 28, 16, 30, 0, 0, time.UTC)},
		},
	},
	}
	// acepta parejo toda peticion
	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":8080", handler)
}
