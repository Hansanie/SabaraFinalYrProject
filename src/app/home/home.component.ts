import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  files: Array < File > ;
  // files: File;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {

    }

    fileChange(element) {
      console.log("elemente",element);
      console.log("el", element.target.files);
        this.files = element.target.files;
        console.log("elemente", this.files);
    }

    upload() {
        let formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
            formData.append("files[]", this.files[i], this.files[i].name);
        }
        this.http.post('http://localhost:3000/excelSheet/postExcelSheet', formData)
            .subscribe((response) => {
                console.log('response received is ', response);
            })
    }

}
