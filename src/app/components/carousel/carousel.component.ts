import { Component, Input, OnInit, OnDestroy } from '@angular/core';

export interface NewsItem {
  title: string;
  description?: string;
  image?: string;
  url: string;
  category?: string;
  published_at: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() newsItems: NewsItem[] = []; // List of news items for the carousel
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showExcerpt = true;

  currentIndex: number = 0; // Start at the first item

  private intervalId: any; // Variable to store interval ID for cleanup

  ngOnInit() {
    // Automatically move to the next slide every 3 seconds
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // 3000ms = 3 seconds
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Move to the next slide in the carousel
  nextSlide() {
    if (this.currentIndex < this.newsItems.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first item
    }
  }

  // Move to the previous slide in the carousel
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.newsItems.length - 1; // Loop back to the last item
    }
  }

  // Get the formatted date for each news item (using the currentIndex)
  get formattedDate(): string {
    const currentNewsItem = this.newsItems[this.currentIndex];
    if (!currentNewsItem?.published_at) return '';
    return new Date(currentNewsItem.published_at).toLocaleDateString('fr-FR');
  }

  // Truncate the title based on the card size (using the currentIndex)
  truncateTitle(title: string): string {
    if (!title) return '';
    const maxLength = this.size === 'small' ? 60 : 100;
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  }

  // Truncate the description based on the card size (using the currentIndex)
  truncateDescription(description?: string): string {
    if (!description) return '';
    const maxLength = this.size === 'small' ? 80 : this.size === 'medium' ? 120 : 200;
    return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
  }

  // Get the image URL or default image if not available (using the currentIndex)
  getImageUrl(): string {
    const currentNewsItem = this.newsItems[this.currentIndex];
    return currentNewsItem.image || 'assets/default.png';
  }

  // Get the category display name for the news item (using the currentIndex)
  getCategoryDisplay(): string {
    const currentNewsItem = this.newsItems[this.currentIndex];
    if (!currentNewsItem.category) return 'General';

    const categories: { [key: string]: string } = {
      'general': 'Général',
      'business': 'Business',
      'entertainment': 'Divertissement',
      'health': 'Santé',
      'science': 'Science',
      'sports': 'Sport',
      'technology': 'Technologies'
    };

    return categories[currentNewsItem.category] || currentNewsItem.category;
  }
}
