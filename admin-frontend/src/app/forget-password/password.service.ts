import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  
  constructor(private http:HttpClient) { }


  public sendEmail(data):Observable<any>{
    
    return this.http.post(`http://localhost:1313/admin/forgetpassword`,data
    )
  }

  public updatePassword(data):Observable<any>{
    console.log(data)
    return this.http.patch(`http://localhost:1313/admin/resetpassword`,data)
  }

}
