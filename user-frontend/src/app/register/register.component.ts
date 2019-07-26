import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from '../authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
signupForm= new FormGroup({
  u_name:new FormControl(null,Validators.required),
  u_email:new FormControl(null, [Validators.required, Validators.email]),
  u_password:new FormControl(null,[Validators.required]),
  c_password:new FormControl(null,Validators.required),
  u_profile:new FormControl(null,Validators.required),
  checkbox:new FormControl(null, Validators.required),
  u_mobile:new FormControl(null,Validators.required)

})
  
selectedFile:File

constructor(public auth: AuthenticationService,private route:Router) { }

ngOnInit(){

}
onFileSelect(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }
}

u_name = new RegExp('ab');

onRegister(){

    console.log(this.signupForm.value)
      if(this.signupForm.value.u_name==this.u_name){
        console.log(true);
         
      }
      else{
        console.log(false);
        
      }
      // this.auth.register(this.credentials).subscribe(
      //     ()=>{
      //           this.route.navigate(['/login'])
      //         },
      //           err=>{
      //            console.log(err)
      //         }
      //       )
        }

}
