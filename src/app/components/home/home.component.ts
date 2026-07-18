import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Animate the hero pulse line drawing in on load
    const line = this.el.nativeElement.querySelector('.pulse-graph__line');
    if (line) {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;
      requestAnimationFrame(() => {
        line.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
        line.style.strokeDashoffset = '0';
      });
    }

    // Reveal-on-scroll for why-choose-us cards
    if ('IntersectionObserver' in window) {
      const cards: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.why__card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('reveal'), index * 100);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      cards.forEach(card => observer.observe(card));
    }
  }
}
