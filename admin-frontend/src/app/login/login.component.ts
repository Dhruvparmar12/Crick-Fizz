import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthenticationService, TokenPayload} from '../authentication.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//   credentials: TokenPayload={

//     a_id:0,
//     a_name:'',
//     a_email:'',
//     a_password:'',
    
// }
loginForm= new FormGroup({
      a_email:new FormControl(null,[Validators.required, Validators.email]),
      a_password:new FormControl(null,Validators.required)
    
    })
  constructor(public auth:AuthenticationService, private route:Router) { }

  ngOnInit() {
  }
  
  login(){
    
    this.auth.login(this.loginForm.value).subscribe(
      (res)=>{
       this.auth.loginame=res['result'][0]['a_name']
       console.log(this.auth.loginame)
        this.route.navigate(['/'])
      },
      err=>{
        console.log(err)
      }
    )
  }

  forgetpassword(){
    this.route.navigate(['/forget_password'])
  }

}
