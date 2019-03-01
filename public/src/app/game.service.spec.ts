import {
  HttpModule,
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NewComponent } from "./user/new/new.component"
import { DashComponent } from "./user/dash/dash.component";
import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { AppComponent } from './app.component';
import { GameService } from './game.service';
import { TestBed, fakeAsync, tick} from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { User } from './user';
import{ Game } from './game';


describe('GameService', () => {
  let service: GameService;
  let backend: MockBackend;
  let router: Router;
  let mockUser: User;
  let mockGame: Game;
  let errMsg;
  
  beforeEach(() => {
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
      providers: [GameService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, 
          useFactory: (backend,options) => new Http(backend,options),
          deps: [MockBackend, BaseRequestOptions]
        },
      ],
      declarations: [
        AppComponent,
        LandingComponent,
        DashComponent,
        ProfileComponent,
        NewComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    router = TestBed.get(Router);
    backend = TestBed.get(MockBackend);
    service = TestBed.get(GameService);
  });

  beforeEach(() => {
    mockUser = new User()
    mockUser.email = "someEmail@eamil.com"
    mockUser.username = "someUsername"
    mockUser.password = "somePassword"

    mockGame = new Game();
    mockGame.name = "someGame";
    mockGame.console = "someConsole";
    mockGame.condition = "someCondition";
    mockGame.price = 100;
    mockGame.year = "2001";

    errMsg = 'Oops something went wrong please try again';
    router.initialNavigation();
  });
  it('Should create the GameService', () => {
    expect(service).toBeTruthy();
  });

  it('Should register User when correct credentials are given', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: JSON.stringify(mockUser)
        })
      ));
    });
    let result: any;
    let error: any;
    service.register(mockUser, (res, err) => {
      result = res,
      error = err
    })
    expect(result.username).toBe(mockUser.username);
    expect(result.email).toMatch('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}');
    expect(result.email).toBe(mockUser.email);
    expect(result.password).toBe(mockUser.password);
    expect(result.password.length).toBeGreaterThan(8);
  });
  
  it('Should return an error when user credentials are incorrect', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: JSON.stringify(errMsg)
        })
      ));
    });
    let error;
    service.register(mockUser, (err) => {
      error = err;
    });
    
    expect(error).toBe(errMsg);
  })

  it('Should log in User when corect credentials are given', fakeAsync(() => {
    let fakeUser = {
      username: 'someOtherUsername',
      password: 'someOtherPassword'
    }
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: JSON.stringify(mockUser)
        })
      ));
    });
    let result;
    service.logIn(mockUser, res => {
      result = res
    }
    );
    tick();
    expect(result.username).toEqual(mockUser.username);
    expect(result.password).toEqual(mockUser.password);
    expect(result.username).not.toEqual(fakeUser.username);
    expect(result.password).not.toEqual(fakeUser.password);
  }));

  it('Should logout user by removing token and re-routing to "/"', () => {
    service.token = "sometokenwecanncompare"
    window.localStorage.setItem('token', service.token)
    let spy = spyOn(router, 'navigateByUrl')
    service.logOutUser();
    expect(spy).toHaveBeenCalledWith('/')
    expect(window.localStorage.getItem('token')).toBeFalsy();
  });
  it('Should create game when given correct credentials', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: [JSON.stringify(mockGame)]
        })
      ));
    });
    let result;
    service.writeGame(mockGame, res => {
      result = res;
    });

    expect(result).toBeTruthy();
    expect(result.length).toEqual(1);
  });

  it('Should return all Games', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: [
            mockGame,
            mockGame
          ]
        })
      ));
    });
    let result;
    service.writeGame(mockGame, res => {return res});
    service.getGames(res => {
      result = res;
    });
    expect(result).toBeTruthy();
    expect(result.length).toEqual(2);
    expect(result[0].name).toBe(mockGame.name);
  });

  it('Should return one single user', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: JSON.stringify(mockUser)
        })
      )); 
    });
    let result;
    service.getUser(mockUser, (res, err)=> {
      result = res;
    });

    expect(result).toBeTruthy();
    expect(result.username).toBe(mockUser.username);
  });

  it('Should return one single seller', () => {
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: JSON.stringify(mockUser)
        })
      ));
    });
    let result;
    service.getSeller(1, res => {
      result = res;
    });

    expect(result).toBeTruthy();
    expect(result.username).toBe(mockUser.username);
  });

  it('Should edit user', () => {
    let userEdit = {
      username: 'someOtherUsername',
      password: 'someOtherPassword'
    }
    backend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(
        new ResponseOptions({
          body: JSON.stringify(userEdit)
        })
      ));
    });

    let result;
    service.editUser(mockUser, res => {
      result = res;
    });

    expect(result).toBeTruthy();
    expect(result.username).not.toBe(mockUser.username);
  });
});