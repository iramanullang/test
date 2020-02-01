import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/app.service';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';



@Component({
  selector: 'app-detailsalesman',
  templateUrl: './detailsalesman.component.html',
  styleUrls: ['./detailsalesman.component.scss']
})

export class DetailsalesmanComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabelsTotalOrderAmount = [];
  public barChartLabelsTotalOrderCount = [];
  public barChartLabelsTotalQuantity = [];
  public barChartLabelsTotalQuantityString = [];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartDataTotalOrderAmount: ChartDataSets[];
  public barChartDataTotalOrderCount: ChartDataSets[];
  public barChartDataTotalQuantity: ChartDataSets[];
  public barChartDataTotalQuantityString: ChartDataSets[];

  // deklarasi variable
  public salesman: any;
  public id: string;

  public detailsalesman() {
  }

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // log the value of id
      this.id = params['id'];
      this.getDetailsalesman();
    });
  }

  getDetailsalesman() {
    // untuk menampilkan detail salesman
    this.employeeService.get(this.id)
      .subscribe(
        data => {
          this.salesman = data;
        },
        err => console.error(err),
      );

    this.employeeService.EmployeeGetPerformanceId(this.id)
      .subscribe(
        data => {
          // console.log(data);
          this.salesman = { ...this.salesman, ...data };

          // TotalOrderAmount
          const listDataTotalOrderAmount = [];
          this.salesman.Top5Customer.forEach(customer => {
            this.barChartLabelsTotalOrderAmount.push(customer.Code);
            listDataTotalOrderAmount.push(Math.round((customer.TotalOrderAmount / 1000000000) * 100) / 100);
          });
          // buang yang pertama, karena data jelek
          // this.barChartLabelsTotalOrderAmount.shift();
          // this.barChartLabelsTotalOrderAmount.shift();
          // listDataTotalOrderAmount.shift();
          // listDataTotalOrderAmount.shift();
          this.barChartDataTotalOrderAmount = [
            { data: listDataTotalOrderAmount, label: 'Total Order Amount (Billion)' },
          ];

          // TotalOrderCount
          const listDataTotalOrderCount = [];
          this.salesman.Top5CustomerByCount.forEach(customer => {
            this.barChartLabelsTotalOrderCount.push(customer.Code);
            listDataTotalOrderCount.push(Math.round(customer.TotalOrderCount));
          });
          this.barChartDataTotalOrderCount = [
            { data: listDataTotalOrderCount, label: 'Total Order Count' },
          ];

          // TotalQuantity
          const listDataTotalQuantity = [];
          this.salesman.Top5Product.forEach(product => {
            this.barChartLabelsTotalQuantity.push(product.Code);
            listDataTotalQuantity.push(Math.round(product.TotalQuantity));
          });
          this.barChartDataTotalQuantity = [
            { data: listDataTotalQuantity, label: 'Total Quantity' },
          ];
        },
        err => console.error(err),
      );
  }

}
