import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";


@Injectable()

export class RootscopeService {
  constructor() { }
  
  private loaderComponentSource = new Subject<any>();
  loaderComponent$ = this.loaderComponentSource.asObservable();
  
  changeloaderComponent(component: any) {
    this.loaderComponentSource.next(component);
  }
}
