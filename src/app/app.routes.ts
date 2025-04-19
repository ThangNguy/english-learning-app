import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TopicsComponent } from './features/topics/topics.component';
import { MiniGamesComponent } from './features/mini-games/mini-games.component';
import { ProgressComponent } from './features/progress/progress.component';
import { FamilyMembersComponent } from './features/family-members/family-members.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'topics', pathMatch: 'full' },
      { path: 'topics', component: TopicsComponent },
      { path: 'mini-games', component: MiniGamesComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'family-members', component: FamilyMembersComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }
];
