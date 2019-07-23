import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs';

import { AuthenticationService} from '../authentication.service'

export interface TeamDetails{
  team_id:number
  team_name:string
  team_logo:string
  team_desc:string
  
}


@Injectable({
  providedIn: 'root'
})
export class TeamService {

 index:any
  constructor(private auth:AuthenticationService, private http:HttpClient) 
  { 
    
  }

  public getTeam(): Observable<any> {
   
    return this.http.get(`http://localhost:1313/team/allteam`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }


  public findTeam(index:number): Observable<any> {
        this.index = index
        return this.http.get(`http://localhost:1313/team/team/${index}`, {
        headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

  
  public addTeam(data):Observable<any>{
    
    return this.http.post(`http://localhost:1313/team/add`,data,{
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }


  public updateTeam(data:TeamDetails): Observable<any> {

    return this.http.patch(`http://localhost:1313/team/update/${this.index}`,data,{
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }


  public deleteTeam(index:number): Observable<any> {
    console.log(index)
    return this.http.delete(`http://localhost:1313/team/delete/${index}`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

    

  
}
