import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-login-guard',
  templateUrl: './login-guard.component.html',
  styleUrls: ['./login-guard.component.css']
})
export class LoginGuardComponent  {

  constructor( 
    public modalService: NgbModal,
    private sharedService: SharedService
  ) { }

  openLogin(){
    this.modalService.dismissAll()
    this.sharedService.openLoginModal()
  }

}
