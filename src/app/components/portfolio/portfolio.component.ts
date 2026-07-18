import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface StatItem {
  channel: string;
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  category: string[];
  animatedValue: number;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements AfterViewInit {
  filters: string[] = ['All', 'Social Media', 'Reach', 'Paid Ads'];
  activeFilter: string = 'All';

  // Curated, anonymized highlights derived from a single featured client's
  // real analytics across a multi-month engagement. No client-identifying
  // details are included.
  // prefix/suffix let the count-up render correctly at every intermediate
  // frame (e.g. "+" and "%" stay fixed while the number climbs).
  stats: StatItem[] = [
    {
      channel: 'Social Media',
      value: 921,
      prefix: '',
      suffix: 'K+',
      label: 'Peak 90-day reel views for one client',
      category: ['Social Media'],
      animatedValue: 0
    },
    {
      channel: 'Reach',
      value: 413,
      prefix: '',
      suffix: 'K+',
      label: 'Accounts reached in a single 90-day window',
      category: ['Reach'],
      animatedValue: 0
    },
    {
      channel: 'Paid Ads',
      value: 6151,
      prefix: '+',
      suffix: '%',
      label: 'Month-over-month growth in accounts reached',
      category: ['Paid Ads'],
      animatedValue: 0
    },
    {
      channel: 'Reach',
      value: 45601,
      prefix: '+',
      suffix: '%',
      label: 'Peak growth in accounts reached, single window',
      category: ['Reach'],
      animatedValue: 0
    },
    {
      channel: 'Social Media',
      value: 642,
      prefix: '+',
      suffix: '',
      label: 'Net new followers gained organically in 90 days',
      category: ['Social Media'],
      animatedValue: 0
    }
  ];

  private hasAnimated = false;

  get filteredStats(): StatItem[] {
    if (this.activeFilter === 'All') return this.stats;
    return this.stats.filter(s => s.category.includes(this.activeFilter));
  }

  constructor(private el: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  setFilter(f: string) {
    this.activeFilter = f;
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Growth chart line-draw animation
    const line = this.el.nativeElement.querySelector('.growth-chart__line');
    if (line && 'IntersectionObserver' in window) {
      const length = line.getTotalLength();
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;

      const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            line.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)';
            line.style.strokeDashoffset = '0';
            chartObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      chartObserver.observe(this.el.nativeElement.querySelector('.growth-chart'));
    }

    // Stat count-up animation, triggered once when the stat grid scrolls into view
    if ('IntersectionObserver' in window) {
      const statGrid = this.el.nativeElement.querySelector('.stat-grid');
      if (statGrid) {
        const statObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true;
              this.animateStats();
              statObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.3 });
        statObserver.observe(statGrid);
      }
    }
  }

  private animateStats() {
    const duration = 1800;
    const start = performance.now();
    const targets = this.stats.map(s => s.value);

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for a natural deceleration into the final number
      const eased = 1 - Math.pow(1 - progress, 3);

      this.stats.forEach((stat, i) => {
        stat.animatedValue = Math.round(targets[i] * eased);
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.stats.forEach((stat, i) => {
          stat.animatedValue = targets[i];
        });
      }
    };

    requestAnimationFrame(step);
  }
}
