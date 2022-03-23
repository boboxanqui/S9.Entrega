import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginGuardComponent } from '../shared/login-guard/login-guard.component';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor( 
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ){}


  canActivate(): Observable<boolean> | boolean  {
    // console.log('CanActivate');
    
    return this.authService.validarToken().pipe(
      tap( resp => {
        if( !resp ){
          console.log('Bloqueado por canActivate');

          this.modalService.open(LoginGuardComponent, {
            animation: true,
            centered: true,
          })
          
        }
      } )
    );
  }
  canLoad(): Observable<boolean> | boolean {
    // console.log('CanLoad');
    
    return this.authService.validarToken().pipe(
      tap( resp => {
        if( !resp ){
          console.log('Bloqueado por canActivate');

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Inicia sesion para poder jugar',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      } )
    );
  }
}
