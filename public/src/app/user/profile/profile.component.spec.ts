import { DashComponent } from '../dash/dash.component';
import { NewComponent } from "../new/new.component";
import { LandingComponent } from "../../landing/landing.component";
import { ProfileComponent } from "../profile/profile.component";
import { GameService } from '../../game.service';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';


xdescribe('ProfileComponent', () => {
  let service: GameService;
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(()=> {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {path:"", pathMatch:"full", component:LandingComponent},
          {path:"gamer", children:[
            {path:"dash", pathMatch:"full", component:DashComponent},
            {path:"profile", pathMatch:"full", component:ProfileComponent},
            {path:"new", pathMatch:"full", component:NewComponent},
          ]}
        ]),
      ],
      providers: [GameService],
      declarations: [
        LandingComponent,
        DashComponent,
        ProfileComponent,
        NewComponent
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    service = TestBed.get(GameService)
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance
    fixture.detectChanges();
  });

  it('Should create the profile component', () => {
    expect(component).toBeTruthy();
  })
})
