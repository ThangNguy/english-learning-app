import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService, WeekPlan, Lesson } from '../../../shared/services/lesson.service';
import { ProgressTrackerService } from '../../../shared/services/progress-tracker.service';
import { VocabularyService } from '../../../shared/services/vocabulary.service';

@Component({
  selector: 'app-week-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-four.component.html',
  styleUrl: './week-four.component.scss'
})
export class WeekFourComponent implements OnInit {
  // Private properties
  private _weekData: WeekPlan | undefined;
  private _currentLesson: Lesson | undefined;
  private _activeTab: 'overview' | 'vocabulary' | 'phrases' | 'activities' = 'overview';
  
  // Constructor
  constructor(
    private readonly _lessonService: LessonService,
    private readonly _progressTrackerService: ProgressTrackerService,
    private readonly _vocabularyService: VocabularyService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}
  
  // Getters
  public get weekData(): WeekPlan | undefined {
    return this._weekData;
  }
  
  public get currentLesson(): Lesson | undefined {
    return this._currentLesson;
  }
  
  public get activeTab(): 'overview' | 'vocabulary' | 'phrases' | 'activities' {
    return this._activeTab;
  }
  
  // Implementing OnInit
  ngOnInit(): void {
    this._loadData();
  }
  
  // Private methods
  private _loadData(): void {
    // Load week four data
    this._weekData = this._lessonService.getWeekPlanById(4);
    
    // Set default lesson if available
    if (this._weekData && this._weekData.lessons.length > 0) {
      this._currentLesson = this._weekData.lessons[0];
    }
    
    // Check for lessonId parameter
    this._route.params.subscribe(params => {
      const lessonId = Number(params['lessonId']);
      if (lessonId && this._weekData) {
        const lesson = this._weekData.lessons.find(l => l.id === lessonId);
        if (lesson) {
          this._currentLesson = lesson;
        }
      }
    });
  }
  
  // Public methods
  public setActiveTab(tab: 'overview' | 'vocabulary' | 'phrases' | 'activities'): void {
    this._activeTab = tab;
  }
  
  public selectLesson(lesson: Lesson): void {
    this._currentLesson = lesson;
    this._activeTab = 'overview';
  }
  
  public completeLesson(): void {
    if (this._currentLesson) {
      this._lessonService.markLessonAsCompleted(this._currentLesson.id);
      this._progressTrackerService.updateLessonProgress(true);
      this._loadData();
    }
  }
  
  public completeActivity(activityId: number): void {
    if (this._currentLesson) {
      this._lessonService.markActivityAsCompleted(this._currentLesson.id, activityId);
      this._progressTrackerService.updateActivityProgress(true);
      this._loadData();
    }
  }
  
  public learnVocabulary(): void {
    if (this._currentLesson) {
      const vocabularyCount = this._currentLesson.vocabulary.length;
      this._progressTrackerService.updateVocabularyProgress(vocabularyCount);
      
      this._currentLesson.vocabulary.forEach(vocab => {
        const foundVocab = this._vocabularyService.vocabulary.find(
          v => v.word.toLowerCase() === vocab.word.toLowerCase()
        );
        
        if (foundVocab) {
          this._vocabularyService.markVocabularyAsLearned(foundVocab.id);
        }
      });
    }
  }
  
  public learnPhrases(): void {
    if (this._currentLesson) {
      const phrasesCount = this._currentLesson.phrases.length;
      this._progressTrackerService.updateVocabularyProgress(phrasesCount);
      
      this._currentLesson.phrases.forEach(phrase => {
        const foundPhrase = this._vocabularyService.phrases.find(
          p => p.phrase.toLowerCase() === phrase.phrase.toLowerCase()
        );
        
        if (foundPhrase) {
          this._vocabularyService.markPhraseAsLearned(foundPhrase.id);
        }
      });
    }
  }
}
