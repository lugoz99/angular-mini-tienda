import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { rxResource } from '@angular/core/rxjs-interop';


const baseUrl = environment.baseUrl;

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
@Injectable({providedIn: 'root'})
export class AuthService {

  private http = inject(HttpClient);


  private _authStatus = signal<AuthStatus>('checking');


  // cuando el servicio se inicialice null
  private _user = signal<User | null>(null);

  //private _token = signal<string | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  // solo lectura , garantiza que no se modifique desde afuera , son gets
  authStatus = computed<AuthStatus>(() => {
    // se lanza cuando user o authstatus cambie
    if(this._authStatus() === 'checking'){
      return 'checking'
    }
    if(this._user()){
      return 'authenticated'
    }
    return 'not-authenticated';
  })

  user = computed(() => this._user());
  token = computed(this._token)


  // Tan pronto se monte -> verifica esto
  checkStatusResource = rxResource({
    stream:() => this.checkStatus()
  })

  login(email:string, password:string):Observable<boolean>{
    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`,{
      email,password
    }).pipe(
      map( resp => this.handleAuthSuccess(resp)),
      catchError((err:any) => this.handleAuthError(err))

    );
  }

  checkStatus():Observable<boolean>{

    const token = localStorage.getItem('token');
    if(!token) {
      this.logut();
      return of(false);
    }
    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`,{
      // headers:{
      //   Authorization:`Bearer ${token}`
      // }
    }).pipe(
      map( resp => this.handleAuthSuccess(resp)),
      catchError((err:any) => this.handleAuthError(err))
    );
  }


  logut(){
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
  }

  private handleAuthSuccess( resp:AuthResponse){
    this._user.set(resp.user);
    this._authStatus.set('authenticated');
    this._token.set(resp.token);
    localStorage.setItem('token',resp.token);
    return true;
  }


  private handleAuthError(error:any){
    this.logut();
    return of(false);
  }
}