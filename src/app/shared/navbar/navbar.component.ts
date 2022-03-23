import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth.service';
import { LoginComponent } from '../login/login.component';
import { SharedService } from '../services/shared.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( 
    private sharedService: SharedService,
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  active: number = 1;

  get user(){
    return this.authService.user.name ? this.authService.user : undefined ;
  }

  openLoginModal(){
    this.modalService.open(LoginComponent,{
      centered: true,
      animation: true,
    })
  }

  openSignupModal(){
    this.modalService.open(SignupComponent,{
      centered: true,
      animation: true,
    })
  }


  logout(){
    console.log(this.user);
    this.authService.logout()
  }


}


