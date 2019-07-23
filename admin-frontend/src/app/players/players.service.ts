import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

export interface players{

  p_id:number
  team_id:number
  p_name:string
  p_runs:number
  p_type:string
}



@Injectable({
  providedIn: 'root'
})


export class PlayersService {

  updated_id;
 constructor(private auth:AuthenticationService, private http:HttpClient) { }


  public getplayer(): Observable<any> {
   
        return this.http.get(`http://localhost:1313/player/allplayer`, {
          headers: { Authorization: ` ${this.auth.getToken()}` }
        })
  }

  public deleteplayer(id:number):Observable<any>{

    return this.http.delete(`http://localhost:1313/player/delete/${id}`,{
      headers:{Authorization:`${this.auth.getToken()}`}
    })
  }
  

  public findplayer(index): Observable<any> {
    
    return this.http.get(`http://localhost:1313/player/player/${index}`, {
    headers: { Authorization: ` ${this.auth.getToken()}` }
})
}
  public updateplayer(id,data):Observable<any>{

      return this.http.patch(`http://localhost:1313/player/update/${id}`,{
        headers:{Authorization:`${this.auth.getToken()}`}
      })
  }

 

}
