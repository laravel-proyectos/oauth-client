import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const { api } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post(`${api}/oauth/login`, body);
  }

  user() {
    return this.http.get(`${api}/user`);
  }

  refresh() {
    return this.http.post(`${api}/oauth/refresh`, {
      client_id: '9946b697-eb71-4624-adaf-c33c80868630',
      client_secret: 'Uh4i50sHZPcqpx71LACK8GZ85W2M3rm9ctVDSznA'
    });
  }

  logout() {
    return this.http.post(`${api}/oauth/logout`, {})
  }
}
