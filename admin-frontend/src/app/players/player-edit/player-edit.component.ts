import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from '../players.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from 'src/app/teams/team.service';



@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  TeamData=[] 
  index;
  
  playerType=["BOWLER","BATSMAN","CAPTAIN","WICKET-KEEPER","ALL-ROUNDER"]

 
  constructor(private route:ActivatedRoute,private player:PlayersService,private team:TeamService,private router:Router) { }

  updateForm= new FormGroup({
    team_name:new FormControl(null,Validators.required),
    p_name: new FormControl(null,Validators.required),
    p_runs:new FormControl(null,Validators.required),
    p_type: new FormControl(null,Validators.required)

   })

  ngOnInit() {
       
    this.team.getTeam().subscribe(teams=>{
        
      for(let i=0;i<=teams.length-1;i++){
        this.TeamData.push(teams[i])
           
        }
    })
    
    
    this.route.params.subscribe(id=>{
      this.index=id['id'];
      let team_name
     
      this.player.findplayer(this.index).subscribe(result=>{
        if(result){          
            this.team.getTeam().subscribe(data=>{
              
            for(let i=0;i<=data.length;i++){
               if(result[0]['team_id']==data[i]['team_id']){
                  team_name=data[i]['team_name'];
                  break;                     
                }   
            }

              this.updateForm.setValue({
                team_name:team_name,
                p_name:result[0].p_name,
                p_runs:result[0].p_runs,
                p_type:result[0].p_type
    
              })    
            })
                    
        }
        else{
          alert('Please Select Data')
        }
      })
    })
  }



  onUpdate(){
    
    console.log(this.updateForm.value)

      this.player.updateplayer(this.index,this.updateForm).subscribe(res=>{
        if(res){
          alert('data updated')
          this.router.navigate(['/player'])
          
        }
        else{
          alert('data not updated')
        }
      })

  }
}
