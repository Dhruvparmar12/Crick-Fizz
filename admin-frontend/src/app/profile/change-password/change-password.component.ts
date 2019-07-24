import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changeForm= new FormGroup({
    a_password:new FormControl(null,Validators.required),
    a_password2:new FormControl(null,Validators.required)

  })

  constructor() { }

  ngOnInit() {
  }

}
