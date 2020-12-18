import { Request, Response } from 'express';
import pool from '../database';

// Se declaran los EndPoints.

class GamesController {
    public async list(req: Request, res:Response){
        //res.json({'text': 'Listing games'});
        const games = await pool.query('SELECT * FROM games');
        res.json(games);
    }
    public async getOne(req: Request, res:Response): Promise<any>{
        // res.json({'text': 'This is game ' + req.params.id});
        const { id }  = req.params;
        const game = await pool.query('SELECT * FROM games WHERE idGame = ?', id);
        if(game.length > 0){
            console.log("Game found");
            return res.json(game);
        }
        res.status(404).json({'message':"The game doesn't exists"});
    }
    public async create(req: Request, res:Response): Promise<void>{
        console.log(req.body); // Muestra en consola los parámetros enviados por método POST.
        await pool.query("INSERT INTO games set ?",[req.body]);
        res.json({'message':'Game Saved'});
        
    }
    public async update(req: Request, res:Response){
        const { id } = req.params;
        await pool.query('UPDATE games set ? WHERE idGame= ?', [req.body, id]);
        res.json({'text': 'Updating a game ' + req.params.id });
    }
    public async delete(req:Request, res:Response){
        const { id } =  req.params;
        await pool.query("DELETE FROM games WHERE idGame = ?", id);
        res.json({'text': 'Deleting a game ' + id });
    }
}

const gamesController = new GamesController();
export default gamesController;