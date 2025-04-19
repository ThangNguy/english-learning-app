import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LessonService, WeekPlan } from '../../../shared/services/lesson.service';
import { ProgressTrackerService, Progress } from '../../../shared/services/progress-tracker.service';
import { VocabularyService } from '../../../shared/services/vocabulary.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Khai báo biến private với dấu gạch dưới theo quy tắc
  private _weekPlans: WeekPlan[] = [];
  private _progress: Progress | null = null;
  private _learnedVocabularyCount: number = 0;
  private _learnedPhrasesCount: number = 0;
  
  // Constructor với dependency injection
  constructor(
    private readonly _lessonService: LessonService,
       private readonly _progressTrackerService: ProgressTrackerService,
    private readonly _vocabularyService: VocabularyService
  ) {}

  // Getter cho các biến
  public get weekPlans(): WeekPlan[] {
    return this._weekPlans;
  }

  public get progress(): Progress | null {
    return this._progress;
  }

  public get learnedVocabularyCount(): number {
    return this._learnedVocabularyCount;
  }

  public get learnedPhrasesCount(): number {
    return this._learnedPhrasesCount;
  }

  public get completionPercentage(): number {
    return this._progressTrackerService.getCompletionPercentage();
  }

  public get vocabularyPercentage(): number {
    return this._progressTrackerService.getVocabularyCompletionPercentage();
  }

  // Lifecycle hook
  ngOnInit(): void {
    this._loadData();
  }

  // Load dữ liệu cho dashboard
  private _loadData(): void {
    // Lấy dữ liệu từ các service
    this._weekPlans = this._lessonService.weekPlans;
    this._progress = this._progressTrackerService.progress;
    this._learnedVocabularyCount = this._vocabularyService.getLearnedVocabularyCount();
    this._learnedPhrasesCount = this._vocabularyService.getLearnedPhrasesCount();
  }

  // Định dạng ngày tháng
  public formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  }

  // Tính tổng số từ vựng đã học
  public getTotalWordsLearned(): number {
    return this._learnedVocabularyCount + this._learnedPhrasesCount;
  }
}
