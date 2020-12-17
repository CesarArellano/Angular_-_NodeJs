import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';

class Server {
    public app: Application;
    constructor(){ //Inicializamos el servidor de express, junto la configuración de middlewares y rutas.
        this.app = express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port',process.env.PORT || 3000); // Si hay un puerto asignado lo pondrá, si no utilizará el 3000.
        this.app.use(morgan('dev')); // Ver solicitudes HTTP en terminal.
        this.app.use(cors()); // Conexión entre servidores.
        this.app.use(express.json()); // Permite el formato JSON para envío y recepción de datos.
        this.app.use(express.urlencoded({extended:false})); // Usado para enviar datos de formularios.
    }
    routes():void{
        this.app.use(indexRoutes); // Usamos rutas de indexRoutes.ts
        this.app.use('/api/games',gamesRoutes); // Usamos rutas de gamesRoutes.ts
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port',this.app.get('port')); // Cuando el servidor esté activo correctamente, desplegará en terminal el mensaje.
        });
    }
}

const server = new Server(); // Instanciamos el objeto.
server.start(); // llamamos el método start.
