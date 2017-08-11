import { Injectable } from '@angular/core';
import { WindowRef } from './window_ref.service';

@Injectable()
export class AnalyticTool {
 
  private window: any;

  constructor(private windowService: WindowRef) { 
    this.window = windowService.nativeWindow; 
  };

  //        /runes
  trackPage(path: any): any {
    return this.window.ga("send", "pageview", path);
  };

  //'link', 'click', {eventCategory: 'link', eventAction: 'click', eventValue: 'searchRunewords'}
  trackEvent(options: any): any{
    return this.window.ga("send", "event", options);
  };

}