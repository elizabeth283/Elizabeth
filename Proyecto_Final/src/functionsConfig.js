export const FUNCTIONS = [
    {
        titulo: "Ver Nombre del Refugio",
        descripcion: "Consultar el nombre registrado del refugio de animales",
        nombreFuncion: "ver_nombre",
        soloLectura: "1",
        inputs: []
    },

    {
        titulo: "Registrar Nuevo Adoptante",
        descripcion: "Agregar un nuevo adoptante al sistema con nivel inicial Básico.",
        nombreFuncion: "agregar_cliente",
        soloLectura: "0",
        inputs: [
            { name: "nombre_cliente", type: "string", label: "Nombre del Adoptante" },
            { name: "direccion_facturacion", type: "string", label: "Dirección del Hogar" },
            { name: "ano_de_registro", type: "u8", label: "Año de Registro (ej. 24)" },
            { name: "id_cliente", type: "u16", label: "ID Único de Adoptante" }
        ]
    },
    {
        titulo: "Registrar Animal para Adopción",
        descripcion: "Agregar un nuevo animal al sistema de adopción.",
        nombreFuncion: "agregar_servicio",
        soloLectura: "0",
        inputs: [
            { name: "id_cliente", type: "u16", label: "ID del Adoptante" },
            { name: "servicio", type: "string", label: "Nombre/Especie del Animal" }
        ]
    },
    {
        titulo: "Ascender a Adoptante VIP",
        descripcion: "Promover adoptante a nivel VIP (múltiples adopciones exitosas).",
        nombreFuncion: "cambiar_nivel_a_oro",
        soloLectura: "0",
        inputs: [
            { name: "id_cliente", type: "u16", label: "ID del Adoptante" }
        ]
    },
    {
        titulo: "Consultar Beneficios de Adopción",
        descripcion: "Ver beneficios disponibles según el nivel del adoptante",
        nombreFuncion: "aplicar_descuento",
        soloLectura: "1",
        inputs: [
            {name: "id_cliente", type:"u16", label: "ID del Adoptante"}
        ]
    },
    {
        titulo: "Perfil del Adoptante",
        descripcion: "Ver perfil completo e historial de adopciones",
        nombreFuncion: "ver_estado_cliente",
        soloLectura: "1",
        inputs: [
            {name: "id_cliente", type:"u16", label: "ID del Adoptante"}
        ]
    },
    {
        titulo: "Expediente Completo",
        descripcion: "Consultar toda la información del adoptante y sus animales",
        nombreFuncion: "retornar_todo",
        soloLectura: "1",
        inputs: [
            {name: "id_cliente", type:"u16", label: "ID del Adoptante"}
        ]
    }
];