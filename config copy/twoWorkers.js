const axios = require("axios");
require("dotenv").config();

const API_URL = "https://api.2workers.me/v2";

async function login() {
  const response = await axios.post(
    `${API_URL}/login`,
    {
      apiKey: process.env.TWOWORKERS_API_KEY,
      apiToken: process.env.TWOWORKERS_API_TOKEN,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.result.accessToken;
}

async function getEquipments() {
  const token = await login();

  const paramFilter = {
    active: true
  };

const response = await axios.post(
  `${API_URL}/login`,
  body,
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

  return response.data.result.entityList;
}

module.exports = {
  login,
  getEquipments
};