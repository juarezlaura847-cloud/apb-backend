require("dotenv").config();
const axios = require("axios");

async function login() {
  try {
    const response = await axios.post(
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

    console.log("Login exitoso:");
    console.log(response.data);

  } catch (error) {
    console.error("Error al iniciar sesión:");

    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

login();