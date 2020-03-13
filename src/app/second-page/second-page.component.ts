import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Data } from '../../app/Data';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  url = 'http://localhost:3000/excelSheet/getPredicatedGrav';
  data: Data[];
  User = [];
  Amount = [];
  Linechart: any = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // this.httpClient.get(this.url).subscribe((result: Data[]) => {
    //   result.forEach(x => {
    //     this.User.push(x.gravity);
    //     this.Amount.push(x.time);
    //   });
    //   this
    //   this.Linechart = new Chart('canvas', {
    //     type: 'line',
    //     data: {
    //       labels: this.User,

    //       datasets: [
    //         {
    //           data: this.Amount,
    //           borderColor: '#3cb371',
    //           backgroundColor: "",
    //         }
    //       ]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //       scales: {
    //         xAxes: [{
    //           display: true
    //         }],
    //         yAxes: [{
    //           display: true
    //         }],
    //       }
    //     }
    //   });
    // });
  }
}