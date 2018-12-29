import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });
  submit = 'Submit';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.getKitties();
  }
  getKitties = () => {
    this.http.get('http://localhost:3000/getKitties')
        .subscribe(data => console.log(data));
  }
  onSubmit = () => {
    console.log(this.profileForm.value);
  }

}
