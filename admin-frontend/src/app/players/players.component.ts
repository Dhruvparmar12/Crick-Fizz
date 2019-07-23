import { Component, OnInit } from '@angular/core';
import { PlayersService } from './players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
   playerData=[];
 
  constructor(private player:PlayersService,private route:Router) { }

  ngOnInit() {

    this.player.getplayer().subscribe(data=>{
      
      if(data){
       this.playerData = data.players
       
       
        }else{
          console.log('no Player Available')
        }
       })
    }

    deleteplayer(id:number){
      console.log(id)
      this.player.deleteplayer(id).subscribe(data=>{
        console.log(data);
       })
    }

    editPlayer(id:number){
      this.route.navigate(['/editplayer',+id])
    }
}
