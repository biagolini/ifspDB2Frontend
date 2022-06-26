import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenMonitorService {

  constructor(
    private breakpointObserver: BreakpointObserver,
    ) {
      breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
        Breakpoints.Handset,
        Breakpoints.Tablet,
        Breakpoints.Web,
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.WebPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.WebLandscape,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
    }

    destroyed = new Subject<void>();
    currentScreenSize!: string;    
    displayNameMap = new Map([
      [Breakpoints.XSmall, 'XSmall'],
      [Breakpoints.Small, 'Small'],
      [Breakpoints.Medium, 'Medium'],
      [Breakpoints.Large, 'Large'],
      [Breakpoints.XLarge, 'XLarge'],
      [Breakpoints.Handset, 'Handset'],
      [Breakpoints.Tablet, 'Tablet'],
      [Breakpoints.Web, 'Web'],
      [Breakpoints.HandsetPortrait, 'Handset'],
      [Breakpoints.TabletPortrait, 'Tablet'],
      [Breakpoints.WebPortrait, 'Web'],
      [Breakpoints.HandsetLandscape, 'Handset'],
      [Breakpoints.TabletLandscape, 'Tablet'],
      [Breakpoints.WebLandscape, 'Web'],
    ]);

    isDisplay(option: string){
      if(option==this.currentScreenSize) return true;
      else return false    
    }

    ngOnDestroy() {
      this.destroyed.next();
      this.destroyed.complete();
    }
      


}
