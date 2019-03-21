import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  address = new FormGroup({
    address_line_1: new FormControl(''),
    address_line_2: new FormControl(''),
    address_city: new FormControl(''),
    address_state: new FormControl(''),
    address_zip: new FormControl(''),
    address_country_id: new FormControl(''),
  })
  profileGroupRestaurant = new FormGroup({
    name : new FormControl(''),
    last_name : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl(''),
    password : new FormControl(''),
    address:this.address
  });
  submitValue = 'Submit!';
  failedMessage= '';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers = () => {
    this.http.get('http://localhost:3000/users')
        .subscribe(data => console.log(data));
  }
  onSubmit = () => {
    this.http.post('http://localhost:3000/registerUser', this.profileGroup.value)
            .subscribe((response:any) => {
              if(response.data.status == 'success') {
                localStorage.setItem('userID', response.data._id);
                this.router.navigate(['/']);
              } else {
                this.failedMessage = response.data;
              }
            });
  }
  onSubmitRestaurant = () => {
    console.log("testttt");
    this.http.post('http://localhost:3000/registerRestaurant', this.profileGroupRestaurant.value)
            .subscribe((response:any) => {
              if(response.data.status == 'success') {
                localStorage.setItem('userID', response.data._id);
                this.router.navigate(['/']);
              } else {
                this.failedMessage = response.data;
              }
            });
  }

}
