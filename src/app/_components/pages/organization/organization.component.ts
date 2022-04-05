import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { OrganizationService } from 'src/app/_services/organization.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  organizations:any;
  organizationCreate:boolean;
  message:string="";
  organizationForm:FormGroup;
  selectOrganizationForm:FormGroup;
  constructor(public auth:UserService,private route:ActivatedRoute,private router :Router,private el: ElementRef,private organizationService:OrganizationService) {
        this.organizationCreate=false;
        this.organizationForm= new FormGroup({
          organizationName: new FormControl('',Validators.required),
          organizationType: new FormControl('',Validators.required),
          organizationUrl:  new FormControl('',Validators.required)
        })
        this.selectOrganizationForm= new FormGroup({
          organizationId:new FormControl('',Validators.required)
        })
  }

  async ngOnInit(){
      
      if(await this.auth.haveOrganization()){
        this.router.navigate([''])
      } 
      console.log(await this.auth.haveOrganization())
      let token:any=localStorage.getItem('token');
      let jwtHelper=new JwtHelperService()
      // console.log(jwtHelper.decodeToken(token),jwtHelper.getTokenExpirationDate(token),jwtHelper.isTokenExpired(token))

      if(this.route.snapshot.data){
        this.organizations=this.route.snapshot.data?.['organization']; 
      }else{
        this.message="Organization Not Found"
      }
  }
  
  handleLogout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }

  get organizationControl(){
    return this.organizationForm.controls;
  }

  selectOrganization(){
    
    if(this.selectOrganizationForm.valid){
      let token:any=localStorage.getItem('token')
      let user:any=jwtDecode(token)
      this.organizationService.joinOrganization(this.selectOrganizationForm.value?.['organizationId'],user._id).subscribe(organization=>{
        let token:any=organization.headers.get('x-auth-token');
        this.auth.setToken(token);
        this.auth.getUser();
        this.router.navigate(['/organization'])
      },(error:Response)=>{
        console.log(error)
      });
  } else{
    for (const key of Object.keys(this.selectOrganizationForm.controls)) {
      if (this.selectOrganizationForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        invalidControl.style
        break;
     }
   }
  }
  }

  createOrganization(){
    if(this.organizationForm.valid){
        this.organizationService.createOrganization(this.organizationForm.value)
         .subscribe(organization=>{
          let token:any=organization.headers.get('x-auth-token');
          this.auth.setToken(token);
          this.router.navigate(['']);
         },(error:Response)=>{
           console.log(error)
         })
    } else{
      for (const key of Object.keys(this.organizationForm.controls)) {
        if (this.organizationForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
     }
    }
    
  }
}
