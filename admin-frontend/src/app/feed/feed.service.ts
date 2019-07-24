import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private auth:AuthenticationService,private http:HttpClient) { }

  public getfeed(): Observable<any> {
   
    return this.http.get(`http://localhost:1313/feed/allfeed`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
    }

  public addFeed(data):Observable<any>{
        
      return this.http.post(`http://localhost:1313/feed/add`,data,{
        headers: { Authorization: ` ${this.auth.getToken()}` }
      })
    }
  public selectfeed(index:number): Observable<any> {
      
      return this.http.get(`http://localhost:1313/team/feed/${index}`, {
      headers: { Authorization: ` ${this.auth.getToken()}` }
    })
 }
  public updatefeed(data,index): Observable<any> {

    return this.http.patch(`http://localhost:1313/team/update/${index}`,data,{
    headers: { Authorization: ` ${this.auth.getToken()}` }
    })
    }


  public deleteFeed(index:number): Observable<any> {
    console.log(index)
    return this.http.delete(`http://localhost:1313/feed/delete/${index}`, {
    headers: { Authorization: ` ${this.auth.getToken()}` }
    })
  }

    }
