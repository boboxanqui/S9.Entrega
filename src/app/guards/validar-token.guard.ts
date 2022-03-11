import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor( 
    private authService: AuthService,
    private router: Router 
  ){}


  canActivate(): Observable<boolean> | boolean  {
    // console.log('CanActivate');
    
    return this.authService.validarToken().pipe(
      tap( resp => {
        if( !resp ){
          console.log('Bloqueado por canActivate');
          
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Solo disponible para usuarios',
            showCloseButton: true,
            confirmButtonText:`
            <span  
              (click)="setShowLogin(true)" 
              data-bs-toggle="modal" 
              data-bs-target="#loginModal">
              <i class="fa-solid fa-user"></i>
              Iniciar session
            </span>`,
            confirmButtonAriaLabel: 'Iniciar session',
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
