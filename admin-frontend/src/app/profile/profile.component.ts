import { Component, OnInit } from '@angular/core';
import { AdminDetails, AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details:AdminDetails
  id;
  updateForm:FormGroup;

 
  constructor(private auth:AuthenticationService,private route:Router) { }

  ngOnInit() {

    this.updateForm= new FormGroup({
      a_name:new FormControl(null,Validators.required),
      a_email: new FormControl(null,[Validators.required,Validators.email])
    });

    this.auth.profile().subscribe(
      user=>{
        this.details=user[0]
        this.id=user[0]['a_id']
       this.updateForm.setValue({
         a_name:this.details.a_name,
         a_email:this.details.a_email
       })
        
      },
      err=>{
        console.log(err)
      }
    )
   
  
  }

  onUpdate(){

          this.auth.updateProfile(this.updateForm.value,this.id).subscribe(res=>{
            if(res){
              alert('data Updated.!')
              this.route.navigate(['/profile'])
              console.log(res)
            }
              else{
                console.log('error')
              }
          })
  }

}
