import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private _http:HttpClient) { }

  currentData() {
    return this._http.get("https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=21609c7220fe068c0fa3fcd2c4fddff4").pipe(map((res) => res))
  }
}
