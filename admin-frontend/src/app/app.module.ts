import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';

import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './authentication.service';
import { AuthguardService } from './authguard.service';
import { TeamsComponent } from './teams/teams.component';
import { TeamEditComponent } from './teams/team-edit/team-edit.component';
import { TeamAddComponent } from './teams/team-add/team-add.component';

import { PlayersComponent } from './players/players.component';
import { PlayerAddComponent } from './players/player-add/player-add.component';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthguardService]
    
  },
  {
    path: 'team',
    component: TeamsComponent,
    canActivate: [AuthguardService]
    
  },
  
  {
    path: 'editteam/:id',
    component: TeamEditComponent,
    canActivate: [AuthguardService]
    
  },
  {
    path: 'addteam',
    component: TeamAddComponent,
    canActivate: [AuthguardService]
    
  },
  {
    path: 'player',
    component: PlayersComponent,
    canActivate: [AuthguardService]
    
  },
  
  {
    path: 'editplayer/:id',
    component: PlayerEditComponent,
    canActivate: [AuthguardService]
    
  },
  {
    path: 'addplayer',
    component: PlayerAddComponent,
    canActivate: [AuthguardService]
    
  },
 
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfileComponent,
    TeamsComponent,
    TeamEditComponent,
    TeamAddComponent,
   
    PlayersComponent,
    PlayerAddComponent,
    PlayerEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthenticationService,AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
