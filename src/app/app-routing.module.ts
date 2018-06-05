import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuardService } from './shared/services/access-guard.service';

const appRoutes: Routes = [
    { path: 'login',
      loadChildren: './login/login.module#LoginModule',
    },
    { path: 'users',
      loadChildren: './users/users.module#UsersModule',
    },
    { path: 'issues',
      loadChildren: './issues/issues.module#IssuesModule',
    },
    // Redirect all others to login
    { path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    { path: '**', redirectTo: '/login' }
  ];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(appRoutes);
