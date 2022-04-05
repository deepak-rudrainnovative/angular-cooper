import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  message:string="";
  constructor( private userService:UserService,private el: ElementRef,private router:Router) { 
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]),
      password:new FormControl('',[Validators.required,Validators.minLength(7),Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#._-])([a-zA-Z0-9@$!%*?&#._-]{7,})$/)])
    })
  }

  ngOnInit(): void {
    if(this.userService.getToken()){
      this.router.navigate([''])
    }
    // console.log()
  }
  
  get formControl(){
    return this.loginForm.controls;
  }

  handleLogin(){
    
    if(this.loginForm.valid){
      let user=this.userService.loginUser(this.loginForm.value)
      user.subscribe(resp=>{
        localStorage.setItem('token',resp.token)
        this.router.navigate([''])
        this.userService.getUser();
      },(error)=>{
        this.message=error?.error.message;
      })
    }else{
      for (const key of Object.keys(this.loginForm.controls)) {
        if (this.loginForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
     }
    }
  }
}
