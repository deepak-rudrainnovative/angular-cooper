import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any;
  constructor(private auth:UserService, private route: ActivatedRoute,private router:Router) { }

  async ngOnInit() {
    if(!await this.auth.haveOrganization()){
      this.router.navigate(['/organization'])
    }
    // console.log("rtgjerjgfk")
    // console.log(this.route.snapshot.data)
  }



}
