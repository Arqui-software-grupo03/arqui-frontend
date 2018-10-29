import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { Authenticate } from '@app/auth/authenticate.guard';

const usersRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'profile', // Change '' for orders-list
                component: UsersComponent,

            }
        ]
    }
];
export const usersRouting: ModuleWithProviders = RouterModule.forChild(usersRoutes);
