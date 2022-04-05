import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  apiUrl:string=environment.apiUrl;

  constructor(private http:HttpClient) {
   }

  getOrganization(){
      return this.http.get(this.apiUrl+'organization?limit=5')
  }

  createOrganization(organization:object):Observable<any>{
      let token:any=localStorage.getItem('token');
      return this.http.post<any>(this.apiUrl+'organization',organization,{headers:{['x-auth-token']:token},observe:'response'})
  }

  joinOrganization(organizationID:string,user:any):Observable<any>{
    let token:any=localStorage.getItem('token');
    return this.http.patch<any>(this.apiUrl+'organization/join/'+organizationID,{user},{headers:{['x-auth-token']:token},observe:'response'})
  }

}
