import { Component, OnInit } from '@angular/core';
import { TeamService} from '../team.service'
import {Router} from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
export class TeamAddComponent implements OnInit {
 
selectedFile:File;

 addForm= new FormGroup({
    team_name:new FormControl(null,Validators.required),
    team_image:new FormControl(null,Validators.required),
    team_desc:new FormControl(null,Validators.required)
})

  

  constructor(private team:TeamService, private route:Router) { }

  
  ngOnInit() {
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }
  
  addData(){

   
    
    const formData= new FormData();
    formData.append('team_name',this.addForm.value.team_name)
    formData.append('team_image',this.selectedFile)
    formData.append('team_desc',this.addForm.value.team_desc)
    console.log(formData)

    this.team.addTeam(formData).subscribe(
      ()=>{
            this.route.navigate(['/team'])
          },
            err=>{
             console.log(err)
          }
        )
    }
  }

