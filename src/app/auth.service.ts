import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse, User } from './shared/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  private baseUrl: string = 'http://localhost:4000/api'
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  signup( name:string, email: string, password:string ){

    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>( url, body ).pipe(
      tap( resp => {
        if ( resp.ok ){
          localStorage.setItem('token', resp.token!)
          this._user = {
            name: resp.name!,
            uid: resp.uid!
          }
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    )
  }

  login( email: string, password: string) {
    
    const url = `${this.baseUrl}/auth`
    const body = { email, password }

    return this.http.post<AuthResponse>( url, body).pipe(
      tap( resp => {
        if ( resp.ok ){
          localStorage.setItem('token', resp.token!)
          this._user = {
            name: resp.name!,
            uid: resp.uid!
          }
        }
      }),
      map( resp => resp.ok ),
      catchError( err => of(err.error.msg) )
    )
  }

  validarToken(): Observable<boolean>{

    const url = `${ this.baseUrl }/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>( url, {headers} ).pipe(
      map( resp => {
        localStorage.setItem('token', resp.token!)
        this._user = {
          name: resp.name!,
          uid: resp.uid!
        }
        return resp.ok
      }),
      catchError( err => of(false))
    )
  }

  logout(){
    localStorage.removeItem('token');
    this._user = {name:'',uid:''}
  }
}
