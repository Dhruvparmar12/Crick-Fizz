import { Component, OnInit } from '@angular/core';
import { TeamService, TeamDetails } from '../team.service'
import {Router, ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

    editdetails:TeamDetails

    team_name:'';
    team_logo:'';
    team_desc:'';

   credentials: TeamDetails={

    team_id:0,
    team_name:'',
    team_logo:'',
    team_desc:''
    
    
  }
  selectedFile:File;

  logo;

 updateForm= new FormGroup({
    team_name:new FormControl(null,Validators.required),
    team_image:new FormControl(null,Validators.required),
    
    team_desc:new FormControl(null,Validators.required)
})



  constructor(private team:TeamService,private route:Router,private router:ActivatedRoute) {}
   

  ngOnInit() {
  this.router.params.subscribe(id=>{


    this.team.findTeam(id['id']).subscribe(
      team=>{
        this.logo=team[0].team_logo;
        this.updateForm.setValue({
          team_name:team[0].team_name,
          team_desc:team[0].team_desc,          
          team_image:''
        })
      },
      err=>{
        console.log(err)
      }
    )
    });   
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      
      this.selectedFile = file;

    }
    
  }

  onUpdate(){
   
    const formData= new FormData();
    formData.append('team_name',this.updateForm.value.team_name)
    formData.append('team_image',this.selectedFile)
    formData.append('team_logo',this.logo)
    formData.append('team_desc',this.updateForm.value.team_desc)
    this.team.updateTeam(formData).subscribe(data=>{
        if(data){
          alert('data updated')
          this.route.navigate(['/team'])
        }
        else{
          alert('not Updated')
        }
    })

  }

}
