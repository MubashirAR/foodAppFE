import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileGroup = new FormGroup({
    username : new FormControl(''),
    first_name : new FormControl(''),
    last_name : new FormControl(''),
    email : new FormControl(''),
    mobile : new FormControl(''),
    password : new FormControl(''),
  });
  submitValue = 'Submit!';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers = () => {
    this.http.get('http://localhost:3000/users')
        .subscribe(data => console.log(data));
  }
  onSubmit = () => {
    this.http.post('http://localhost:3000/registerUser', this.profileGroup.value)
            .subscribe(data => console.log(data));
  }

}
