# Global Assist Test

## Description
Este proyecto incluye un paginador y una api, son parte de una prueba de Global Assist

## Tecnologías
- Frontend: React
- Backend: Spring Boot y Java
- Base de datos: PostgreSQL
- Contenedores: Docker

### Configuración
El codigo backend de este proyecto utiliza el puerto 8080, ademas, React por defecto usa el puerto 80 a la hora de deployar, por ultimo el puesto 5432 es usado por PostgreSQl, se deben tener todos los puertos disponibles.

#### Variables de Entorno del Backend
En el docker compose se encuentran las variables de entorno de la BDD:
- SPRING_DATASOURCE_URL=jdbc:postgresql://global_assist_db:5432/postgres
- SPRING_DATASOURCE_USERNAME=postgres
- SPRING_DATASOURCE_PASSWORD=test1234


### Ejecutar con docker-compose

# Construir imagenes
docker-compose build

# Levantar imagenes
docker-compose up

###  Verificar la Instalación
Una vez que todos los contenedores estén ejecutándose, puedes acceder a:
- Frontend: http://localhost:80
- Backend: http://localhost:8080
- Base de datos: localhost:5432

## Saludos!! 😎🫡
