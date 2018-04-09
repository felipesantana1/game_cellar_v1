import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = false;

  constructor(private _service: GameService, private _router: Router){
    this._router.events.subscribe(event => {
      if(this._service.getToken()){
        this.user = true;
      };
    });
  }

  ngOnInit() {
  }

  logOut(){
    this._service.lougOutUser();
    this.user = false;
  };

}
