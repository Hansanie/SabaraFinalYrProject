import {Component, AfterViewInit, OnInit} from '@angular/core';
// import * as Chart from 'chart.js'
import { Chart } from 'chart.js';  
import { HttpClient } from '@angular/common/http';  
import { Data } from '../../app/Data'; 

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit{
    // canvas: any;
    //   ctx: any;
    //   ngAfterViewInit() {
    //     this.canvas = document.getElementById('myChart');
    //     this.ctx = this.canvas.getContext('2d');
    //     let myChart = new Chart(this.ctx, {
    //       type: 'pie',
    //       data: {
    //           labels: ["New", "In Progress", "On Hold"],
    //           datasets: [{
    //               label: '# of Votes',
    //               data: [1,2,3],
    //               backgroundColor: [
    //                   'rgba(255, 99, 132, 1)',
    //                   'rgba(54, 162, 235, 1)',
    //                   'rgba(255, 206, 86, 1)'
    //               ],
    //               borderWidth: 1
    //           }]
    //       },
    //       options: {
    //         responsive: false,
    //         // display:true
    //       }
    //     });
    //   }
    url = 'http://localhost:3000/messages';  
  data: Data[];  
  User = [];  
  Amount = [];  
  Linechart: any = [];  

  constructor( private httpClient: HttpClient) {}
  ngOnInit(){
    this.httpClient.get(this.url).subscribe((result: Data[]) => {  
      result.forEach(x => {  
        this.User.push(x.username);  
        this.Amount.push(x.amount);  
      });  
      this  
      this.Linechart = new Chart('canvas', {  
        type: 'line',  
        data: {  
          labels: this.User,  
  
          datasets: [  
            {  
              data: this.Amount,  
              borderColor: '#3cb371',  
              backgroundColor: "",  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: false  
          },  
          scales: {  
            xAxes: [{  
              display: true  
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      });  
    });  
  }
    }