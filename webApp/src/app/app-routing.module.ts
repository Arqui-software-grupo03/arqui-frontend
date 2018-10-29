import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { AppComponent } from '@app/app.component';
import { UsersComponent } from '@app/users/users.component';
import { HomepageComponent } from './homepage/homepage.component';
import { Authenticate } from './auth/authenticate.guard';

// Define routes for url: localhost:4200/anyRoute
const routes: Routes = [
    // first route redirects any '/' path to '/dashboard
    { path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    { path: 'home',
      component:
      HomepageComponent,
    },
    { path: 'profile',
      component: UsersComponent,
      canActivate: [ Authenticate ]
    },
    { path: '**',
      component: NotFoundComponent
    }
  ];
  @NgModule({
    /* RouterModule.forRoot performs the initial navigation
    based on the current browser URL */
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule { }
