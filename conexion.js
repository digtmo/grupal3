//Paquetes
import pg from "pg";

//Variables
const {Pool} = pg;
const pool = new Pool({
    host:"localhost", 
    user:"postgres", 
    password:"123momiaes",
    database:"softlife",
    port: 5432,
    max: 20, // máximo de 20 clientes
    idleTimeoutMillis: 5000, // 5 segundos de inactividad
    connectionTimeoutMillis: 2000, // 2 segundos de espera, 
});

pool.connect();


export { pool };


