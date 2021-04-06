import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APICallerService } from '../service/apicaller.service';
import { RootscopeService } from '../service/rootscope.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

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
  pageOfItems: Array<any>;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false;
  public pieChartPlugins = [];

  constructor(private apicaller: APICallerService, private rootscope: RootscopeService) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

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
    this.rootscope.changeloaderComponent(true);
    let url = environment.siteURL + 'assets/transaction.json';
    this.apicaller.getCall(url).subscribe(data => {
      this.transactionList = data.response;
      let spend = data.spendPercentage;
      for(var i in spend){
        this.pieChartLabels.push(i);  
        this.pieChartData.push(spend[i]);       
      }
      setTimeout(() => {
        this.rootscope.changeloaderComponent(false); 
      }, 1000);     
    }, error => {
      console.log('Error');
      setTimeout(() => {
        this.rootscope.changeloaderComponent(false); 
      }, 1000);      
    })
  }
  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
}
}
