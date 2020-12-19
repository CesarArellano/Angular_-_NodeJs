import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute, Router } from '@angular/router'; 
@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  //@HostBinding('class') classes="'row"; // Agrega de forma global en la estructura HTML la clase row
  
  game:Game = {
    idGame: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };
  edit: boolean = false;

  constructor(private gameService:GamesService, private router:Router, private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.gameService.getGame(params.id)
      .subscribe(
        res => {
          this.game = res[0];
          this.edit = true;
          console.log(this.game);
          
        },
        err => console.log(err)
      );
    }
    
  }
  saveNewGame(){
    // Borra las propiedades porque no las necesita.
    delete this.game.created_at;
    delete this.game.idGame; 
    
    this.gameService.saveGame(this.game) //Hacer uso del servicio para guardar el juego.
    .subscribe(
      res => {
        console.log(res); 
        this.router.navigate(['/games']);
      },
      err => console.log(err)
      
    );
  }
  updateGame(){
    delete this.game.created_at;
    this.gameService.updateGame(this.game.idGame,this.game).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
        
      },
      err => console.log(err)
    )
  }
    

}
