import { DashComponent } from '../dash/dash.component';
import { NewComponent } from "../new/new.component";
import { LandingComponent } from "../../landing/landing.component";
import { ProfileComponent } from "../profile/profile.component";
import { GameService } from '../../game.service';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

let component: NewComponent;
let fixture: ComponentFixture<NewComponent>;
let service: GameService;
let el: DebugElement;
let router: Router; 

class MockGameService extends GameService {
    getUser(){
      let mockUser = {
        username: 'someusername',
        userId: 'someuserid'
      }
      return mockUser;
    }

    getSeller(id){
      this.userID = id;
      return true;
    }

    writeGame(){
      return true;
    }

    logOutUser(){
      return true;
    }
  }

describe('NewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {path:"", pathMatch:"full", component:LandingComponent},
          {path:"gamer", children:[
            {path:"dash", pathMatch:"full", component:DashComponent},
            {path:"profile", pathMatch:"full", component:ProfileComponent},
            {path:"new", pathMatch:"full", component:NewComponent},
          ]}
        ])
      ],
      declarations: [
        LandingComponent,
        DashComponent,
        ProfileComponent,
        NewComponent
      ], 
      providers: [ {provide: GameService, useClass: MockGameService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(GameService);
    fixture = TestBed.createComponent(NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create the New Component', () => {
    expect(component).toBeTruthy();
  })
  it('years array should be empty', () => {
    expect(component.years.length).toBe(0);
  });

  it('Should log out user', () => {
    expect(component.createGame).toBeTruthy()
    spyOn(component, 'logOut').and.callFake(() => {
      return true;
    });
    expect(component.logOut()).toBeTruthy();
  });

  it('Should create a game', () => {
    spyOn(component, 'createGame').and.callFake(() => {
      return true;
    });
    expect(component.createGame()).toBeTruthy();
  });

  it('Should return array of years', () => {
    let result = component.getYears();
    expect(result).toBeTruthy();
    expect(result.length).toBe(57);
  });
});
