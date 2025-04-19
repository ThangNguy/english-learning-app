import { Injectable, signal } from '@angular/core';

// Interfaces cho dữ liệu bài học
export interface Lesson {
  id: number;
  title: string;
  description: string;
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
  completed?: boolean;
}

export interface VocabularyItem {
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string; // Added pronunciation as an optional property
}

export interface PhraseItem {
  phrase: string;
  meaning: string;
  usage: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  type: 'listening' | 'speaking' | 'writing' | 'reading';
  completed?: boolean;
}

export interface WeekPlan {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  // Khai báo biến với tiền tố modifier và dấu gạch dưới cho biến private
  private readonly _weekPlans = signal<WeekPlan[]>([
    {
      id: 1,
      title: 'Tuần 1: Giao tiếp cơ bản',
      description: 'Làm quen với môi trường công sở, giới thiệu bản thân và các cuộc hội thoại cơ bản',
      lessons: [
        {
          id: 1,
          title: 'Giới thiệu bản thân & đồng nghiệp',
          description: 'Học cách giới thiệu bản thân và làm quen với đồng nghiệp trong môi trường công sở',
          vocabulary: [
            {
              word: 'department',
              meaning: 'phòng ban',
              example: 'I work in the marketing department.'
            },
            {
              word: 'position',
              meaning: 'vị trí, chức vụ',
              example: 'She holds the position of senior manager.'
            },
            {
              word: 'supervisor',
              meaning: 'người giám sát',
              example: 'My supervisor is responsible for our team performance.'
            }
          ],
          phrases: [
            {
              phrase: `Nice to meet you. I'm in charge of marketing.`,
              meaning: 'Rất vui được gặp bạn. Tôi phụ trách mảng marketing.',
              usage: 'Dùng khi giới thiệu bản thân với đồng nghiệp mới'
            },
            {
              phrase: 'Let me introduce myself.',
              meaning: 'Hãy để tôi tự giới thiệu bản thân.',
              usage: 'Dùng khi bắt đầu giới thiệu bản thân trong cuộc họp'
            }
          ],
          activities: [
            {
              id: 1,
              title: 'Ghi âm giới thiệu bản thân',
              description: 'Ghi âm bản thân giới thiệu trong 1 phút và so sánh với bản mẫu',
              type: 'speaking'
            },
            {
              id: 2,
              title: 'Nghe đoạn hội thoại giới thiệu',
              description: 'Nghe đoạn hội thoại giữa các đồng nghiệp và trả lời câu hỏi',
              type: 'listening'
            }
          ]
        },
        {
          id: 2,
          title: 'Chào hỏi và hỏi thăm',
          description: 'Học cách chào hỏi đồng nghiệp và hỏi thăm trong môi trường công sở',
          vocabulary: [
            {
              word: 'greetings',
              meaning: 'lời chào hỏi',
              example: 'We exchanged greetings at the start of the meeting.'
            },
            {
              word: 'casual',
              meaning: 'thân mật, không trang trọng',
              example: 'The office has a casual atmosphere on Fridays.'
            }
          ],
          phrases: [
            {
              phrase: 'How was your weekend?',
              meaning: 'Cuối tuần của bạn thế nào?',
              usage: 'Dùng khi gặp đồng nghiệp vào đầu tuần'
            },
            {
              phrase: 'What have you been up to?',
              meaning: 'Bạn đã làm gì gần đây?',
              usage: 'Dùng để hỏi thăm đồng nghiệp về công việc hoặc cuộc sống'
            }
          ],
          activities: [
            {
              id: 3,
              title: 'Viết email chào buổi sáng',
              description: 'Viết email chào buổi sáng gửi đến đồng nghiệp',
              type: 'writing'
            },
            {
              id: 4,
              title: 'Luyện phản xạ chào hỏi',
              description: 'Tập phản xạ các cách chào hỏi khác nhau trong các tình huống',
              type: 'speaking'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Tuần 2: Công việc hàng ngày',
      description: 'Giao tiếp trong cuộc họp, đặt lịch và trình bày ý kiến một cách chuyên nghiệp',
      lessons: [
        {
          id: 3,
          title: 'Đặt và dời lịch họp',
          description: 'Học cách đặt lịch, dời lịch và quản lý thời gian trong công việc',
          vocabulary: [
            {
              word: 'schedule',
              meaning: 'lịch trình',
              example: 'I need to check my schedule before committing to the meeting.'
            },
            {
              word: 'appointment',
              meaning: 'cuộc hẹn',
              example: 'I have an appointment with the client at 2 PM.'
            }
          ],
          phrases: [
            {
              phrase: "Let's reschedule our meeting to Friday.",
              meaning: 'Hãy dời cuộc họp của chúng ta sang thứ Sáu.',
              usage: 'Dùng khi cần thay đổi lịch họp đã đặt'
            },
            {
              phrase: 'Are you available next Monday?',
              meaning: 'Bạn có rảnh vào thứ Hai tuần sau không?',
              usage: 'Dùng khi kiểm tra lịch trình của người khác'
            }
          ],
          activities: [
            {
              id: 5,
              title: 'Viết email dời lịch họp',
              description: 'Viết email dời lịch họp với lý do chuyên nghiệp',
              type: 'writing'
            },
            {
              id: 6,
              title: 'Mô phỏng cuộc gọi đặt lịch',
              description: 'Luyện tập mô phỏng cuộc gọi để đặt lịch với khách hàng',
              type: 'speaking'
            }
          ]
        }
      ]
    }
  ]);

  constructor() { }

  // Getter cho signal weekPlans
  public get weekPlans(): WeekPlan[] {
    return this._weekPlans();
  }

  // Lấy dữ liệu tuần học theo ID
  public getWeekPlanById(id: number): WeekPlan | undefined {
    return this.weekPlans.find(week => week.id === id);
  }

  // Lấy dữ liệu bài học theo ID
  public getLessonById(lessonId: number): Lesson | undefined {
    let foundLesson: Lesson | undefined;
    
    this.weekPlans.forEach(week => {
      const lesson = week.lessons.find(l => l.id === lessonId);
      if (lesson) {
        foundLesson = lesson;
      }
    });
    
    return foundLesson;
  }

  // Đánh dấu bài học đã hoàn thành
  public markLessonAsCompleted(lessonId: number): void {
    const updatedWeekPlans = this.weekPlans.map(week => {
      const updatedLessons = week.lessons.map(lesson => {
        if (lesson.id === lessonId) {
          return { ...lesson, completed: true };
        }
        return lesson;
      });
      
      return { ...week, lessons: updatedLessons };
    });
    
    this._weekPlans.set(updatedWeekPlans);
  }

  // Đánh dấu hoạt động đã hoàn thành
  public markActivityAsCompleted(lessonId: number, activityId: number): void {
    const updatedWeekPlans = this.weekPlans.map(week => {
      const updatedLessons = week.lessons.map(lesson => {
        if (lesson.id === lessonId) {
          const updatedActivities = lesson.activities.map(activity => {
            if (activity.id === activityId) {
              return { ...activity, completed: true };
            }
            return activity;
          });
          
          return { ...lesson, activities: updatedActivities };
        }
        return lesson;
      });
      
      return { ...week, lessons: updatedLessons };
    });
    
    this._weekPlans.set(updatedWeekPlans);
  }
}
