import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface ActivityData {
  label: string;
  value: number;
  color: string;
}

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  avatarUrl?: string;
  color: string;
  points: number;
  completedTopics: number;
  streak: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  date: Date;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  public selectedTimePeriod = signal<string>('week');
  
  public activityData = signal<ActivityData[]>([
    { label: 'Mon', value: 40, color: '#42A5F5' },
    { label: 'Tue', value: 65, color: '#42A5F5' },
    { label: 'Wed', value: 30, color: '#42A5F5' },
    { label: 'Thu', value: 85, color: '#42A5F5' },
    { label: 'Fri', value: 55, color: '#42A5F5' },
    { label: 'Sat', value: 70, color: '#42A5F5' },
    { label: 'Sun', value: 45, color: '#42A5F5' }
  ]);
  
  public familyMembers = signal<FamilyMember[]>([
    {
      id: 1,
      name: 'David Parker',
      role: 'Parent',
      color: '#5C6BC0',
      points: 1250,
      completedTopics: 8,
      streak: 12
    },
    {
      id: 2,
      name: 'Emma Parker',
      role: 'Child',
      color: '#EC407A',
      points: 1420,
      completedTopics: 10,
      streak: 15
    },
    {
      id: 3,
      name: 'Michael Parker',
      role: 'Child',
      color: '#66BB6A',
      points: 980,
      completedTopics: 6,
      streak: 7
    },
    {
      id: 4,
      name: 'Sarah Parker',
      role: 'Parent',
      color: '#FFA726',
      points: 850,
      completedTopics: 5,
      streak: 5
    }
  ]);
  
  public recentAchievements = signal<Achievement[]>([
    {
      id: 1,
      title: 'Vocabulary Master',
      description: 'Completed the Animals vocabulary set with 100% accuracy',
      icon: 'pets',
      color: '#FF7043',
      date: new Date(2023, 3, 15, 14, 30)
    },
    {
      id: 2,
      title: 'Perfect Streak',
      description: 'Maintained a 10-day learning streak',
      icon: 'local_fire_department',
      color: '#FFA726',
      date: new Date(2023, 3, 12, 9, 15)
    },
    {
      id: 3,
      title: 'Family Champion',
      description: 'Ranked #1 in the family leaderboard for this week',
      icon: 'emoji_events',
      color: '#FFD54F',
      date: new Date(2023, 3, 10, 18, 45)
    },
    {
      id: 4,
      title: 'Game Master',
      description: 'Won 5 consecutive Word Match games',
      icon: 'sports_esports',
      color: '#7E57C2',
      date: new Date(2023, 3, 8, 16, 20)
    }
  ]);

  public updateTimePeriod(period: string): void {
    this.selectedTimePeriod.set(period);
    // Trong một ứng dụng thực tế, bạn sẽ tải dữ liệu mới dựa trên khoảng thời gian được chọn
    console.log(`Time period changed to: ${period}`);
  }
}
