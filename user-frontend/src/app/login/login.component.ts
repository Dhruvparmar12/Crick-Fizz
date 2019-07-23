import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload} from '../authentication.service';


 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

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
  login(){
    this.auth.login(this.credentials).subscribe(
      ()=>{
        this.route.navigate(['/profile'])
      },
      err=>{
        console.log(err)
      }
    )
  }
}
