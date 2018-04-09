import { Component } from '@angular/core';
import { GameService }from './game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user=false;
  token;

  constructor(private _service: GameService, private _router: Router) { }

  ngOnInit(){
    if(this._service.getToken()){
      this.user = true;
    }
  }
}

