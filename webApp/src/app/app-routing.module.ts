import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { UsersComponent } from '@app/users/users.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TopicComponent } from '@app/topic/topic.component';
import { Authenticate } from './auth/authenticate.guard';
import { TopicPostsResolver } from './topic/topic.resolver';
import { UserResolver } from './users/user.resolver';

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
    {
      path: 'topic/:topicId',
      component: TopicComponent,
      canActivate: [ Authenticate ],
      resolve: {
        'topic':  TopicPostsResolver
      }
    },
    { path: 'profile',
      component: UsersComponent,
      canActivate: [ Authenticate ]
    },
    {
      path: 'user/:userId',
      component: UsersComponent,
      canActivate: [ Authenticate ],
      resolve: {
        'user': UserResolver
      }
    },
    { path: '**',
      redirectTo: 'home'
    }
  ];
  @NgModule({
    /* RouterModule.forRoot performs the initial navigation
    based on the current browser URL */
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule { }
