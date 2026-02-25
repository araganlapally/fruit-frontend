import axios from "axios";

const API = axios.create({
    baseURL: "http://40.192.14.112:8080",
   // Your Spring Boot backend
  withCredentials: true
});

export default API;
