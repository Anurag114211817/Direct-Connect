import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private primaryLoader = new BehaviorSubject<boolean>(false);
  private secondaryLoader = new BehaviorSubject<boolean>(false);
  private tertiaryLoader = new BehaviorSubject<boolean>(false);

  public getPrimaryLoader$ = this.primaryLoader.asObservable();
  public getSecondaryLoader$ = this.secondaryLoader.asObservable();
  public getTertiaryLoader$ = this.tertiaryLoader.asObservable();

  constructor() {}

  showPrimaryLoader() {
    this.primaryLoader.next(true);
  }
  showSecondaryLoader() {
    this.secondaryLoader.next(true);
  }
  showTertiaryLoader() {
    this.tertiaryLoader.next(true);
  }
  hidePrimaryLoader() {
    this.primaryLoader.next(false);
  }
  hideSecondaryLoader() {
    this.secondaryLoader.next(false);
  }
  hideTertiaryLoader() {
    this.tertiaryLoader.next(false);
  }
}
