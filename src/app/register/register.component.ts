import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getKitties();
  }
  getKitties = () => {
    this.http.get('http://localhost:3000/getKitties')
        .subscribe(data => console.log(data));
  }

}
