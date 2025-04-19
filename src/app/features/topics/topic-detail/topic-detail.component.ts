import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

interface Word {
  id: number;
  english: string;
  vietnamese: string;
  imageUrl: string;
  audioUrl: string;
  example: string;
  learned: boolean;
}

interface Lesson {
  id: number;
  title: string;
  description: string;
  words: Word[];
  completed: boolean;
  progress: number;
}

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule
  ],
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss']
})
export class TopicDetailComponent implements OnInit {
  public topicId = signal<number>(0);
  public topic = signal<any>(null);
  public lessons = signal<Lesson[]>([]);
  public activeLesson = signal<Lesson | null>(null);
  public progress = signal<number>(0);
  
  private _audioPlayer: HTMLAudioElement | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.topicId.set(+params['id']);
      this._loadTopicData();
    });
    
    this._audioPlayer = new Audio();
  }
  
  private _loadTopicData(): void {
    // Trong ứng dụng thực tế, dữ liệu này sẽ được lấy từ một service
    const mockTopic = {
      id: this.topicId(),
      name: 'Animals',
      description: 'Learn animal names and sounds in English',
      iconUrl: 'assets/icons/animals.png',
      color: '#FF7043',
      wordCount: 20,
      difficultyLevel: 'Beginner',
      completedPercentage: 35
    };
    
    const mockLessons: Lesson[] = [
      {
        id: 1,
        title: 'Lesson 1: Pets',
        description: 'Learn about common pets and animals at home',
        completed: true,
        progress: 100,
        words: [
          {
            id: 1,
            english: 'Dog',
            vietnamese: 'Con chó',
            imageUrl: 'assets/words/animals/dog.jpg',
            audioUrl: 'assets/audio/animals/dog.mp3',
            example: 'The dog is barking at the mailman.',
            learned: true
          },
          {
            id: 2,
            english: 'Cat',
            vietnamese: 'Con mèo',
            imageUrl: 'assets/words/animals/cat.jpg',
            audioUrl: 'assets/audio/animals/cat.mp3',
            example: 'The cat is sleeping on the sofa.',
            learned: true
          },
          {
            id: 3,
            english: 'Bird',
            vietnamese: 'Con chim',
            imageUrl: 'assets/words/animals/bird.jpg',
            audioUrl: 'assets/audio/animals/bird.mp3',
            example: 'The bird is singing in the tree.',
            learned: true
          },
          {
            id: 4,
            english: 'Fish',
            vietnamese: 'Con cá',
            imageUrl: 'assets/words/animals/fish.jpg',
            audioUrl: 'assets/audio/animals/fish.mp3',
            example: 'The fish is swimming in the tank.',
            learned: true
          }
        ]
      },
      {
        id: 2,
        title: 'Lesson 2: Farm Animals',
        description: 'Learn about animals that live on farms',
        completed: false,
        progress: 50,
        words: [
          {
            id: 5,
            english: 'Cow',
            vietnamese: 'Con bò',
            imageUrl: 'assets/words/animals/cow.jpg',
            audioUrl: 'assets/audio/animals/cow.mp3',
            example: 'The cow gives us milk.',
            learned: true
          },
          {
            id: 6,
            english: 'Horse',
            vietnamese: 'Con ngựa',
            imageUrl: 'assets/words/animals/horse.jpg',
            audioUrl: 'assets/audio/animals/horse.mp3',
            example: 'The horse is running in the field.',
            learned: true
          },
          {
            id: 7,
            english: 'Pig',
            vietnamese: 'Con lợn',
            imageUrl: 'assets/words/animals/pig.jpg',
            audioUrl: 'assets/audio/animals/pig.mp3',
            example: 'The pig is rolling in the mud.',
            learned: false
          },
          {
            id: 8,
            english: 'Chicken',
            vietnamese: 'Con gà',
            imageUrl: 'assets/words/animals/chicken.jpg',
            audioUrl: 'assets/audio/animals/chicken.mp3',
            example: 'The chicken lays eggs.',
            learned: false
          }
        ]
      },
      {
        id: 3,
        title: 'Lesson 3: Wild Animals',
        description: 'Learn about animals that live in the wild',
        completed: false,
        progress: 0,
        words: [
          {
            id: 9,
            english: 'Lion',
            vietnamese: 'Con sư tử',
            imageUrl: 'assets/words/animals/lion.jpg',
            audioUrl: 'assets/audio/animals/lion.mp3',
            example: 'The lion is the king of the jungle.',
            learned: false
          },
          {
            id: 10,
            english: 'Elephant',
            vietnamese: 'Con voi',
            imageUrl: 'assets/words/animals/elephant.jpg',
            audioUrl: 'assets/audio/animals/elephant.mp3',
            example: 'The elephant has a long trunk.',
            learned: false
          },
          {
            id: 11,
            english: 'Monkey',
            vietnamese: 'Con khỉ',
            imageUrl: 'assets/words/animals/monkey.jpg',
            audioUrl: 'assets/audio/animals/monkey.mp3',
            example: 'The monkey is climbing the tree.',
            learned: false
          },
          {
            id: 12,
            english: 'Tiger',
            vietnamese: 'Con hổ',
            imageUrl: 'assets/words/animals/tiger.jpg',
            audioUrl: 'assets/audio/animals/tiger.mp3',
            example: 'The tiger has orange and black stripes.',
            learned: false
          }
        ]
      }
    ];
    
    this.topic.set(mockTopic);
    this.lessons.set(mockLessons);
    this.activeLesson.set(mockLessons[0]);
    
    // Tính toán tổng tiến độ
    const totalLessons = mockLessons.length;
    const completedProgress = mockLessons.reduce((acc, lesson) => acc + lesson.progress, 0);
    this.progress.set(Math.round(completedProgress / totalLessons));
  }
  
  public selectLesson(lesson: Lesson): void {
    this.activeLesson.set(lesson);
  }
  
  public playAudio(audioUrl: string): void {
    if (this._audioPlayer) {
      this._audioPlayer.src = audioUrl;
      this._audioPlayer.play();
    }
  }
  
  public markAsLearned(word: Word): void {
    word.learned = true;
    
    // Cập nhật tiến độ bài học
    const updatedLessons = this.lessons().map(lesson => {
      const wordInLesson = lesson.words.find(w => w.id === word.id);
      if (wordInLesson) {
        const learnedWords = lesson.words.filter(w => w.learned).length;
        lesson.progress = Math.round((learnedWords / lesson.words.length) * 100);
        lesson.completed = lesson.progress === 100;
      }
      return lesson;
    });
    
    this.lessons.set(updatedLessons);
    
    // Cập nhật tổng tiến độ
    const totalLessons = updatedLessons.length;
    const completedProgress = updatedLessons.reduce((acc, lesson) => acc + lesson.progress, 0);
    this.progress.set(Math.round(completedProgress / totalLessons));
  }
  
  public startQuiz(): void {
    // Trong ứng dụng thực tế, bạn sẽ điều hướng đến trang quiz
    console.log('Starting quiz for lesson:', this.activeLesson());
  }
  
  public goToNextLesson(): void {
    const currentLessonIndex = this.lessons().findIndex(lesson => lesson.id === this.activeLesson()?.id);
    if (currentLessonIndex < this.lessons().length - 1) {
      this.activeLesson.set(this.lessons()[currentLessonIndex + 1]);
    }
  }
  
  public goToPreviousLesson(): void {
    const currentLessonIndex = this.lessons().findIndex(lesson => lesson.id === this.activeLesson()?.id);
    if (currentLessonIndex > 0) {
      this.activeLesson.set(this.lessons()[currentLessonIndex - 1]);
    }
  }
}