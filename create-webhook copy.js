require("dotenv").config();
const axios = require("axios");

async function crearWebhook() {
  try {
    // 1. Iniciar sesión
    const login = await axios.post(
      "https://api.2workers.me/v2/login",
      {
        apiKey: process.env.TWOWORKERS_API_KEY,
        apiToken: process.env.TWOWORKERS_API_TOKEN
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const token = login.data.result.accessToken;

    console.log("Token obtenido.");

    // 2. Crear webhook
   const webhook = await axios.post(
  "https://api.2workers.me/v2/webHooks",
  {
    entity: "Task",
    action: "Inclusao",
    targetUrl: "https://apb-backend-p5gt.onrender.com/api/2workers/webhook",
    active: true
  },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Webhook creado:");
    console.log(webhook.data);

  } catch (error) {
    console.error("Error:");

    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

crearWebhook();