import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import User from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  imageUrl:string=environment.imageUrl;
  constructor(private router :Router,public auth:UserService,private route: ActivatedRoute) { }
  user:any;
  haveOrganization:boolean=false;

  async ngOnInit() {
    // console.log("navbar")
    if(await this.auth.haveOrganization()){
      if(this.auth.getToken()){
        this.getUser()
      }
      this.haveOrganization=true
    }
  }

  getUser(){
    this.auth.getUser();
    this.auth.user.subscribe(resp=>{
      this.user=resp;
    },(error:Response)=>{
      if(error.status==401){
        this.router.navigate(['/organization'])
      }
    })
  }


  handleLogout(){
    this.auth.logout();
    this.router.navigate(['/login'])
    this.user={}
  }

}
