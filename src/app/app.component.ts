import { ChangeDetectorRef, Component } from '@angular/core';
import { RootscopeService } from './service/rootscope.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading: boolean = false;

  constructor(private rootscope: RootscopeService, private cdRef : ChangeDetectorRef) {
    this.rootscope.loaderComponent$.subscribe( (data) => {
      this.isLoading = data;
      this.cdRef.detectChanges();
    })
  }
}
