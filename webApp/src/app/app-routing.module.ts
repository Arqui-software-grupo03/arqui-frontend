import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { AppComponent } from '@app/app.component';
import { AuthResolver } from '@app/auth/auth.resolver';

// Define routes for url: localhost:4200/anyRoute
const routes: Routes = [
    // first route redirects any '/' path to '/dashboard
    { path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    { path: 'home',
      component:
      AppComponent,
      resolve: {
          'user': AuthResolver
      }
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
