import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyService, VocabularyItem, PhraseItem } from '../../shared/services/vocabulary.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vocabulary.component.html',
  styleUrl: './vocabulary.component.scss'
})
export class VocabularyComponent implements OnInit {
  // Khai báo biến private với dấu gạch dưới theo quy tắc
  private readonly _vocabulary = signal<VocabularyItem[]>([]);
  private readonly _phrases = signal<PhraseItem[]>([]);
  private readonly _searchTerm = signal<string>('');
  private readonly _activeTab = signal<'vocabulary' | 'phrases'>('vocabulary');
  private readonly _selectedCategory = signal<string>('all');
  private readonly _vocabularyCategories = signal<string[]>([]);
  private readonly _phraseCategories = signal<string[]>([]);
  
  // Constructor với dependency injection
  constructor(
    private readonly _vocabularyService: VocabularyService
  ) {}
  
  // Getters cho các signal
  public get vocabulary(): VocabularyItem[] {
    return this._vocabulary();
  }
  
  public get phrases(): PhraseItem[] {
    return this._phrases();
  }
  
  public get searchTerm(): string {
    return this._searchTerm();
  }
  
  public set searchTerm(value: string) {
    this._searchTerm.set(value);
    this._filterItems();
  }
  
  public get activeTab(): 'vocabulary' | 'phrases' {
    return this._activeTab();
  }
  
  public get selectedCategory(): string {
    return this._selectedCategory();
  }
  
  public get vocabularyCategories(): string[] {
    return this._vocabularyCategories();
  }
  
  public get phraseCategories(): string[] {
    return this._phraseCategories();
  }
  
  // Lifecycle hook
  ngOnInit(): void {
    this._loadData();
  }
  
  // Phương thức cập nhật tab đang hiển thị
  public setActiveTab(tab: 'vocabulary' | 'phrases'): void {
    this._activeTab.set(tab);
    this._selectedCategory.set('all');
    this._filterItems();
  }
  
  // Phương thức cập nhật danh mục đang chọn
  public setCategory(category: string): void {
    this._selectedCategory.set(category);
    this._filterItems();
  }
  
  // Phương thức đánh dấu từ vựng đã học
  public toggleVocabularyLearned(id: number): void {
    const item = this.vocabulary.find(v => v.id === id);
    if (item) {
      this._vocabularyService.markVocabularyAsLearned(id, !item.learned);
      this._loadData();
    }
  }
  
  // Phương thức đánh dấu mẫu câu đã học
  public togglePhraseLearned(id: number): void {
    const item = this.phrases.find(p => p.id === id);
    if (item) {
      this._vocabularyService.markPhraseAsLearned(id, !item.learned);
      this._loadData();
    }
  }
  
  // Phương thức tải dữ liệu từ service
  private _loadData(): void {
    // Lấy từ vựng và mẫu câu
    const allVocabulary = this._vocabularyService.vocabulary;
    const allPhrases = this._vocabularyService.phrases;
    
    this._vocabulary.set(allVocabulary);
    this._phrases.set(allPhrases);
    
    // Lấy danh sách danh mục
    const vocabularyCategories = Array.from(
      new Set(allVocabulary.map(item => item.category))
    ).sort();
    
    const phraseCategories = Array.from(
      new Set(allPhrases.map(item => item.category))
    ).sort();
    
    this._vocabularyCategories.set(vocabularyCategories);
    this._phraseCategories.set(phraseCategories);
  }
  
  // Phương thức lọc từ vựng và mẫu câu theo tìm kiếm và danh mục
  private _filterItems(): void {
    const searchTerm = this.searchTerm.toLowerCase();
    const selectedCategory = this.selectedCategory;
    
    if (this.activeTab === 'vocabulary') {
      const allVocabulary = this._vocabularyService.vocabulary;
      
      const filteredVocabulary = allVocabulary.filter(item => {
        const matchesSearch = searchTerm 
          ? item.word.toLowerCase().includes(searchTerm) || 
            item.meaning.toLowerCase().includes(searchTerm)
          : true;
          
        const matchesCategory = selectedCategory === 'all' || 
          item.category === selectedCategory;
          
        return matchesSearch && matchesCategory;
      });
      
      this._vocabulary.set(filteredVocabulary);
    } else {
      const allPhrases = this._vocabularyService.phrases;
      
      const filteredPhrases = allPhrases.filter(item => {
        const matchesSearch = searchTerm 
          ? item.phrase.toLowerCase().includes(searchTerm) || 
            item.meaning.toLowerCase().includes(searchTerm)
          : true;
          
        const matchesCategory = selectedCategory === 'all' || 
          item.category === selectedCategory;
          
        return matchesSearch && matchesCategory;
      });
      
      this._phrases.set(filteredPhrases);
    }
  }
}
