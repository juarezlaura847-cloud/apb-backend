const axios = require("axios");

async function probarWebhook() {
  try {
    const respuesta = await axios.post(
      "https://apb-backend-p5gt.onrender.com/api/2workers/webhook",
      {
        prueba: "Hola desde Axios"
      }
    );

    console.log("Respuesta:");
    console.log(respuesta.data);

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

probarWebhook();