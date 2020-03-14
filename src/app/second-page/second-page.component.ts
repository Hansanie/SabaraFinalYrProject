import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Data } from '../../app/Data';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';

const UploadURL = 'http://localhost:3000/excelSheet/getPredicatedGrav';

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
  title = 'Upload a File';

  public uploader: FileUploader = new FileUploader({ url: UploadURL, itemAlias: 'files' });


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('FileUpload:item:', item);
      console.log('FileUpload:status:', status);
      console.log('FileUpload:response:', response);
      //  alert('File uploaded successfully');
      //  this.getData(response);
      console.log('data', JSON.stringify(response));
      ((response: Data[]) => {
        response.forEach(x => {
          this.User.push(x.gravity);
          this.Amount.push(x.time);
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
    };
  }
}