import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  user;
  token;
  games;
  error = {
    err: false,
    msg:"Sorry no Games Avaialble, Go ahead and add ine! :)"
  }

  constructor(private _service: GameService, private _router: Router) { }

  ngOnInit() {
    if(!this._service.token){
      this._router.navigateByUrl("/")
    }
    this.token = this._service.token
    this._service.getUser(this.token, res => {
      if(res.user){
        this._service.userID = res.user._id
        this.user = res.user.username;
        this._service.getGames(res =>{
          if(res.games){
            this.games = res.games;
          } else {
            this.error.err = true;
          }
        })
      } else {
        this._router.navigateByUrl("/");
      };
    });
  };

}
