import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import config from '../../../config.js';
import { UserService } from 'src/app/user.service.js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  submitValue = 'submit';
  profileGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit = async () => {
    await this.userService.login(this.profileGroup.value);
    this.router.navigate(['/']);
    // this.http.post(config.baseURL + '/user/login', this.profileGroup.value ).subscribe((response: any) => {
    //   if (response.status === 'success') {
    //     console.log(response);
    //     localStorage.setItem('user', JSON.stringify(response.data));
    //     localStorage.setItem('token', response.token);
    //     this.router.navigate(['/']);
    //   } else {
    //     console.log(response);
    //   }
    // });
  }
  onSubmitRestaurant = () => {
    this.http.post(config.baseURL + '/login', this.profileGroup.value ).subscribe((response: any) => {
      if (response.status === 'success') {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      } else {
        console.log(response);
      }
    });
  }

  ngOnInit() {
  }

}
