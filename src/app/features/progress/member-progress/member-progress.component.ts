import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

interface Activity {
  id: number;
  type: 'lesson' | 'game' | 'quiz';
  name: string;
  date: Date;
  score?: number;
  duration: number;
  topic?: string;
  completed: boolean;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  iconName: string;
  date: Date;
  unlocked: boolean;
  progress?: number;
  totalRequired?: number;
}

interface Statistic {
  name: string;
  value: number;
  unit: string;
  icon: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
}

interface TopicProgress {
  id: number;
  name: string;
  totalWords: number;
  learnedWords: number;
  progress: number;
  lastStudied: Date;
}

@Component({
  selector: 'app-member-progress',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatProgressBarModule,
    MatDividerModule,
    MatChipsModule,
    MatTableModule,
    MatBadgeModule
  ],
  templateUrl: './member-progress.component.html',
  styleUrls: ['./member-progress.component.scss']
})
export class MemberProgressComponent implements OnInit {
  public memberId = signal<number>(0);
  public member = signal<any>(null);
  public weeklyProgressChart = signal<ChartData | null>(null);
  public topicDistributionChart = signal<ChartData | null>(null);
  public recentActivities = signal<Activity[]>([]);
  public achievements = signal<Achievement[]>([]);
  public statistics = signal<Statistic[]>([]);
  public topicProgress = signal<TopicProgress[]>([]);
  public selectedPeriod = signal<'week' | 'month' | 'year'>('week');
  public activityColumns = ['date', 'type', 'name', 'duration', 'score', 'status'];
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.memberId.set(+params['id']);
      this._loadMemberData();
    });
  }
  
  private _loadMemberData(): void {
    // Trong ứng dụng thực tế, dữ liệu này sẽ được lấy từ một service
    const mockMember = {
      id: this.memberId(),
      name: 'Alex Smith',
      avatar: 'assets/avatars/child1.jpg',
      age: 8,
      role: 'Child',
      joinDate: new Date(2023, 6, 15),
      totalPoints: 1250,
      streak: 7,
      lastActive: new Date(2023, 9, 18, 16, 30)
    };
    
    const mockWeeklyData: ChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Minutes Studied',
          data: [15, 30, 20, 45, 25, 60, 40],
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
          borderColor: 'rgba(63, 81, 181, 1)',
          borderWidth: 1
        },
        {
          label: 'Points Earned',
          data: [50, 120, 80, 200, 100, 250, 180],
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 1
        }
      ]
    };
    
    const mockTopicData: ChartData = {
      labels: ['Animals', 'Colors', 'Numbers', 'Family', 'Food', 'Activities'],
      datasets: [
        {
          label: 'Words Learned',
          data: [20, 15, 25, 10, 18, 12],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
    
    const mockActivities: Activity[] = [
      {
        id: 1,
        type: 'lesson',
        name: 'Farm Animals',
        date: new Date(2023, 9, 18, 16, 0),
        duration: 15,
        topic: 'Animals',
        completed: true
      },
      {
        id: 2,
        type: 'game',
        name: 'Word Match Game',
        date: new Date(2023, 9, 18, 16, 20),
        score: 85,
        duration: 10,
        topic: 'Animals',
        completed: true
      },
      {
        id: 3,
        type: 'quiz',
        name: 'Animals Quiz',
        date: new Date(2023, 9, 17, 15, 0),
        score: 90,
        duration: 8,
        topic: 'Animals',
        completed: true
      },
      {
        id: 4,
        type: 'lesson',
        name: 'Primary Colors',
        date: new Date(2023, 9, 16, 17, 30),
        duration: 12,
        topic: 'Colors',
        completed: true
      },
      {
        id: 5,
        type: 'game',
        name: 'Memory Game',
        date: new Date(2023, 9, 15, 16, 45),
        score: 70,
        duration: 15,
        topic: 'Colors',
        completed: true
      }
    ];
    
    const mockAchievements: Achievement[] = [
      {
        id: 1,
        name: 'First Steps',
        description: 'Complete your first lesson',
        iconName: 'emoji_events',
        date: new Date(2023, 6, 16),
        unlocked: true
      },
      {
        id: 2,
        name: 'Word Master',
        description: 'Learn 50 words',
        iconName: 'menu_book',
        date: new Date(2023, 8, 5),
        unlocked: true
      },
      {
        id: 3,
        name: 'Game Champion',
        description: 'Win 10 games with a score over 80%',
        iconName: 'sports_esports',
        date: new Date(2023, 9, 10),
        unlocked: true
      },
      {
        id: 4,
        name: 'Perfect Score',
        description: 'Get 100% on any quiz',
        iconName: 'workspace_premium',
        unlocked: false,
        progress: 90,
        totalRequired: 100
      },
      {
        id: 5,
        name: '7 Day Streak',
        description: 'Study for 7 days in a row',
        iconName: 'local_fire_department',
        date: new Date(2023, 9, 18),
        unlocked: true
      },
      {
        id: 6,
        name: 'Topic Master',
        description: 'Complete all lessons in a topic',
        iconName: 'psychology',
        unlocked: false,
        progress: 6,
        totalRequired: 8
      }
    ];
    
    const mockStatistics: Statistic[] = [
      {
        name: 'Total Study Time',
        value: 12.5,
        unit: 'hours',
        icon: 'timer',
        trend: 'up',
        trendValue: 15
      },
      {
        name: 'Words Learned',
        value: 85,
        unit: 'words',
        icon: 'menu_book',
        trend: 'up',
        trendValue: 10
      },
      {
        name: 'Average Score',
        value: 82,
        unit: '%',
        icon: 'analytics',
        trend: 'up',
        trendValue: 5
      },
      {
        name: 'Games Played',
        value: 24,
        unit: 'games',
        icon: 'sports_esports',
        trend: 'up',
        trendValue: 8
      }
    ];
    
    const mockTopics: TopicProgress[] = [
      {
        id: 1,
        name: 'Animals',
        totalWords: 30,
        learnedWords: 20,
        progress: 67,
        lastStudied: new Date(2023, 9, 18)
      },
      {
        id: 2,
        name: 'Colors',
        totalWords: 20,
        learnedWords: 15,
        progress: 75,
        lastStudied: new Date(2023, 9, 16)
      },
      {
        id: 3,
        name: 'Numbers',
        totalWords: 30,
        learnedWords: 25,
        progress: 83,
        lastStudied: new Date(2023, 9, 14)
      },
      {
        id: 4,
        name: 'Family',
        totalWords: 15,
        learnedWords: 10,
        progress: 67,
        lastStudied: new Date(2023, 9, 10)
      },
      {
        id: 5,
        name: 'Food',
        totalWords: 25,
        learnedWords: 18,
        progress: 72,
        lastStudied: new Date(2023, 9, 8)
      },
      {
        id: 6,
        name: 'Activities',
        totalWords: 20,
        learnedWords: 12,
        progress: 60,
        lastStudied: new Date(2023, 9, 5)
      }
    ];
    
    // Set data
    this.member.set(mockMember);
    this.weeklyProgressChart.set(mockWeeklyData);
    this.topicDistributionChart.set(mockTopicData);
    this.recentActivities.set(mockActivities);
    this.achievements.set(mockAchievements);
    this.statistics.set(mockStatistics);
    this.topicProgress.set(mockTopics);
  }
  
  public changePeriod(period: 'week' | 'month' | 'year'): void {
    this.selectedPeriod.set(period);
    
    // Trong ứng dụng thực tế, bạn sẽ tải dữ liệu mới dựa trên period được chọn
    // Ở đây, chúng ta chỉ giả lập việc thay đổi dữ liệu
    const mockData: { [key: string]: ChartData } = {
      week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Minutes Studied',
            data: [15, 30, 20, 45, 25, 60, 40],
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            borderColor: 'rgba(63, 81, 181, 1)',
            borderWidth: 1
          },
          {
            label: 'Points Earned',
            data: [50, 120, 80, 200, 100, 250, 180],
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
          }
        ]
      },
      month: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Minutes Studied',
            data: [180, 240, 210, 300],
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            borderColor: 'rgba(63, 81, 181, 1)',
            borderWidth: 1
          },
          {
            label: 'Points Earned',
            data: [800, 1200, 950, 1400],
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
          }
        ]
      },
      year: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Hours Studied',
            data: [5, 8, 12, 10, 15, 20, 18, 22, 25, 30, 0, 0],
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            borderColor: 'rgba(63, 81, 181, 1)',
            borderWidth: 1
          },
          {
            label: 'Points Earned (x100)',
            data: [2, 3, 5, 4, 6, 8, 7, 9, 10, 12, 0, 0],
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
          }
        ]
      }
    };
    
    this.weeklyProgressChart.set(mockData[period]);
  }
  
  public getActivityIcon(type: 'lesson' | 'game' | 'quiz'): string {
    switch (type) {
      case 'lesson':
        return 'menu_book';
      case 'game':
        return 'sports_esports';
      case 'quiz':
        return 'quiz';
      default:
        return 'help';
    }
  }
  
  public getActivityClass(type: 'lesson' | 'game' | 'quiz'): string {
    switch (type) {
      case 'lesson':
        return 'lesson-activity';
      case 'game':
        return 'game-activity';
      case 'quiz':
        return 'quiz-activity';
      default:
        return '';
    }
  }
  
  public formatDate(date: Date): string {
    // Format date to display in a user-friendly way
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  
  public formatTime(date: Date): string {
    // Format time to display in a user-friendly way
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  
  public getProgressColor(progress: number): string {
    if (progress < 30) return 'warn';
    if (progress < 70) return 'accent';
    return 'primary';
  }
  
  public goBack(): void {
    this._router.navigate(['/family-members']);
  }
}