import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

interface GameWord {
  id: number;
  english: string;
  vietnamese: string;
  imageUrl: string;
  audioUrl: string;
  isMatched: boolean;
}

interface GameLevel {
  id: number;
  name: string;
  timeLimit: number;
  wordCount: number;
  difficulty: string;
}

@Component({
  selector: 'app-word-match-game',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  templateUrl: './word-match-game.component.html',
  styleUrls: ['./word-match-game.component.scss']
})
export class WordMatchGameComponent implements OnInit {
  public gameWords = signal<GameWord[]>([]);
  public wordList = signal<{id: number, text: string}[]>([]);
  public imageList = signal<{id: number, imageUrl: string}[]>([]);
  public score = signal<number>(0);
  public timeLeft = signal<number>(0);
  public maxTime = signal<number>(0);
  public gameLevel = signal<GameLevel | null>(null);
  public isGameStarted = signal<boolean>(false);
  public isGameOver = signal<boolean>(false);
  public matchedCount = signal<number>(0);
  public totalWords = signal<number>(0);
  
  private _timer: any;
  private _audioPlayer: HTMLAudioElement | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const levelId = +params['levelId'] || 1;
      this._loadGameLevel(levelId);
    });
    
    this._audioPlayer = new Audio();
  }
  
  private _loadGameLevel(levelId: number): void {
    // Trong ứng dụng thực tế, dữ liệu này sẽ được lấy từ một service
    const level: GameLevel = {
      id: levelId,
      name: `Level ${levelId}`,
      timeLimit: 120, // 2 phút
      wordCount: 8,
      difficulty: levelId <= 2 ? 'Beginner' : levelId <= 4 ? 'Intermediate' : 'Advanced'
    };
    
    this.gameLevel.set(level);
    this.maxTime.set(level.timeLimit);
    
    // Mock data cho trò chơi
    const mockWords: GameWord[] = [
      {
        id: 1,
        english: 'Dog',
        vietnamese: 'Con chó',
        imageUrl: 'assets/words/animals/dog.jpg',
        audioUrl: 'assets/audio/animals/dog.mp3',
        isMatched: false
      },
      {
        id: 2,
        english: 'Cat',
        vietnamese: 'Con mèo',
        imageUrl: 'assets/words/animals/cat.jpg',
        audioUrl: 'assets/audio/animals/cat.mp3',
        isMatched: false
      },
      {
        id: 3,
        english: 'Bird',
        vietnamese: 'Con chim',
        imageUrl: 'assets/words/animals/bird.jpg',
        audioUrl: 'assets/audio/animals/bird.mp3',
        isMatched: false
      },
      {
        id: 4,
        english: 'Fish',
        vietnamese: 'Con cá',
        imageUrl: 'assets/words/animals/fish.jpg',
        audioUrl: 'assets/audio/animals/fish.mp3',
        isMatched: false
      },
      {
        id: 5,
        english: 'Elephant',
        vietnamese: 'Con voi',
        imageUrl: 'assets/words/animals/elephant.jpg',
        audioUrl: 'assets/audio/animals/elephant.mp3',
        isMatched: false
      },
      {
        id: 6,
        english: 'Lion',
        vietnamese: 'Con sư tử',
        imageUrl: 'assets/words/animals/lion.jpg',
        audioUrl: 'assets/audio/animals/lion.mp3',
        isMatched: false
      },
      {
        id: 7,
        english: 'Tiger',
        vietnamese: 'Con hổ',
        imageUrl: 'assets/words/animals/tiger.jpg',
        audioUrl: 'assets/audio/animals/tiger.mp3',
        isMatched: false
      },
      {
        id: 8,
        english: 'Monkey',
        vietnamese: 'Con khỉ',
        imageUrl: 'assets/words/animals/monkey.jpg',
        audioUrl: 'assets/audio/animals/monkey.mp3',
        isMatched: false
      }
    ];
    
    // Giới hạn số lượng từ theo level
    const gameWords = mockWords.slice(0, level.wordCount);
    this.gameWords.set(gameWords);
    this.totalWords.set(gameWords.length);
    
    // Khởi tạo danh sách từ và hình ảnh cho trò chơi
    const words = gameWords.map(word => ({ id: word.id, text: word.english }));
    const images = gameWords.map(word => ({ id: word.id, imageUrl: word.imageUrl }));
    
    // Trộn ngẫu nhiên mảng
    this.wordList.set(this._shuffleArray([...words]));
    this.imageList.set(this._shuffleArray([...images]));
  }
  
  private _shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  public startGame(): void {
    this.isGameStarted.set(true);
    this.isGameOver.set(false);
    this.score.set(0);
    this.matchedCount.set(0);
    this.timeLeft.set(this.maxTime());
    
    this._timer = setInterval(() => {
      const currentTime = this.timeLeft();
      if (currentTime <= 0) {
        this._endGame();
      } else {
        this.timeLeft.set(currentTime - 1);
      }
    }, 1000);
  }
  
  private _endGame(): void {
    clearInterval(this._timer);
    this.isGameOver.set(true);
    
    if (this.matchedCount() === this.totalWords()) {
      this._playSuccessSound();
      // Hiển thị dialog thành công và điểm số
    } else {
      this._playFailureSound();
      // Hiển thị dialog thất bại và điểm số
    }
  }
  
  private _playSuccessSound(): void {
    if (this._audioPlayer) {
      this._audioPlayer.src = 'assets/audio/success.mp3';
      this._audioPlayer.play();
    }
  }
  
  private _playFailureSound(): void {
    if (this._audioPlayer) {
      this._audioPlayer.src = 'assets/audio/failure.mp3';
      this._audioPlayer.play();
    }
  }
  
  public onWordDropped(event: CdkDragDrop<{id: number, text?: string, imageUrl?: string}[]>): void {
    if (event.previousContainer === event.container) {
      // Nếu kéo trong cùng container, chỉ thay đổi vị trí
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Nếu kéo từ container này sang container khác
      // Lấy item được kéo
      const draggedItem = event.previousContainer.data[event.previousIndex];
      const targetItem = event.container.data[event.currentIndex];
      
      // Kiểm tra xem có phải là từ đúng không (word.id phải trùng với image.id)
      if (draggedItem.id === targetItem.id) {
        // Đúng - tăng điểm và đánh dấu là đã ghép
        this._handleCorrectMatch(draggedItem.id);
      } else {
        // Sai - hiển thị thông báo
        this._handleWrongMatch();
      }
    }
  }
  
  private _handleCorrectMatch(wordId: number): void {
    // Tăng điểm
    this.score.update(score => score + 10);
    
    // Đánh dấu từ là đã ghép
    const updatedWords = this.gameWords().map(word => {
      if (word.id === wordId) {
        return { ...word, isMatched: true };
      }
      return word;
    });
    this.gameWords.set(updatedWords);
    
    // Cập nhật số lượng từ đã ghép
    this.matchedCount.update(count => count + 1);
    
    // Kiểm tra xem đã ghép hết chưa
    if (this.matchedCount() === this.totalWords()) {
      // Nếu đã ghép hết, kết thúc trò chơi
      this._endGame();
    }
    
    // Hiển thị thông báo thành công
    this._snackBar.open('Correct match! +10 points', 'Close', {
      duration: 2000,
      panelClass: 'success-snackbar'
    });
  }
  
  private _handleWrongMatch(): void {
    // Trừ điểm
    this.score.update(score => Math.max(0, score - 5));
    
    // Hiển thị thông báo thất bại
    this._snackBar.open('Wrong match! -5 points', 'Close', {
      duration: 2000,
      panelClass: 'error-snackbar'
    });
  }
  
  public playWordAudio(wordId: number): void {
    const word = this.gameWords().find(w => w.id === wordId);
    if (word && this._audioPlayer) {
      this._audioPlayer.src = word.audioUrl;
      this._audioPlayer.play();
    }
  }
  
  public restartGame(): void {
    // Reset trò chơi
    clearInterval(this._timer);
    this._loadGameLevel(this.gameLevel()?.id || 1);
    this.startGame();
  }
  
  public goToNextLevel(): void {
    // Đi đến level tiếp theo
    const nextLevelId = (this.gameLevel()?.id || 1) + 1;
    this._router.navigate(['/games', 'word-match', nextLevelId]);
  }
  
  public exitGame(): void {
    // Quay lại trang danh sách game
    this._router.navigate(['/mini-games']);
  }
  
  ngOnDestroy(): void {
    // Dọn dẹp khi component bị hủy
    if (this._timer) {
      clearInterval(this._timer);
    }
  }
}