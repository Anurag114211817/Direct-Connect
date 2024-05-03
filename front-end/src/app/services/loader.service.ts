import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderType } from '../dto/loaderDto';

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

  showLoader(loaderType: LoaderType) {
    switch (loaderType) {
      case 'primary':
        this.primaryLoader.next(true);
        break;
      case 'secondary':
        this.secondaryLoader.next(true);
        break;
      case 'tertiary':
        this.tertiaryLoader.next(true);
        break;
      default:
        break;
    }
  }

  hideLoader(loaderType: LoaderType) {
    switch (loaderType) {
      case 'primary':
        this.primaryLoader.next(false);
        break;
      case 'secondary':
        this.secondaryLoader.next(false);
        break;
      case 'tertiary':
        this.tertiaryLoader.next(false);
        break;
      default:
        break;
    }
  }
}
