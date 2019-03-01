import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GameService } from './game.service';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let service: GameService;
  let router: Router
  beforeEach(async(() => { 
    component = new AppComponent(service, router);
  }));
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should render an app user and a router outlet element', async(() => {
    const appuser = document.getElementsByTagName('app-user')
    const roueroutet = document.getElementsByTagName('router-outlet')
    expect(appuser).toBeTruthy()
    expect(roueroutet).toBeTruthy()
  }))
});