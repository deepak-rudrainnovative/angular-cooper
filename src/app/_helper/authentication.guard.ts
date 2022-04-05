import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){

  }
  canActivate():boolean{
    if (!this.userService.getToken()) {  
      this.router.navigateByUrl("/login");  
    }  
   return this.userService.getToken(); 
  }
  
}
