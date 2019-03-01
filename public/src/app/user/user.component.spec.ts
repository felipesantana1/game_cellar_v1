import { UserComponent } from './user.component';
import { LandingComponent } from '../landing/landing.component'
import { DashComponent } from './dash/dash.component';
import { ProfileComponent } from './profile/profile.component';
import { NewComponent } from './new/new.component';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

let component: UserComponent;
let fixture: ComponentFixture<UserComponent>;
let service: GameService;
let router: Router;

class MockGameService extends GameService {
  logOutUser(){
    return false;
  }
}

describe('UserComponent', () => {
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
        UserComponent,
        LandingComponent,
        DashComponent,
        ProfileComponent,
        NewComponent
      ],
      providers: [{provide: GameService, useClass: MockGameService}]
    });
  }))
  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    service = null;
    component = null;
  });

  it('Should create the UserComponent', () => {
    expect(component).toBeTruthy();
  });

  it('user should be false', () => {
    expect(component.user).toBeFalsy();
  });

  it('Should logout User', () => {
    component.user = true;
    expect(component.user).toBeTruthy();

    component.logOut();
    fixture.detectChanges();
    expect(component.user).toBeFalsy();
  })

});
