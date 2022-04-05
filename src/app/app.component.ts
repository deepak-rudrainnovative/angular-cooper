import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import User from './_models/user';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user:any;
  constructor(public userService:UserService){
      
  }
  ngOnInit(){
    this.userService.getUser();
    this.userService.user.subscribe(resp=>{
      this.user=resp;
    })
  }
  

  
  title = 'cooper';
}
