import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes="'row"; //Saber la estructura de HTML
  
  game:Game = {
    idGame: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  constructor(private gameService:GamesService) { }

  ngOnInit(): void {
  
  }
  saveNewGame(){
    console.log(this.game);
  }
    

}
