import { Router } from 'express';
import gamesController from '../controllers/games.controller';

class GamesRoutes {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/', gamesController.games);
    }
}

const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;