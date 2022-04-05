import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string=environment.apiUrl;
  token:any="";
  status:boolean=false;
  user=new BehaviorSubject({})

  constructor(private http:HttpClient,private router:Router) { 
    this.token=localStorage.getItem('token');
  }
  
  registerUser(user:object):Observable<User>{
    return this.http.post<User>(this.apiUrl+'user/signup',user)
  }

  loginUser(user:object):Observable<any>{
    return this.http.post<any>(this.apiUrl+'auth/login',user)
  }

  logout(){
    localStorage.removeItem('token');
  }

  forgetPassword(email:string){
    return this.http.post(this.apiUrl+'/auth/forget-password',email)
  }

  verifyForgetPassword(info:object){
    return this.http.post(this.apiUrl+'/auth/forget-password-verify',info)
  }

  getToken(){
    return !!localStorage.getItem("token");  
  }
  
  setToken(token:string){
    localStorage.setItem('token',token);
  }
  getUser(){
    let token:any=localStorage.getItem('token');
    let user:any=jwtDecode(token)
    this.http.get(this.apiUrl+'user/'+user._id,{headers:{'x-auth-token':token}}).subscribe(resp=>{
      this.user.next(resp)
    })
  }

  haveOrganization(){
    let token:any=localStorage.getItem('token');
    let userDecoded:any=jwtDecode(token);
    return this.http.get(this.apiUrl+'user/'+userDecoded._id,{headers:{'x-auth-token':token}}).toPromise().then((resp)=>{
      return true;
    }).catch((err)=>{
      return false;
    })
  }
}     
