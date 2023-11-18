import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  AUTH_URL = environment.apiUrl + 'ObterAutenticacaoUsuario/';

  constructor(private _http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this._http.get(this.AUTH_URL + email + '/' + password, { withCredentials: false });
  }

  logout() {
    localStorage.removeItem('currentUser');
    return of({ success: false });
  }
}
