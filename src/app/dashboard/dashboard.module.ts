import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from './dashboard.component';
import { PaymentFormModule } from '../payment-form/payment-form.module';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    PaymentFormComponent
  ],
  imports: [
    BrowserModule,
    PaymentFormModule,
    JwPaginationModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
