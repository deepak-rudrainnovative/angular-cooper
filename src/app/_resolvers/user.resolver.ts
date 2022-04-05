import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {

  constructor(public auth:UserService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.auth.user;
  }
}
