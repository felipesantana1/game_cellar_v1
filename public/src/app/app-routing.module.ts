import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponent } from "./user/new/new.component"
import { DashComponent } from "./user/dash/dash.component";
import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { UserComponent } from "./user/user.component";
import { AppComponent } from "./app.component";
import { GameService } from "./game.service";
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';

const routes: Routes = [
  {path:"", pathMatch:"full", component:LandingComponent},
  {path:"gamer", children:[
    {path:"dash", pathMatch:"full", component:DashComponent},
    {path:"profile", pathMatch:"full", component:ProfileComponent},
    {path:"new", pathMatch:"full", component:NewComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
