import axios from "axios";

const API = axios.create({
    baseURL: "http://16.112.12.66:8080",
   // Your Spring Boot backend
  withCredentials: true
});

export default API;
