require("dotenv").config();
const axios = require("axios");

async function listarWebhooks() {
  try {
    // Login
    const login = await axios.post(
      "https://api.2workers.me/v2/login",
      {
        apiKey: process.env.TWOWORKERS_API_KEY,
        apiToken: process.env.TWOWORKERS_API_TOKEN
      }
    );

    const token = login.data.result.accessToken;

    // Obtener webhooks
    const response = await axios.get(
      "https://api.2workers.me/v2/webHooks",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

listarWebhooks();