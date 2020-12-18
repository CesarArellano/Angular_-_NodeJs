"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); // Si hay un puerto asignado lo pondrá, si no utilizará el 3000.
        this.app.use(morgan_1.default('dev')); // Ver solicitudes HTTP en terminal.
        this.app.use(cors_1.default()); // Conexión entre servidores.
        this.app.use(express_1.default.json()); // Permite el formato JSON para envío y recepción de datos.
        this.app.use(express_1.default.urlencoded({ extended: false })); // Usado para enviar datos de formularios.
    }
    routes() {
        this.app.use(indexRoutes_1.default); // Usamos rutas de indexRoutes.ts
        this.app.use('/api/games', gamesRoutes_1.default); // Usamos rutas de gamesRoutes.ts
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port')); // Cuando el servidor esté activo correctamente, desplegará en terminal el mensaje.
        });
    }
}
const server = new Server(); // Instanciamos el objeto.
server.start(); // llamamos el método start.
