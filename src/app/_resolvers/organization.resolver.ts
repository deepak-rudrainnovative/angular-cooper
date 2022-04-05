import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrganizationService } from '../_services/organization.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationResolver implements Resolve<any> {

  constructor(public organizationService:OrganizationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    return this.organizationService.getOrganization();
  }
}
