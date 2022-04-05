import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  message:string="";
  constructor(private userService:UserService,private el: ElementRef,private router:Router) {

    this.registerForm=new FormGroup({
      fullName:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]),
      password:new FormControl('',[Validators.required,Validators.minLength(7),Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#._-])([a-zA-Z0-9@$!%*?&#._-]{7,})$/)])
    })
   }

  ngOnInit(): void {
    
  }
   
  get formControl(){
    return this.registerForm.controls;
  }

  handleRegister(){
    
    if(this.registerForm.valid){
      let user=this.userService.registerUser(this.registerForm.value)
      user.subscribe(resp=>{
        // console.log(resp)
        this.router.navigate(['/login'])//{queryParams:{page:1,order:'new'}}
      },(error)=>{
        this.message=error?.error.message;
      })
    }else{
      for (const key of Object.keys(this.registerForm.controls)) {
        if (this.registerForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
     }
    }
  }
}
