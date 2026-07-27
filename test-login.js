const axios = require("axios");
require("dotenv").config();

const API_URL = "https://api.2workers.me/v2";

async function login() {

    // LOGIN
    const login = await axios.post(
        `${API_URL}/login`,
        {
            apiKey: process.env.TWOWORKERS_API_KEY,
            apiToken: process.env.TWOWORKERS_API_TOKEN
        }
    );

    console.log("✅ Login correcto");

    const token = login.data.result.accessToken;

    // OBTENER USUARIOS
    const usuarios = await axios.get(
        `${API_URL}/users/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    console.log(JSON.stringify(usuarios.data, null, 2));

}

login().catch(console.error);