import { Routes } from '@angular/router';
import { noAuthenticatedGuard } from './auth/guards/no-authenticated-guard';

export const routes: Routes = [


  // Orden importa

  {
    path:'auth',
    loadChildren: ()=>import('./auth/auth.routes'),
    canMatch:[
      noAuthenticatedGuard
    ]
    
  },
  {
    path:'',
    loadChildren: ()=>import('./store-front/store-front.routes')
  },
];
