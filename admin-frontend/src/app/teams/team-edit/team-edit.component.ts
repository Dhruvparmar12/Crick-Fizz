import { Component, OnInit } from '@angular/core';
import { TeamService, TeamDetails } from '../team.service'
import {Router, ActivatedRoute } from '@angular/router'

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


  constructor(private team:TeamService,private route:Router,private router:ActivatedRoute) {}
   

  ngOnInit() {
  this.router.params.subscribe(id=>{


    this.team.findTeam(id['id']).subscribe(
      team=>{
        console.log(id['id'])
        this.editdetails=team[0]
        console.log(this.editdetails)
      },
      err=>{
        console.log(err)
      }
    )
    });
    
    
  }

  onUpdate(){
    
    this.credentials.team_name=this.team_name;
    this.credentials.team_logo=this.team_logo;
    this.credentials.team_desc=this.team_desc

    this.team.updateTeam(this.credentials).subscribe(data=>{
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
