require("dotenv").config();
const axios = require("axios");
const supabase = require("./config/supabase");


// CONVERTIR ESTADOS 2WORKERS → APB
function convertirEstado(taskStatus){

    switch(taskStatus){

        case 0:
            return "recepcion";

        case 5:
            return "espera";

        case 6:
            return "revision";

        case 7:
            return "prueba";

        case 1:
        case 2:
        case 3:
            return "terminado";

        default:
            return "recepcion";
    }

}



async function sincronizarEquipos(){


    try {


        // LOGIN 2WORKERS
        const login = await axios.post(
            "https://api.2workers.me/v2/login",
            {
                apiKey: process.env.TWOWORKERS_API_KEY,
                apiToken: process.env.TWOWORKERS_API_TOKEN
            }
        );


        const token = login.data.result.accessToken;


        console.log("✅ Login 2Workers correcto");



        // FILTRO DE TAREAS
        const paramFilter = {

            startDate: "2026-07-01T00:00:00",

            endDate: "2026-07-31T23:59:59"

        };



        // OBTENER TAREAS
        const respuesta = await axios.get(
            "https://api.2workers.me/v2/tasks/",
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                    "Content-Type":"application/json"
                },

                params:{
                    paramFilter: JSON.stringify(paramFilter),
                    page:1,
                    pageSize:100
                }
            }
        );



        const tareas = respuesta.data.result.entityList;


        console.log("Tareas encontradas:", tareas.length);



        for(const tarea of tareas){

console.log("================================");
console.log("TAREA COMPLETA");
console.log(JSON.stringify(tarea, null, 2));
console.log("================================");

const respuestas = tarea.questionnaires?.[0]?.answers || [];

const obtenerRespuesta = (pregunta) => {
  const r = respuestas.find(x =>
    x.questionDescription
      .toUpperCase()
      .includes(pregunta.toUpperCase())
  );

  return r?.reply || "";
};

           const registro = {

    tw_id: tarea.taskID,

    nombre: obtenerRespuesta("EQUIPO"),

    marca: obtenerRespuesta("MARCA"),

    modelo: obtenerRespuesta("MODELO"),

    numero_serie: obtenerRespuesta("NUMERO DE SERIE"),

    descripcion: obtenerRespuesta("DESCRIPCION DEL TRABAJO"),

    falla_reportada: obtenerRespuesta("FALLA ENCONTRADA"),

    cliente: tarea.customerDescription,

    hospital: tarea.customerDescription,

    colaborador_asignado: tarea.userToName,

    estado: convertirEstado(tarea.taskStatus),

    fecha_ingreso: tarea.creationDate.split("T")[0],

    identificador: tarea.externalId || ""
};


console.log("=== TAREA COMPLETA ===");
console.log(JSON.stringify(tarea, null, 2));

console.log("=== REGISTRO ===");
console.log(JSON.stringify(registro, null, 2));

const { error } = await supabase
    .from("equipos")
    .upsert(registro, {
        onConflict: "tw_id"
    });


            if(error){

                console.log(
                    "❌ Error:",
                    error.message
                );

            }else{

                console.log(
                    "✅ Sincronizado:",
                    tarea.taskID,
                    tarea.customerDescription
                );

            }


        }



        console.log("🎉 Sincronización terminada");



    }catch(error){


        console.log("❌ ERROR GENERAL");


        if(error.response){

            console.log(
                error.response.status,
                error.response.data
            );

        }else{

            console.log(error.message);

        }

    }

}



sincronizarEquipos();