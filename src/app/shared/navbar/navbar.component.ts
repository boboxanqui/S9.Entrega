import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( 
    private sharedService: SharedService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  active: number = 1;

  get user(){
    return this.authService.user.name ? this.authService.user : undefined ;
  }

  setShowLogin( value: boolean ){
    this.sharedService.setShowLogin( value );
  }

  setShowSignup( value: boolean ){
    this.sharedService.setShowSignup( value );
  }

  logout(){
    console.log(this.user);
    this.authService.logout()
  }


}


