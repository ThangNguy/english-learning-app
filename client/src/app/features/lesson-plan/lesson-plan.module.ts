import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeekOneComponent } from './week-one/week-one.component';
import { WeekTwoComponent } from './week-two/week-two.component';
import { WeekThreeComponent } from './week-three/week-three.component';
import { WeekFourComponent } from './week-four/week-four.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'week-1', component: WeekOneComponent },
  { path: 'week-1/lesson/:lessonId', component: WeekOneComponent },
  { path: 'week-2', component: WeekTwoComponent },
  { path: 'week-2/lesson/:lessonId', component: WeekTwoComponent },
  { path: 'week-3', component: WeekThreeComponent },
  { path: 'week-3/lesson/:lessonId', component: WeekThreeComponent },
  { path: 'week-4', component: WeekFourComponent },
  { path: 'week-4/lesson/:lessonId', component: WeekFourComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DashboardComponent,
    WeekOneComponent,
    WeekTwoComponent,
    WeekThreeComponent,
    WeekFourComponent
  ]
})
export class LessonPlanModule { }
