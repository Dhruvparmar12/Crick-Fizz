import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../password.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  
   pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/);
    
  forgetDataForm= new FormGroup({
    a_password:new FormControl(null,Validators.required),
    a_password2:new FormControl(null,Validators.required),
    a_email:new FormControl(null)
  })
  constructor(private password:PasswordService, private route: Router) { }



  ngOnInit() {
    this.forgetDataForm.setValue({
      a_password:'',
      a_password2:'',
      a_email:localStorage.getItem('a_email')
    })   
  }

  updatePassword(){
    this.password.updatePassword(this.forgetDataForm.value).subscribe(res=>{
       if(res){
            console.log(res['msg'])   
             localStorage.removeItem('a_email')
            } 
    })
    }
}
