import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {InterfacePais} from "../pages/interfaces/pais";

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private httpClient: HttpClient) {
  }

  getPaises()
  {
    return this.httpClient.get<InterfacePais[]>('https://restcountries.com/v2/lang/es');
  }
}
