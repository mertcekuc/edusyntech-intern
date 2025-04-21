import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { UserListComponent } from '../user-list/user-list.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent,
        //canActivate: [AuthGuard],
        children: [
            { path: 'user', component: UserListComponent },
            {path: 'subscription', component: SubscriptionComponent}
        ]   
    },
];