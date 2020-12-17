import mysql from 'promise-mysql';
import keys from './keys'; 

const pool = mysql.createPool(keys.database); // Seteamos parámetros.
pool.getConnection() //Promesa para obtener la conección.
    .then(connection  => {
    pool.releaseConnection(connection); 
    console.log('DB is connected'); 
});
export default pool;