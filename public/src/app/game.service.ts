import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class GameService {

  userID = null;
  token = this.getToken();

  constructor(private _http: Http, private _router: Router) { }

  register(data, cb){
    this._http.post("/user", data).subscribe(
      res => {
        cb(res.json());
      },
      err => {
        console.log(err.json());
        cb(err.json());
      }
    );
  };

  logIn(data, cb){
    this._http.post("/session", data).subscribe(
      res => {
        cb(res.json());
      },
      err => {
        console.log(err.json());
        cb(err.json());
      }
    );
  };

  getUser(token, cb){
    this._http.get("/user/"+token).subscribe(
      res => {
        cb(res.json());
      },
      err => {
        console.log(err.json());
        cb(err.json());
      }
    );
  };

  getSeller(id, cb){
    this._http.get("/seller/"+id).subscribe(
      res => {
        cb(res.json());
      },
      err =>{
        console.log(err.json());
        cb(err.json());
      }
    );
  }

  logOutUser(){
    this.token = null;
    window.localStorage.removeItem("token");
    this._router.navigateByUrl("/");
  };

  pictureUpload(picture, cb){
    this._http.put("/user/"+this.userID, picture).subscribe(
      res => {
        cb(res.json());
      },
      err => {
        console.log(err.json());
        cb(err.json());
      }
    );
  };

  writeGame(data, cb){
    this._http.post("/games/"+this.token, data).subscribe(
      res => {
        cb(res.json());
      },
      err => {
        console.log(err.json());
        cb(err.json());
      }
    );
  };

  getGames(cb){
    this._http.get("/games").subscribe(
      res => {
        cb(res.json());
      },
      err => {
        console.log(err.json());
        cb(err.json())
      }
    )
  }

  getToken(){
    return window.localStorage.getItem("token");
  }

  editUser(data, cb){
    this._http.put("/user/"+this.token, data).subscribe(
      res => {
        cb(res.json());
      },
      err => {
        console.log(err.json());
        cb(err.json());
      }
    );
  };

};