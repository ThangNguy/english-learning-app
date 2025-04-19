import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { VocabularyComponent } from './features/vocabulary/vocabulary.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'lessons/vocabulary', component: VocabularyComponent },
  { 
    path: 'lessons', 
    loadChildren: () => import('./features/lesson-plan/lesson-plan.module').then(m => m.LessonPlanModule)
  }
];
