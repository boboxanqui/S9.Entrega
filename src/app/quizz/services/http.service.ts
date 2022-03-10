import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/api.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http:HttpClient ) { }


  private countriesUrl: string = 'https://restcountries.com/v2/'

  getCountriesList(): Observable<Country[]> {
    return this.http.get<Country[]>( `${this.countriesUrl}all?fields=capital,translations,flags` );
  }
}
