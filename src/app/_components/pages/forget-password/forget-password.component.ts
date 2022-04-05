import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm:FormGroup;
  isEmailSubmit:boolean=false;
  message:string=""
  constructor(  private userService:UserService,private el: ElementRef,private router:Router) {
    this.forgetForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]),
      otp:new FormControl('')
    })
   }

  ngOnInit(): void {
  }

  get formControl(){
    return this.forgetForm.controls;
  }

  forgetPassword(){
      if(this.forgetForm.valid){
        this.isEmailSubmit=!this.isEmailSubmit;
        let user=this.userService.loginUser(this.forgetForm.value)
        user.subscribe(resp=>{
          this.isEmailSubmit=!this.isEmailSubmit;
        },(error)=>{
          this.message=error?.error.message;
        })
      }else{
        for (const key of Object.keys(this.forgetForm.controls)) {
          if (this.forgetForm.controls[key].invalid) {
            const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
            break;
         }
       }
      }
  }

  verifyPassword(){
    if(this.forgetForm.controls?.['otp'].value!==""){
      // console.log(this.forgetForm.value)
      let user=this.userService.loginUser(this.forgetForm.value)
      user.subscribe(resp=>{
         this.router.navigate(['/login'])
      },(error)=>{
        this.message=error?.error.message;
      })
    }else{
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + 'otp' + '"]');
          invalidControl.focus();
       }
  }
}
