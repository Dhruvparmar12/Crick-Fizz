import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'

export interface AdminDetails{
  a_id:number
  a_name:string
  a_email:string
  a_password:string
  exp: number
  iat:number 
}

interface TokenResponse{
  token:string
}

export interface TokenPayload{

        a_id:number
        a_name:string
        a_email:string
        a_password:string
     
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token:string
  loginame:string;
  name:string='dhruv'

  constructor(private http:HttpClient, private route:Router) { }

  public saveToken(token:string):void{
    localStorage.setItem('adminToken',token)
    this.token=token
  }

  public getToken():string{
    if(!this.token){
      this.token=localStorage.getItem('adminToken')
      }
      return this.token
  }

  public getAdminDetails():AdminDetails{
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
    const admin = this.getAdminDetails()
    if (admin) {
      return admin.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  //Login Events

  public login(admin:TokenPayload):Observable<any>{

    const base=this.http.post(`http://localhost:1313/admin/login`,admin)

    const request=base.pipe(map((data:TokenResponse)=>{

      if(data.token){
        this.saveToken(data.token)
      }
      return data
    })
    
    )
      return request
    }

    //Profile Events

    public profile(): Observable<any> {
     
      return this.http.get(`http://localhost:1313/admin/profile`, {
        headers: { Authorization: ` ${this.getToken()}` }
      })
    }

    public updateProfile(data,id): Observable<any> {
     
      return this.http.patch(`http://localhost:1313/admin/update/${id}`,data, {
        headers: { Authorization: ` ${this.getToken()}` }
      })
    }
    //Logout Events

    public logout(): void{
      this.token=''
      window.localStorage.removeItem('adminToken')
      this.route.navigate(['/'])
    }
}
