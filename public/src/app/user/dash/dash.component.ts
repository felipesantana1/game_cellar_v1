import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  user: object;
  token: string;
  games: Array<object>;
  seller: object;
  error = {
    err: false,
    msg:"Sorry no Games Avaialble, Go ahead and add ine! :)"
  }
  contact: boolean = false;

  wishList = new User();

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

  contactSeller(id){
    this._service.getSeller(id, res => {
      if(res.user){
        this.contact = true;
        this.seller = res.user;
      } else {
        console.log("Oops, something went wrong! :(");
      }
   });
  };

  addToWishList(data){
    this.wishList.wishlist.push(data);
    this._service.editUser(this.wishList, res => {
      if(res.user){
        document.write("Success!");
      } else {
        document.write("Failed!");
      }
    })
  }
}