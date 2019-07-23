import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'


export interface UserDetails{
  u_id:number
  u_name:string
  u_email:string
  u_password:string
  u_profile:string
  u_mobile:string
  exp: number
  iat:number 
}

interface TokenResponse{
  token:string
}

export interface TokenPayload{

        u_id:number
        u_name:string
        u_email:string
        u_password:string
        u_profile:string
        u_mobile:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token:string

  constructor(private http: HttpClient, private route:Router) { }

  private saveToken(token:string):void{
    localStorage.setItem('userToken',token)
    this.token=token
  }

  private getToken():string{
    if(!this.token){
      this.token=localStorage.getItem('userToken')
      }
      return this.token
  }

  public getUserDetails():UserDetails{
    const token=this.getToken();

    let payload;

    if(token){
      payload=token.split('.')[1]
      payload=window.atob(payload)
      return JSON.parse(payload)
    }else{
      return null
    }
  }

  public isLoggedIN(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

    public register(user:TokenPayload):Observable<any>{
     

        const base=this.http.post(`http://localhost:1313/user/add`,user)

        const request=base.pipe(map((data:TokenResponse)=>{

          if(data.token){
            this.saveToken(data.token)
          }
          return data
        })
        
        )
          return request
    }

    public login(user:TokenPayload):Observable<any>{

      const base=this.http.post(`http://localhost:1313/user/login`,user)

      const request=base.pipe(map((data:TokenResponse)=>{

        if(data.token){
          this.saveToken(data.token)
        }
        return data
      })
      
      )
        return request
  }

  public profile(): Observable<any> {
    console.log(this.getToken())
    return this.http.get(`http://localhost:1313/user/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  
 

    public logout(): void{
      this.token=''
      window.localStorage.removeItem('userToken')
      this.route.navigate(['/'])
    }
}
