import axios from 'axios';

const api = axios.create({
    // aca va la url, depende de que como mandar este proyecto
    // esta direccion deberia estar en un .env aparte por temas de seguridad
  baseURL: 'http://localhost:8090/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default api;