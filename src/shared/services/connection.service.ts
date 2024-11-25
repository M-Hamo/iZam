import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  public constructor(private readonly _http: HttpClient) {}

  private readonly _apiUrl = environment.apiUrl;

  post(url: string, body?: any): Observable<any> {
    const opts = body ? body : {};
    return this._http.post(this._apiUrl + url, opts);
  }

  patch(url: string, body: any): Observable<any> {
    return this._http.patch(this._apiUrl + url, body);
  }

  get(url: string, params?: HttpParams): Observable<any> {
    const opts = params ? { params: params } : {};
    return this._http.get(this._apiUrl + url, opts);
  }

  put(url: string, body: any): Observable<any> {
    return this._http.put(this._apiUrl + url, body);
  }

  delete(url: string): Observable<any> {
    return this._http.delete(this._apiUrl + url);
  }

  postFileService(url: string, data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'undefined' });
    return this._http.post(url, data, { headers: headers });
  }
}
