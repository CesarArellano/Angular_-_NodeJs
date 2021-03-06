"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
// Se declaran los EndPoints.
class GamesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.json({'text': 'Listing games'});
            const games = yield database_1.default.query('SELECT * FROM games');
            res.json(games);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.json({'text': 'This is game ' + req.params.id});
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM games WHERE idGame = ?', id);
            if (game.length > 0) {
                console.log("Game found");
                return res.json(game);
            }
            res.status(404).json({ 'message': "The game doesn't exists" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body); // Muestra en consola los parámetros enviados por método POST.
            yield database_1.default.query("INSERT INTO games set ?", [req.body]);
            res.json({ 'message': 'Game Saved' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE games set ? WHERE idGame= ?', [req.body, id]);
            res.json({ 'text': 'Updating a game ' + req.params.id });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM games WHERE idGame = ?", id);
            res.json({ 'text': 'Deleting a game ' + id });
        });
    }
}
const gamesController = new GamesController();
exports.default = gamesController;
