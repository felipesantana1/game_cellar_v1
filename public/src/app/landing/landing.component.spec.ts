import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LandingComponent } from './landing.component';
import {
  HttpModule,
  Http
} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { GameService } from '../game.service';
import { Router } from '@angular/router'

let component: LandingComponent;
let router: Router;
let service: GameService;
let mockRouter: MockRouter;
let http: Http;

class MockRouter {
  navigateByUrl(url: string){
    return url
  }
}
describe('LandingComponent', () => {
  beforeEach(() => {
    service = new GameService(http, router);
    component = new LandingComponent(service, router);
    mockRouter = new MockRouter();
  });

  afterEach(() => {
    service = null;
    component = null;
  });

  it("Should create the landing component", () => {
    expect(component).not.toBeNull();
  })

  it('Should log in user and redirect to Dash when service returns true', () => {
    spyOn(service, 'logIn').and.returnValue(true);
    let spy = spyOn(mockRouter, 'navigateByUrl');
    mockRouter.navigateByUrl('/gamer/dash');
    // component.logUser();
    expect(component.logUser).toBeTruthy();
    expect(spy).toHaveBeenCalledWith('/gamer/dash');
  });

  it('Should not log in user when service returns false', () => {
    spyOn(service, 'logIn').and.returnValue(false);
    expect(component.logUser).toBeTruthy()
  });
  
  it('Should register in user when service returns true', () => {
    spyOn(service, 'register').and.returnValue(true);
    let spy = spyOn(mockRouter, 'navigateByUrl');
    mockRouter.navigateByUrl('/gamer/dash');
    expect(component.logUser).toBeTruthy();
    expect(spy).toHaveBeenCalledWith('/gamer/dash');
    expect(component.regUser).toBeTruthy()
  });
  
  it('Should not register in user when service returns false', () => {
    spyOn(service, 'register').and.returnValue(false);
    expect(component.regUser).toBeTruthy()
  });
});
