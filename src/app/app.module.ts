import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APICallerService } from './service/apicaller.service';
import { HttpClientModule } from '@angular/common/http';
import { RootscopeService } from './service/rootscope.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [APICallerService, RootscopeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
