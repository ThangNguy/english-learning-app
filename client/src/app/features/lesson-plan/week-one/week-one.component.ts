import { Component, OnInit } from '@angular/core';
import { LessonService, WeekPlan, Lesson } from '../../../shared/services/lesson.service';
import { ProgressTrackerService } from '../../../shared/services/progress-tracker.service';
import { VocabularyService } from '../../../shared/services/vocabulary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-week-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './week-one.component.html',
  styleUrl: './week-one.component.scss'
})
export class WeekOneComponent implements OnInit {
  // Khai báo biến private với dấu gạch dưới theo quy tắc
  private _weekData: WeekPlan | undefined;
  private _currentLesson: Lesson | undefined;
  private _activeTab: 'overview' | 'vocabulary' | 'phrases' | 'activities' = 'overview';
  
  // Constructor với dependency injection
  constructor(
    private readonly _lessonService: LessonService,
    private readonly _progressTrackerService: ProgressTrackerService,
    private readonly _vocabularyService: VocabularyService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {}
  
  // Getters cho các biến
  public get weekData(): WeekPlan | undefined {
    return this._weekData;
  }
  
  public get currentLesson(): Lesson | undefined {
    return this._currentLesson;
  }
  
  public get activeTab(): 'overview' | 'vocabulary' | 'phrases' | 'activities' {
    return this._activeTab;
  }
  
  // Lifecycle hook
  ngOnInit(): void {
    this._loadData();
  }
  
  // Load dữ liệu cho tuần 1
  private _loadData(): void {
    // Lấy dữ liệu tuần 1 từ service
    this._weekData = this._lessonService.getWeekPlanById(1);
    
    // Mặc định hiển thị bài học đầu tiên nếu có
    if (this._weekData && this._weekData.lessons.length > 0) {
      this._currentLesson = this._weekData.lessons[0];
    }
    
    // Kiểm tra xem có param lessonId không
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
  
  // Chuyển đổi tab
  public setActiveTab(tab: 'overview' | 'vocabulary' | 'phrases' | 'activities'): void {
    this._activeTab = tab;
  }
  
  // Chọn bài học
  public selectLesson(lesson: Lesson): void {
    this._currentLesson = lesson;
    this._activeTab = 'overview';
  }
  
  // Đánh dấu hoàn thành bài học
  public completeLesson(): void {
    if (this._currentLesson) {
      this._lessonService.markLessonAsCompleted(this._currentLesson.id);
      this._progressTrackerService.updateLessonProgress(true);
      
      // Cập nhật dữ liệu sau khi đánh dấu hoàn thành
      this._loadData();
    }
  }
  
  // Đánh dấu hoàn thành hoạt động
  public completeActivity(activityId: number): void {
    if (this._currentLesson) {
      this._lessonService.markActivityAsCompleted(this._currentLesson.id, activityId);
      this._progressTrackerService.updateActivityProgress(true);
      
      // Cập nhật dữ liệu sau khi đánh dấu hoàn thành
      this._loadData();
    }
  }
  
  // Đánh dấu từ vựng đã học
  public learnVocabulary(): void {
    if (this._currentLesson) {
      const vocabularyCount = this._currentLesson.vocabulary.length;
      this._progressTrackerService.updateVocabularyProgress(vocabularyCount);
      
      // Đánh dấu từng từ vựng đã học trong VocabularyService
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
  
  // Đánh dấu mẫu câu đã học
  public learnPhrases(): void {
    if (this._currentLesson) {
      const phrasesCount = this._currentLesson.phrases.length;
      this._progressTrackerService.updateVocabularyProgress(phrasesCount);
      
      // Đánh dấu từng mẫu câu đã học trong VocabularyService
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
