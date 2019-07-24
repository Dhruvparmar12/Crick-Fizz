import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordService } from './password.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

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
