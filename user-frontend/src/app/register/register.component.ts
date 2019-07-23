import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload={

    u_id:0,
    u_name:'',
    u_email:'',
    u_password:'',
    u_profile:'',
    u_mobile:''
}

constructor(public auth: AuthenticationService,private route:Router) { }

ngOnInit(){

}
  register(){
      this.auth.register(this.credentials).subscribe(
          ()=>{
                this.route.navigate(['/login'])
              },
                err=>{
                 console.log(err)
              }
            )
        }

}
