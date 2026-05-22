import { inject } from '@angular/core';
import {  CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth';
import { firstValueFrom } from 'rxjs';

export const noAuthenticatedGuard: CanMatchFn = async (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // observable -> esperar el valor como si fuera una promesa <-> guard asincrono
  const isAuthenticated = await firstValueFrom(authService.checkStatus())

  if( isAuthenticated){
    router.navigateByUrl('/');
    return false; // no vea la ruta
  }
  return true; // no esta authenticado
};