import { Injectable, signal } from '@angular/core';

export interface Progress {
  totalLessons: number;
  completedLessons: number;
  totalActivities: number;
  completedActivities: number;
  totalVocabulary: number;
  learnedVocabulary: number;
  streakDays: number;
  lastCompletedDate?: Date;
}

export interface DailyProgress {
  date: Date;
  lessonsCompleted: number;
  activitiesCompleted: number;
  minutesSpent: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressTrackerService {
  // Khai báo biến private với dấu gạch dưới theo quy định
  private readonly _progress = signal<Progress>({
    totalLessons: 10,
    completedLessons: 0,
    totalActivities: 30,
    completedActivities: 0,
    totalVocabulary: 500,
    learnedVocabulary: 0,
    streakDays: 0
  });

  private readonly _dailyProgress = signal<DailyProgress[]>([]);
  private readonly _startDate = signal<Date>(new Date());

  constructor() {
    // Khởi tạo giá trị mặc định
    this._initializeProgress();
  }

  // Getter cho các signal
  public get progress(): Progress {
    return this._progress();
  }

  public get dailyProgress(): DailyProgress[] {
    return this._dailyProgress();
  }

  public get startDate(): Date {
    return this._startDate();
  }

  // Khởi tạo dữ liệu progress
  private _initializeProgress(): void {
    // Đọc dữ liệu từ localStorage nếu có
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress) as Progress;
        this._progress.set(parsedProgress);
      } catch (error) {
        console.error('Error parsing saved progress', error);
      }
    }

    const savedDailyProgress = localStorage.getItem('dailyProgress');
    if (savedDailyProgress) {
      try {
        const parsedDailyProgress = JSON.parse(savedDailyProgress) as DailyProgress[];
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const dailyProgressWithDates = parsedDailyProgress.map(item => ({
          ...item,
          date: new Date(item.date)
        }));
        this._dailyProgress.set(dailyProgressWithDates);
      } catch (error) {
        console.error('Error parsing saved daily progress', error);
      }
    }
  }

  // Lưu tiến độ vào localStorage
  private _saveProgress(): void {
    localStorage.setItem('userProgress', JSON.stringify(this.progress));
    localStorage.setItem('dailyProgress', JSON.stringify(this.dailyProgress));
  }

  // Cập nhật tiến độ khi hoàn thành bài học
  public updateLessonProgress(completed: boolean = true): void {
    if (completed) {
      const updatedProgress = {
        ...this.progress,
        completedLessons: this.progress.completedLessons + 1,
        lastCompletedDate: new Date()
      };
      this._progress.set(updatedProgress);
      this._updateDailyProgress({ lessonsCompleted: 1, activitiesCompleted: 0, minutesSpent: 15 });
      this._updateStreak();
      this._saveProgress();
    }
  }

  // Cập nhật tiến độ khi hoàn thành hoạt động
  public updateActivityProgress(completed: boolean = true): void {
    if (completed) {
      const updatedProgress = {
        ...this.progress,
        completedActivities: this.progress.completedActivities + 1,
        lastCompletedDate: new Date()
      };
      this._progress.set(updatedProgress);
      this._updateDailyProgress({ lessonsCompleted: 0, activitiesCompleted: 1, minutesSpent: 10 });
      this._updateStreak();
      this._saveProgress();
    }
  }

  // Cập nhật số từ vựng đã học
  public updateVocabularyProgress(count: number): void {
    const updatedProgress = {
      ...this.progress,
      learnedVocabulary: this.progress.learnedVocabulary + count,
      lastCompletedDate: new Date()
    };
    this._progress.set(updatedProgress);
    this._updateStreak();
    this._saveProgress();
  }

  // Cập nhật tiến độ hàng ngày
  private _updateDailyProgress(data: { lessonsCompleted: number, activitiesCompleted: number, minutesSpent: number }): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyProgressList = [...this.dailyProgress];
    const todayEntry = dailyProgressList.find(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    if (todayEntry) {
      // Cập nhật tiến độ cho ngày hôm nay
      const updatedEntry = {
        ...todayEntry,
        lessonsCompleted: todayEntry.lessonsCompleted + data.lessonsCompleted,
        activitiesCompleted: todayEntry.activitiesCompleted + data.activitiesCompleted,
        minutesSpent: todayEntry.minutesSpent + data.minutesSpent
      };
      
      const updatedDailyProgress = dailyProgressList.map(entry => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === today.getTime() ? updatedEntry : entry;
      });
      
      this._dailyProgress.set(updatedDailyProgress);
    } else {
      // Tạo mới tiến độ cho ngày hôm nay
      const newEntry: DailyProgress = {
        date: today,
        lessonsCompleted: data.lessonsCompleted,
        activitiesCompleted: data.activitiesCompleted,
        minutesSpent: data.minutesSpent
      };
      
      this._dailyProgress.set([...dailyProgressList, newEntry]);
    }
  }

  // Cập nhật streak days
  private _updateStreak(): void {
    const currentProgress = this.progress;
    const lastCompletedDate = currentProgress.lastCompletedDate;
    
    if (!lastCompletedDate) {
      // Lần đầu hoàn thành, streak = 1
      const updatedProgress = {
        ...currentProgress,
        streakDays: 1
      };
      this._progress.set(updatedProgress);
      return;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastDate = new Date(lastCompletedDate);
    lastDate.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate.getTime() === yesterday.getTime()) {
      // Học liên tiếp các ngày, tăng streak
      const updatedProgress = {
        ...currentProgress,
        streakDays: currentProgress.streakDays + 1
      };
      this._progress.set(updatedProgress);
    } else if (lastDate.getTime() === today.getTime()) {
      // Đã cập nhật tiến độ hôm nay rồi, không thay đổi streak
      return;
    } else {
      // Bỏ lỡ ngày, streak reset về 1
      const updatedProgress = {
        ...currentProgress,
        streakDays: 1
      };
      this._progress.set(updatedProgress);
    }
  }

  // Tính toán phần trăm hoàn thành
  public getCompletionPercentage(): number {
    const { totalLessons, completedLessons } = this.progress;
    return (completedLessons / totalLessons) * 100;
  }

  // Tính toán phần trăm hoàn thành từ vựng
  public getVocabularyCompletionPercentage(): number {
    const { totalVocabulary, learnedVocabulary } = this.progress;
    return (learnedVocabulary / totalVocabulary) * 100;
  }

  // Lấy tiến độ trong 7 ngày gần nhất
  public getWeeklyProgress(): DailyProgress[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 6);
    
    return this.dailyProgress.filter(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() >= oneWeekAgo.getTime();
    });
  }

  // Reset tiến độ
  public resetProgress(): void {
    const defaultProgress: Progress = {
      totalLessons: 10,
      completedLessons: 0,
      totalActivities: 30,
      completedActivities: 0,
      totalVocabulary: 500,
      learnedVocabulary: 0,
      streakDays: 0
    };
    
    this._progress.set(defaultProgress);
    this._dailyProgress.set([]);
    this._startDate.set(new Date());
    this._saveProgress();
  }
}
