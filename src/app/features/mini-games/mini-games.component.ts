import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface Game {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  timePerRound: number;
  points: number;
  players: string;
  instructions: string;
}

@Component({
  selector: 'app-mini-games',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './mini-games.component.html',
  styleUrls: ['./mini-games.component.scss']
})
export class MiniGamesComponent {
  public games = signal<Game[]>([
    {
      id: 1,
      name: 'Word Match',
      description: 'Match English words with their correct images',
      imageUrl: 'assets/games/word-match.png',
      type: 'Vocabulary',
      timePerRound: 2,
      points: 10,
      players: '1-4 players',
      instructions: 'Drag words to their matching images as fast as you can to earn points. Each correct match gives you 10 points.'
    },
    {
      id: 2,
      name: 'Listen & Choose',
      description: 'Listen to the pronunciation and select the correct word',
      imageUrl: 'assets/games/listen-choose.png',
      type: 'Pronunciation',
      timePerRound: 3,
      points: 15,
      players: '1-2 players',
      instructions: 'Listen carefully to the word being pronounced and choose the correct option from four choices.'
    },
    {
      id: 3,
      name: 'Word Race',
      description: 'Compete with family members to find the correct word first',
      imageUrl: 'assets/games/word-race.png',
      type: 'Multiplayer',
      timePerRound: 5,
      points: 20,
      players: '2-4 players',
      instructions: 'A word or image appears on screen. Tap it first to claim points. The player with the most points at the end wins.'
    },
    {
      id: 4,
      name: 'Fill in the Blanks',
      description: 'Complete sentences by filling in the missing words',
      imageUrl: 'assets/games/fill-blanks.png',
      type: 'Grammar',
      timePerRound: 4,
      points: 12,
      players: '1 player',
      instructions: 'Read the sentence and choose the correct word to fill in the blank. Points are awarded for each correct answer.'
    },
    {
      id: 5,
      name: 'Memory Cards',
      description: 'Find matching pairs of words and pictures',
      imageUrl: 'assets/games/memory-cards.png',
      type: 'Memory',
      timePerRound: 3,
      points: 8,
      players: '1-4 players',
      instructions: 'Flip cards to find matching word-picture pairs. Remember the locations to find matches faster!'
    },
    {
      id: 6,
      name: 'Spelling Bee',
      description: 'Listen and spell English words correctly',
      imageUrl: 'assets/games/spelling-bee.png',
      type: 'Spelling',
      timePerRound: 3,
      points: 15,
      players: '1 player',
      instructions: 'Listen to the word and type its correct spelling. Harder words give more points!'
    }
  ]);

  constructor(private _dialog: MatDialog, private _router: Router) {}

  public playGame(game: Game): void {
    console.log(`Starting game: ${game.name}`);
    // In a real application, you would navigate to the game screen
    // this._router.navigate(['/games', game.id]);
  }

  public showGameInfo(game: Game): void {
    // In a real application, you would open a dialog with game instructions
    console.log(`Game instructions for ${game.name}: ${game.instructions}`);
    // this._dialog.open(GameInstructionsComponent, {
    //   data: { game },
    //   width: '400px'
    // });
  }
}
