import { Injectable, signal } from '@angular/core';

export interface VocabularyItem {
  id: number;
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
  learned: boolean;
  category: string;
}

export interface PhraseItem {
  id: number;
  phrase: string;
  meaning: string;
  usage: string;
  learned: boolean;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  // Khai báo biến private với dấu gạch dưới theo quy tắc
  private readonly _vocabulary = signal<VocabularyItem[]>([
    {
      id: 1,
      word: 'department',
      meaning: 'phòng ban',
      example: 'I work in the marketing department.',
      pronunciation: '/dɪˈpɑːrtmənt/',
      learned: false,
      category: 'company structure'
    },
    {
      id: 2,
      word: 'position',
      meaning: 'vị trí, chức vụ',
      example: 'She holds the position of senior manager.',
      pronunciation: '/pəˈzɪʃn/',
      learned: false,
      category: 'company structure'
    },
    {
      id: 3,
      word: 'supervisor',
      meaning: 'người giám sát',
      example: 'My supervisor is responsible for our team performance.',
      pronunciation: '/ˈsuːpəˌvaɪzər/',
      learned: false,
      category: 'company structure'
    },
    {
      id: 4,
      word: 'schedule',
      meaning: 'lịch trình',
      example: 'I need to check my schedule before committing to the meeting.',
      pronunciation: '/ˈʃɛdjuːl/',
      learned: false,
      category: 'meetings'
    },
    {
      id: 5,
      word: 'appointment',
      meaning: 'cuộc hẹn',
      example: 'I have an appointment with the client at 2 PM.',
      pronunciation: '/əˈpɔɪntmənt/',
      learned: false,
      category: 'meetings'
    },
    {
      id: 6,
      word: 'deadline',
      meaning: 'hạn chót',
      example: 'We need to finish this project before the deadline.',
      pronunciation: '/ˈdɛdˌlaɪn/',
      learned: false,
      category: 'project management'
    },
    {
      id: 7,
      word: 'agenda',
      meaning: 'chương trình nghị sự',
      example: `I'll send you the meeting agenda by email.`,
      pronunciation: '/əˈdʒɛndə/',
      learned: false,
      category: 'meetings'
    },
    {
      id: 8,
      word: 'feedback',
      meaning: 'phản hồi',
      example: 'Could you give me some feedback on my presentation?',
      pronunciation: '/ˈfiːdbæk/',
      learned: false,
      category: 'communication'
    },
    {
      id: 9,
      word: 'proposal',
      meaning: 'đề xuất',
      example: 'We submitted our proposal to the client yesterday.',
      pronunciation: '/prəˈpoʊzəl/',
      learned: false,
      category: 'project management'
    },
    {
      id: 10,
      word: 'collaborate',
      meaning: 'hợp tác',
      example: 'Our teams need to collaborate on this project.',
      pronunciation: '/kəˈlæbəˌreɪt/',
      learned: false,
      category: 'teamwork'
    }
  ]);

  private readonly _phrases = signal<PhraseItem[]>([
    {
      id: 1,
      phrase: `Nice to meet you. I'm in charge of marketing.`,
      meaning: 'Rất vui được gặp bạn. Tôi phụ trách mảng marketing.',
      usage: 'Dùng khi giới thiệu bản thân với đồng nghiệp mới',
      learned: false,
      category: 'introduction'
    },
    {
      id: 2,
      phrase: 'Let me introduce myself.',
      meaning: 'Hãy để tôi tự giới thiệu bản thân.',
      usage: 'Dùng khi bắt đầu giới thiệu bản thân trong cuộc họp',
      learned: false,
      category: 'introduction'
    },
    {
      id: 3,
      phrase: 'How was your weekend?',
      meaning: 'Cuối tuần của bạn thế nào?',
      usage: 'Dùng khi gặp đồng nghiệp vào đầu tuần',
      learned: false,
      category: 'small talk'
    },
    {
      id: 4,
      phrase: 'What have you been up to?',
      meaning: 'Bạn đã làm gì gần đây?',
      usage: 'Dùng để hỏi thăm đồng nghiệp về công việc hoặc cuộc sống',
      learned: false,
      category: 'small talk'
    },
    {
      id: 5,
      phrase: "Let's reschedule our meeting to Friday.",
      meaning: 'Hãy dời cuộc họp của chúng ta sang thứ Sáu.',
      usage: 'Dùng khi cần thay đổi lịch họp đã đặt',
      learned: false,
      category: 'scheduling'
    },
    {
      id: 6,
      phrase: 'Are you available next Monday?',
      meaning: 'Bạn có rảnh vào thứ Hai tuần sau không?',
      usage: 'Dùng khi kiểm tra lịch trình của người khác',
      learned: false,
      category: 'scheduling'
    },
    {
      id: 7,
      phrase: 'I agree with your point.',
      meaning: 'Tôi đồng ý với quan điểm của bạn.',
      usage: 'Dùng khi thể hiện sự đồng tình trong cuộc họp',
      learned: false,
      category: 'meetings'
    },
    {
      id: 8,
      phrase: `I'd like to add something to that.`,
      meaning: 'Tôi muốn bổ sung thêm điều này.',
      usage: 'Dùng khi muốn thêm ý kiến vào cuộc thảo luận',
      learned: false,
      category: 'meetings'
    },
    {
      id: 9,
      phrase: 'Could you please send me the report?',
      meaning: 'Bạn có thể gửi cho tôi bản báo cáo được không?',
      usage: 'Dùng khi yêu cầu tài liệu một cách lịch sự',
      learned: false,
      category: 'email'
    },
    {
      id: 10,
      phrase: `I'm calling to follow up on the meeting.`,
      meaning: 'Tôi gọi để theo dõi tiến độ sau cuộc họp.',
      usage: 'Dùng khi gọi điện tiếp tục công việc sau cuộc họp',
      learned: false,
      category: 'phone calls'
    }
  ]);

  constructor() {
    // Khởi tạo dữ liệu từ localStorage nếu có
    this._initializeData();
  }

  // Getter cho các signal
  public get vocabulary(): VocabularyItem[] {
    return this._vocabulary();
  }

  public get phrases(): PhraseItem[] {
    return this._phrases();
  }

  // Khởi tạo dữ liệu
  private _initializeData(): void {
    const savedVocabulary = localStorage.getItem('vocabulary');
    if (savedVocabulary) {
      try {
        const parsedVocabulary = JSON.parse(savedVocabulary) as VocabularyItem[];
        this._vocabulary.set(parsedVocabulary);
      } catch (error) {
        console.error('Error parsing saved vocabulary', error);
      }
    }

    const savedPhrases = localStorage.getItem('phrases');
    if (savedPhrases) {
      try {
        const parsedPhrases = JSON.parse(savedPhrases) as PhraseItem[];
        this._phrases.set(parsedPhrases);
      } catch (error) {
        console.error('Error parsing saved phrases', error);
      }
    }
  }

  // Lưu dữ liệu vào localStorage
  private _saveData(): void {
    localStorage.setItem('vocabulary', JSON.stringify(this.vocabulary));
    localStorage.setItem('phrases', JSON.stringify(this.phrases));
  }

  // Đánh dấu từ vựng đã học
  public markVocabularyAsLearned(id: number, learned: boolean = true): void {
    const updatedVocabulary = this.vocabulary.map(item => {
      if (item.id === id) {
        return { ...item, learned };
      }
      return item;
    });
    
    this._vocabulary.set(updatedVocabulary);
    this._saveData();
  }

  // Đánh dấu mẫu câu đã học
  public markPhraseAsLearned(id: number, learned: boolean = true): void {
    const updatedPhrases = this.phrases.map(item => {
      if (item.id === id) {
        return { ...item, learned };
      }
      return item;
    });
    
    this._phrases.set(updatedPhrases);
    this._saveData();
  }

  // Lấy từ vựng theo danh mục
  public getVocabularyByCategory(category: string): VocabularyItem[] {
    return this.vocabulary.filter(item => item.category === category);
  }

  // Lấy mẫu câu theo danh mục
  public getPhrasesByCategory(category: string): PhraseItem[] {
    return this.phrases.filter(item => item.category === category);
  }

  // Lấy số từ vựng đã học
  public getLearnedVocabularyCount(): number {
    return this.vocabulary.filter(item => item.learned).length;
  }

  // Lấy số mẫu câu đã học
  public getLearnedPhrasesCount(): number {
    return this.phrases.filter(item => item.learned).length;
  }

  // Tìm kiếm từ vựng
  public searchVocabulary(query: string): VocabularyItem[] {
    const lowerCaseQuery = query.toLowerCase();
    return this.vocabulary.filter(item => 
      item.word.toLowerCase().includes(lowerCaseQuery) || 
      item.meaning.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Tìm kiếm mẫu câu
  public searchPhrases(query: string): PhraseItem[] {
    const lowerCaseQuery = query.toLowerCase();
    return this.phrases.filter(item => 
      item.phrase.toLowerCase().includes(lowerCaseQuery) || 
      item.meaning.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Thêm từ vựng mới
  public addVocabulary(vocabulary: Omit<VocabularyItem, 'id'>): void {
    const newId = this.vocabulary.length > 0 
      ? Math.max(...this.vocabulary.map(item => item.id)) + 1 
      : 1;
      
    const newVocabulary: VocabularyItem = {
      ...vocabulary,
      id: newId
    };
    
    this._vocabulary.set([...this.vocabulary, newVocabulary]);
    this._saveData();
  }

  // Thêm mẫu câu mới
  public addPhrase(phrase: Omit<PhraseItem, 'id'>): void {
    const newId = this.phrases.length > 0 
      ? Math.max(...this.phrases.map(item => item.id)) + 1 
      : 1;
      
    const newPhrase: PhraseItem = {
      ...phrase,
      id: newId
    };
    
    this._phrases.set([...this.phrases, newPhrase]);
    this._saveData();
  }
}
