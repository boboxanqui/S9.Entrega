import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private modalService: NgbModal
  ) { }
  
  //Modal openers
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

  openLoginGuardModal(){

  }
}
