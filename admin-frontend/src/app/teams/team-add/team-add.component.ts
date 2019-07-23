import { Component, OnInit } from '@angular/core';
import { TeamService,TeamDetails} from '../team.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.css']
})
export class TeamAddComponent implements OnInit {
  credentials:TeamDetails={

    team_id:0,
    team_name:'',
    team_logo:'',
    team_desc:''
   
}


  constructor(private team:TeamService, private route:Router) { }

  
  ngOnInit() {
  }

  addData(){



    this.team.addTeam(this.credentials).subscribe(
      ()=>{
            this.route.navigate(['/team'])
          },
            err=>{
             console.log(err)
          }
        )
    }
  }

