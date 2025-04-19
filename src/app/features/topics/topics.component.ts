import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

interface Topic {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  color: string;
  wordCount: number;
  difficultyLevel: string;
}

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  public topics = signal<Topic[]>([
    {
      id: 1,
      name: 'Animals',
      description: 'Learn animal names and sounds in English',
      iconUrl: 'assets/icons/animals.png',
      color: '#FF7043',
      wordCount: 20,
      difficultyLevel: 'Beginner'
    },
    {
      id: 2,
      name: 'Colors',
      description: 'Learn the basic colors and their shades',
      iconUrl: 'assets/icons/colors.png',
      color: '#42A5F5',
      wordCount: 15,
      difficultyLevel: 'Beginner'
    },
    {
      id: 3,
      name: 'Numbers',
      description: 'Count from 1 to 100 in English',
      iconUrl: 'assets/icons/numbers.png',
      color: '#66BB6A',
      wordCount: 30,
      difficultyLevel: 'Beginner'
    },
    {
      id: 4,
      name: 'Family',
      description: 'Learn family member names and relationships',
      iconUrl: 'assets/icons/family.png',
      color: '#AB47BC',
      wordCount: 12,
      difficultyLevel: 'Beginner'
    },
    {
      id: 5,
      name: 'Food',
      description: 'Learn food names, fruits, and vegetables',
      iconUrl: 'assets/icons/food.png',
      color: '#FFA726',
      wordCount: 25,
      difficultyLevel: 'Intermediate'
    },
    {
      id: 6,
      name: 'Daily Routines',
      description: 'Learn verbs for daily activities',
      iconUrl: 'assets/icons/routines.png',
      color: '#26C6DA',
      wordCount: 18,
      difficultyLevel: 'Intermediate'
    }
  ]);

  constructor(private _router: Router) {}

  public startTopic(topic: Topic): void {
    console.log(`Starting topic: ${topic.name}`);
    // In a real application, you would navigate to the topic detail page
    // this._router.navigate(['/topics', topic.id]);
  }
}
