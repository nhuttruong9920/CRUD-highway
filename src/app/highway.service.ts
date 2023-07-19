import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Highway } from './highway.model';

@Injectable({
  providedIn: 'root',
})
export class HighwayService {
  private apiUrl = 'http://192.168.38.156:7002/highway';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
  };

  constructor(private httpClient: HttpClient) {}
  body = {
    maxPageSize: 30,
    pageIndex: 0,
    pageSize: 30,
    keyword: '',
    sorting: '',
  };

  getAllHighways(): Observable<''> {
    return this.httpClient.post<''>(this.apiUrl + '/getall/', this.body);
  }

  getHighwayByID(id: string): Observable<Highway> {
    return this.httpClient.get<Highway>(this.apiUrl + '/getbyid/' + id);
  }

  createANewHighway(highway: Highway): Observable<Highway> {
    return this.httpClient.post<Highway>(this.apiUrl + '/create/', highway);
  }

  updateAHighway(highway: Highway): Observable<Highway> {
    return this.httpClient.put<Highway>(this.apiUrl + '/update/', highway);
  }

  deleteAHighway(id: string) {
    return this.httpClient.delete<Highway>(this.apiUrl + '/delete/' + id);
  }
}
