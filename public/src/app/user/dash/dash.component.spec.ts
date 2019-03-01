import { DashComponent } from './dash.component';
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
import { componentFactoryName } from '@angular/compiler';

describe('DashComponent', () => {
  let component: DashComponent;
  let fixture: ComponentFixture<DashComponent>;
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
  }

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
    .compileComponents();``
    fixture = TestBed.createComponent(DashComponent);
    component = fixture.componentInstance;
    service = TestBed.get(GameService);
    router = TestBed.get(Router)
  }));

  afterEach(() => {
    service = null;
    component = null;
  })
  
  it('Should check for token and navigate to main page if not found', () => {
    el = fixture.debugElement.query(By.css('#header'));
    let spy = spyOn(router, 'navigateByUrl')
    component.ngOnInit()

    expect(service.token).toBeFalsy();
    expect(spy).toHaveBeenCalledWith('/')

    spyOn(service, 'token').and.returnValue('somerandomtoken');
    component.ngOnInit();
    expect(component.token).toBe(service.token);
  });

  it('Should display username when service returns user', () => {
    el = fixture.debugElement.query(By.css('#header'));
    component.ngOnInit();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('is Logged In!');

    spyOn(service, 'getUser').and.callFake(() => {
      component.token = service.getToken();
      component.user = 'somerandomuser';
    });
    
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.token).toBe(service.token);
    expect(el.nativeElement.textContent.trim()).toBe(component.user+" is Logged In!")
  });
  
  it('contact should be null', () => {
    expect(component.contact).toBeNull();
  })

  
});