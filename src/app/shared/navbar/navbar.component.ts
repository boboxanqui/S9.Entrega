import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor( private sharedService: SharedService ) { }

  active: number = 1;


  setShowLogin( value: boolean ){
    this.sharedService.setShowLogin( value );
  }

  setShowSignup( value: boolean ){
    this.sharedService.setShowSignup( value );
  }

}
