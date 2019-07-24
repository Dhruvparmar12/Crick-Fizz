import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PasswordService } from './password.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  pattern = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/);

  forgetDataForm= new FormGroup({
    a_email:new FormControl(null,[Validators.required,Validators.email])
  })

  constructor(private password:PasswordService) {}

  ngOnInit() {
  }
 
 
  sendMail(){
    localStorage.setItem('a_email',this.forgetDataForm.value.a_email)
    
    this.password.sendEmail(this.forgetDataForm.value).subscribe(res=>{
      console.log(res)
      alert('Mail Sent.. Please Check..')
    })
    
  }
}
