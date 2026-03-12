import axios from "axios";

const API = axios.create({
    baseURL: "http://18.61.53.40:8080",
   // Your Spring Boot backend
  withCredentials: true
});

export default API;
