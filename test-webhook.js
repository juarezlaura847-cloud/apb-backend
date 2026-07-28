const axios = require("axios");

async function probarWebhook() {
  try {

    const respuesta = await axios.post(
      "https://apb-backend-p5gt.onrender.com/api/2workers/webhook",
      {
        entities:[
          {
            taskID:"TEST001",
            customerDescription:"Hospital General",
            userToName:"Carlos",
            creationDate:"2026-07-27",
            orientation:"Equipo no enciende",
            pendency:"Falla de alimentación",
            externalId:"EQ-001"
          }
        ]
      }
    );

    console.log("Respuesta:");
    console.log(respuesta.data);

  } catch(error){

    console.log(error.response?.data || error.message);

  }
}

probarWebhook();