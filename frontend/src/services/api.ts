import axios from "axios";

const API = axios.create({
  baseURL:
    "https://truthlens-backend-kk4z.onrender.com",
});

export default API;