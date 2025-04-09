import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';

export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
}

export interface ResponseResult {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo?: User;

  constructor(private _http: HttpClient) { }

  async login(username: string, password: string) {
    let body = { username, password };
    try {
      let res = await firstValueFrom(this._http.post<ResponseResult>('/api/auth/login', body));
      return res.success;
    } catch {
      this.userInfo = undefined;
      return false;
    }
  }

  async logout() {
    let res = await firstValueFrom(this._http.post<ResponseResult>('/api/auth/logout', {}));
    if (res.success) {
      this.userInfo = undefined;
    }
    return res.success;
  }

  async loadUserInfo() {
    try {
      this.userInfo = this.userInfo || await lastValueFrom(this._http.get<User>('/api/auth/user-info'))
    } catch {
      this.userInfo = undefined;
    }
    return this.userInfo;
  }
}
