import { Injectable } from '@angular/core';
import { Router,CanActivate} from '@angular/router';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor( private auth:AuthenticationService, private route:Router) { }

    canActivate(){
      if(!this.auth.isLoggedIN()){
        this.route.navigateByUrl('/')
        return false
      }
      return true
    }
}
