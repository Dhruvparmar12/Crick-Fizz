import { Component, OnInit } from '@angular/core';
import { TeamService,TeamDetails } from './team.service'
import { Router, ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams:TeamDetails
  constructor(private team:TeamService,private route:Router,private router:ActivatedRoute) { 

   
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.team.getTeam().subscribe(team=>{
      if(team){
       
        this.teams=team
      }else{
        console.log('No Team Available')
      }
      
    })
  }

  onEdit(index:number){
     this.route.navigate(['/editteam',+index])
  }


  deleteTeam(index:number){
   
    this.team.deleteTeam(index).subscribe(team=>{
      console.log(team)
      this.getData();
    },err=>{
      console.log(err)
    })
   
  }

}
