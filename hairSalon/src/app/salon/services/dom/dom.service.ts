import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Injectable()
export class DomService implements OnDestroy {
  displayMobileMenu: boolean = false;
  displayFullScreen: boolean = false;
  imgSrc: string = '';
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.displayMobileMenu = false;
        this.displayFullScreen = false;
        document.body.style.overflow = 'auto';
        this.imgSrc = '';
        this.scrollToTop();
      });
  }

  toggleOverflow(bool: boolean): void {
    document.body.style.overflowY = bool ? 'hidden' : 'auto';
  }

  toggleMenu(): void {
    this.displayMobileMenu = !this.displayMobileMenu;
    this.toggleOverflow(this.displayMobileMenu);
  }

  fullScreenImg($evt: any) {
    this.imgSrc = $evt.src;
    this.displayFullScreen = true;
    this.toggleOverflow(this.displayFullScreen);
  }

  closeFullScreen(): void {
    this.displayFullScreen = false;
    this.toggleOverflow(this.displayFullScreen);
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {}
}
