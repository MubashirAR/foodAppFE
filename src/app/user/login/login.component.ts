import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  submitValue = 'submit';
  profileGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit = () => {this.http.get('http://localhost:3000/user', { params: this.profileGroup.value }).subscribe(
    (response: any) => {
      if (response.status === 'success') {
        localStorage.setItem('userID', response.data._id);
        this.router.navigate(['/']);
      } else {
        console.log('failure');
      }
    }); }

  ngOnInit() {
  }

}
