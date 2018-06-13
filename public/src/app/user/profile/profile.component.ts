import { Component, OnInit } from '@angular/core';
import { GameService } from '../../game.service';
import { Router } from '@angular/router';
import { User } from '../../user';
import { FileUploaderModule } from 'ng4-file-upload';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  bio;
  phone;
  system;
  profile = new User();
  edit = false;
  pictureUpload: FileList;
  profilePicture;
  msg = "";
  token;
  id;

  selectedFile(event){
    this.pictureUpload = event.target.files[0];
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
        this.user = res.user
        console.log(res.user);
      } else {
        this._router.navigateByUrl("/");
      };
    });

    this.id = this._service.userID;

    $('.editForm').hide()
      $('#editButton').click(function(){
        $('.editForm').toggle();
      })
  };

  logOut(){
    this._service.lougOutUser();
  };

  uploadPicture(){
    console.log(this.pictureUpload)
    this._service.pictureUpload(this.pictureUpload, res => {
      if(res.success){
        this.msg = res.success;
      };
    });
  };

  editUser(){
    this._service.editUser(this.profile, res => {
      if(res.user){
        this._router.navigateByUrl("/gamer/profile");
      } else {
        console.log("Something went wrong :(");
      }
    })
  }
};
