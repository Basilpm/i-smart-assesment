import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APICallerService } from '../service/apicaller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  frequency: any = 'Current';
  month: any = '';
  category: any = 'Medical';
  last6monthsArray: any = [];
  transactionList: any = [];

  constructor(private apicaller: APICallerService) { }

  ngOnInit() {
    this.getLast6Months();
    this.month = this.last6monthsArray[0];
    this.getTransaction();
  }

  getLast6Months() {
    var m =['January','February','March','April','May','June','July','August','September','October','November','December'];
    var d = new Date()
    for(var i=0;i<6;i++){
      this.last6monthsArray[i] = m[d.getMonth()]+ ' - ' + d.getFullYear().toString()
      d.setMonth(d.getMonth()-1)
    }
    return this.last6monthsArray
  }

  getTransaction() {
    let url = environment.siteURL + 'assets/transaction.json';
    this.apicaller.getCall(url).subscribe(data => {
      this.transactionList = data.response;
      
    }, error => {
      console.log('Error');
      
    })
  }
}
