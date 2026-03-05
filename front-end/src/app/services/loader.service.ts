import { Injectable, signal } from '@angular/core';
import { LoaderType } from '../dto/loader.dto';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loaders = {
    primary: signal<boolean>(false),
    secondary: signal<boolean>(false),
    tertiary: signal<boolean>(false),
  };

  public getLoader(type: LoaderType) {
    return this.loaders[type].asReadonly();
  }

  showLoader(loaderType: LoaderType) {
    this.loaders[loaderType].set(true);
  }

  hideLoader(loaderType: LoaderType) {
    this.loaders[loaderType].set(false);
  }
}
