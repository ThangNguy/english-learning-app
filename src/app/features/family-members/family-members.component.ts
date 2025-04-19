import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  email: string;
  avatarUrl?: string;
  age?: number;
  color: string;
  level: number;
  points: number;
  completedTopics: number;
  streak: number;
  lastActive: Date;
}

@Component({
  selector: 'app-family-members',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  templateUrl: './family-members.component.html',
  styleUrls: ['./family-members.component.scss']
})
export class FamilyMembersComponent implements OnInit {
  public searchQuery = signal<string>('');
  public members = signal<FamilyMember[]>([]);
  public filteredMembers = signal<FamilyMember[]>([]);

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {
    // Trong ứng dụng thực tế, dữ liệu này sẽ được lấy từ một service
    const initialMembers: FamilyMember[] = [
      {
        id: 1,
        name: 'David Parker',
        role: 'Parent',
        email: 'david.parker@example.com',
        color: '#5C6BC0',
        level: 5,
        points: 1250,
        completedTopics: 8,
        streak: 12,
        lastActive: new Date(2023, 3, 15, 14, 30)
      },
      {
        id: 2,
        name: 'Emma Parker',
        role: 'Child',
        email: 'emma.parker@example.com',
        age: 12,
        color: '#EC407A',
        level: 7,
        points: 1420,
        completedTopics: 10,
        streak: 15,
        lastActive: new Date(2023, 3, 16, 16, 45)
      },
      {
        id: 3,
        name: 'Michael Parker',
        role: 'Child',
        email: 'michael.parker@example.com',
        age: 8,
        color: '#66BB6A',
        level: 3,
        points: 980,
        completedTopics: 6,
        streak: 7,
        lastActive: new Date(2023, 3, 16, 10, 15)
      },
      {
        id: 4,
        name: 'Sarah Parker',
        role: 'Parent',
        email: 'sarah.parker@example.com',
        color: '#FFA726',
        level: 4,
        points: 850,
        completedTopics: 5,
        streak: 5,
        lastActive: new Date(2023, 3, 14, 19, 30)
      }
    ];
    
    this.members.set(initialMembers);
    this.filteredMembers.set([...initialMembers]);
  }
  
  public onSearchChange(query: string): void {
    this.searchQuery.set(query);
    
    if (!query) {
      this.filteredMembers.set([...this.members()]);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = this.members().filter(member => 
      member.name.toLowerCase().includes(lowerQuery) || 
      member.email.toLowerCase().includes(lowerQuery) ||
      member.role.toLowerCase().includes(lowerQuery)
    );
    
    this.filteredMembers.set(filtered);
  }
  
  public openAddMemberDialog(): void {
    // Trong ứng dụng thực tế, sẽ mở một dialog để thêm thành viên mới
    console.log('Open add member dialog');
    // this._dialog.open(AddMemberDialogComponent, {
    //   width: '500px'
    // }).afterClosed().subscribe(result => {
    //   if (result) {
    //     const updatedMembers = [...this.members(), result];
    //     this.members.set(updatedMembers);
    //     this.onSearchChange(this.searchQuery());
    //   }
    // });
  }
  
  public editMember(member: FamilyMember): void {
    // Trong ứng dụng thực tế, sẽ mở một dialog để chỉnh sửa thành viên
    console.log('Edit member:', member);
  }
  
  public viewProgress(member: FamilyMember): void {
    // Trong ứng dụng thực tế, sẽ chuyển đến trang tiến độ của thành viên
    console.log('View progress for:', member);
  }
  
  public removeMember(member: FamilyMember): void {
    // Trong ứng dụng thực tế, sẽ hiển thị dialog xác nhận trước khi xóa
    console.log('Remove member:', member);
    // Cách triển khai có thể là:
    // const updatedMembers = this.members().filter(m => m.id !== member.id);
    // this.members.set(updatedMembers);
    // this.onSearchChange(this.searchQuery());
  }
  
  public sendReminder(member: FamilyMember): void {
    // Trong ứng dụng thực tế, sẽ gửi một thông báo nhắc nhở
    console.log('Send reminder to:', member);
  }
}
