import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginGuardService } from "./services/login-guard.service";

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuardService] },
    { path: '', component: ChatComponent , pathMatch: 'full'},
    { path: '**', redirectTo: '' }
];
