import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';
import { Router } from '@angular/router';
import { Game } from "../../game";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  
  game = new Game();
  user;
  token;

  error = {
    err : false,
    msg: "Opps something went wrong please try again :)"
  }

  

  years = [];

  constructor(private _service: GameService, private _router: Router) {}

  ngOnInit() {
    if(!this._service.token){
      this._router.navigateByUrl("/")
    }
    this.token = this._service.token
    this._service.getUser(this.token, res => {
      if(res.user){
        this.years = this.getYears();
        this._service.userID = res.user._id
        this.user = res.user;
      } else {
        this._router.navigateByUrl("/");
      };
    });
  }

  createGame(){
    this._service.writeGame(this.game, res =>{
      if(res.game){
        console.log(res.game);
        this._router.navigateByUrl("/gamer/dash");
      }
      this.error.err = true;
    })
  }

  logOut(){
    this._service.lougOutUser();
  };

  getYears(){
    let arr = [];
    for(let i = 2017; i > 1960; i--){
      arr.push(i);
    }
    return arr;
  };
}
