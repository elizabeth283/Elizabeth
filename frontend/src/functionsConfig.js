export const FUNCTIONS = [
    {
        nombreFuncion: "ver_nombre",
        titulo: "Ver Nombre del Refugio",
        descripcion: "Consulta el nombre del refugio de animales",
        inputs: [],
        soloLectura: true
    },
    {
        nombreFuncion: "agregar_cliente",
        titulo: "Agregar Adoptante",
        descripcion: "Registra un nuevo adoptante en el sistema",
        inputs: [
            { name: "nombre", label: "Nombre del Adoptante", type: "string" },
            { name: "direccion", label: "Dirección", type: "string" },
            { name: "edad", label: "Edad", type: "u8" }
        ],
        soloLectura: false
    },
    {
        nombreFuncion: "agregar_servicio",
        titulo: "Agregar Animal",
        descripcion: "Registra un nuevo animal para adopción",
        inputs: [
            { name: "tipo_animal", label: "Tipo de Animal", type: "string" },
            { name: "nombre_animal", label: "Nombre del Animal", type: "string" },
            { name: "edad_animal", label: "Edad del Animal", type: "u8" }
        ],
        soloLectura: false
    },
    {
        nombreFuncion: "retornar_todo",
        titulo: "Ver Todos los Datos",
        descripcion: "Consulta toda la información del refugio",
        inputs: [],
        soloLectura: true
    }
];