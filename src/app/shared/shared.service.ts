import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private _showLogin = new Subject<boolean>();
  private _showSignup = new Subject<boolean>();

  get showLogin$(){
    return this._showLogin;
  }

  get showSignup$() {
    return this._showSignup
  }

  setShowLogin( value: boolean ){
    this._showLogin.next( value )
  }

  setShowSignup( value: boolean ){
    this._showSignup.next( value )
  }
}
