import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import config from '../../../config';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  };
  userRestaurant = {
    name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: {
      address_line_1: '',
      address_line_2: '',
      address_city: '',
      address_state: '',
      address_zip: '',
      address_country_id: '',
    },
  };
  profileGroup = new FormGroup({
    username : new FormControl(this.user.username, [Validators.required,Validators.minLength(6)]),
    first_name : new FormControl(this.user.first_name, [Validators.required]),
    last_name : new FormControl(this.user.last_name, [Validators.required]),
    email : new FormControl(this.user.email, [Validators.required]),
    mobile : new FormControl(this.user.mobile, [Validators.required]),
    password : new FormControl(this.user.password, [Validators.required]),
    confirmPassword : new FormControl(this.user.confirmPassword, [Validators.required]),
  }, this.checkPasswords);
  address = new FormGroup({
    address_line_1: new FormControl(this.userRestaurant.address.address_line_1, [Validators.required]),
    address_line_2: new FormControl(this.userRestaurant.address.address_line_2),
    address_city: new FormControl(this.userRestaurant.address.address_city, [Validators.required]),
    address_state: new FormControl(this.userRestaurant.address.address_state, [Validators.required]),
    address_zip: new FormControl(this.userRestaurant.address.address_zip, [Validators.required]),
    address_country_id: new FormControl(this.userRestaurant.address.address_country_id, [Validators.required]),
  });
  profileGroupRestaurant = new FormGroup({
    name : new FormControl(this.userRestaurant.name, [Validators.required,Validators.minLength(6)]),
    last_name : new FormControl(this.userRestaurant.last_name, [Validators.required]),
    email : new FormControl(this.userRestaurant.email, [Validators.required]),
    phone : new FormControl(this.userRestaurant.phone, [Validators.required]),
    password : new FormControl(this.userRestaurant.password, [Validators.required]),
    confirmPassword : new FormControl(this.userRestaurant.confirmPassword, [Validators.required]),
    address:this.address
  }, this.checkPasswords);
  submitValue = 'Submit!';
  failedMessage= '';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers = () => {
    this.http.get(config.baseURL +  '/users')
        .subscribe(data => console.log(data));
  }
  onSubmit = () => {
    // if(this.profileGroup.value.password != this.profileGroup.value.confirmPassword)
    // {
    //   this.failedMessage = 'Passwords do not match';
    //   return;
    // }
    this.http.post(config.baseURL + '/user/register', this.profileGroup.value)
            .subscribe((response:any) => {
              if(response.status == 'success') {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']);
              } else {
                this.failedMessage = response.data;
              }
            });
  }
  onSubmitRestaurant = () => {
    // if(this.profileGroupRestaurant.value.password != this.profileGroupRestaurant.value.confirmPassword)
    // {
    //   this.failedMessage = 'Passwords do not match';
    //   return;
    // }
    this.http.post(config.baseURL + '/restaurant/register', this.profileGroupRestaurant.value)
            .subscribe((response:any) => {
              console.log(response.status);

              if(response.status == 'success') {
                localStorage.setItem('token', response.token);
                this.router.navigate(['/']);
              } else {
                this.failedMessage = response.data;
              }
            });
  }

  checkPasswords(group: FormGroup): {[key: string]: boolean} { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return {mismatch: pass != confirmPass};
  }

  getKeys = object => Object.keys(object);

}
