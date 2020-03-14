import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Data } from '../../app/Data';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { ParsedResponseHeaders } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload';

const UploadURL = 'http://localhost:3000/excelSheet/getPredicatedGrav';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

  data: Data[];
  time_data: any[];
  dateTimeArr: Array<any> = [];
  grav: any[];
  timeArr: Array<any> = [];
  Linechart: any = [];
  show = false;
  title = 'Upload a File';

  public uploader: FileUploader = new FileUploader({ url: UploadURL, itemAlias: 'files' });


  constructor() { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:item:', item);
      console.log('FileUpload:status:', status);
      console.log('FileUpload:response:', JSON.parse(response));
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data1 = JSON.parse(response); //success server response
    this.data = data1.jsonData;
    console.log('JSON type data', this.data);
    this.drawLineChart(data1);
  }

  drawLineChart(data1) {
    this.grav = data1.gravData;
    this.time_data = data1.timeData;
    this.dateTimeArr = data1.timeData;
    console.log('dateTimeArr length', this.dateTimeArr.length);

    for (let x = 0; x < this.dateTimeArr.length; x++) {
      console.log('data', this.dateTimeArr[x]);
      console.log('count', x);
      let a = (((this.dateTimeArr[x]).toString()).split('T'));
      this.timeArr[x] = a[1];
    }

    console.log('gravity list', this.grav);
    console.log('time list', this.time_data);
    console.log('time array', this.timeArr);

    this.show = true;

    this.Linechart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.timeArr,
        datasets: [
          {
            data: this.time_data,
            borderColor: "#3cba9f",
            fill: false
          },
          {
            data: this.grav,
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Predicated Gravity'
            }
          }],
        }
      }
    });
  }
}