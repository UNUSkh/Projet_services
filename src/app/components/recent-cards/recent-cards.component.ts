import { Component, Input } from '@angular/core';


export interface NewsItem {
  title: string;
  description?: string;
  image?: string;
  url: string;
  category?: string;
  published_at: string;
}

@Component({
  selector: 'app-recent-cards',
  templateUrl: './recent-cards.component.html',
  styleUrl: './recent-cards.component.css'
})
export class RecentCardsComponent {
      @Input() newsItem!: NewsItem;
      @Input() size: 'small' | 'medium' | 'large' = 'medium';
      @Input() showExcerpt = true;
    
      get formattedDate(): string {
        if (!this.newsItem?.published_at) return '';
        return new Date(this.newsItem.published_at).toLocaleDateString('fr-FR');
      }
    
      truncateTitle(title: string): string {
        if (!title) return '';
        const maxLength = this.size === 'small' ? 60 : 100;
        return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
      }
    
      truncateDescription(description: string): string {
        if (!description) return '';
        const maxLength = this.size === 'small' ? 80 : this.size === 'medium' ? 120 : 200;
        return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
      }
    
      getImageUrl(): string {
        return this.newsItem.image || 'assets/default.png';
      }
    
      getCategoryDisplay(): string {
        if (!this.newsItem.category) return 'General';
    
        const categories: { [key: string]: string } = {
          'general': 'Général',
          'business': 'Business',
          'entertainment': 'Divertissement',
          'health': 'Santé',
          'science': 'Science',
          'sports': 'Sport',
          'technology': 'Technologies'
        };
    
        return categories[this.newsItem.category] || this.newsItem.category;
      }
}
