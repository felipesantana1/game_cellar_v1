import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  userReg = new User();
  userLog = new User();
  confirm_password = "";
  err = {
    logError: false,
    regError: false,
    msg:"Oops, Something went wrong! Please try again :)",
  }
  
  constructor(private _service: GameService,private _router: Router) { }

  ngOnInit() {
    if(this._service.getToken()){
      this._router.navigateByUrl("/gamer/dash");
    }
  }

  regUser(){
    this._service.register(this.userReg, res => {
      if(res.token){
        console.log("Made it!")
        this._service.token = res.token;
        window.localStorage.setItem("token", res.token);
        this._router.navigateByUrl("/gamer/dash");
      } else {
        this.err.regError = true;
        this._router.navigateByUrl("/")
      }
    });
  };

  logUser(){
    this._service.logIn(this.userLog, res => {
      if(res.token){
        this._service.token = res.token;
        window.localStorage.setItem("token", res.token);
        this._router.navigateByUrl("/gamer/dash");
      } else {
        this.err.logError = true;
        this._router.navigateByUrl("/");
      }
    });
  };
}
