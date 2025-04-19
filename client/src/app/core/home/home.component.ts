import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Sử dụng signal theo quy tắc số 5 trong editorconfig
  private readonly _title = signal<string>('Học Tiếng Anh Công Sở');
  private readonly _subtitle = signal<string>('Lộ trình 30 ngày');
  
  // Getter cho các signal
  public get title(): string {
    return this._title();
  }
  
  public get subtitle(): string {
    return this._subtitle();
  }
}
