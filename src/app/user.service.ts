import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient;

  constructor(http: HttpClient, private router: Router) {
    this.http = http;
    this.router = router;
  }

  login = (data) => {
    return new Promise((resolve, reject) => {
      this.http.post(config.baseURL + '/user/login', data ).subscribe((response: any) => {
        if (response.status === 'success') {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.token);
          resolve(response);
          // this.router.navigate(['/']);
        } else {
          reject(response);
        }
      });
    });
  }

  // Cart services
  getCart = (user_id) => {
    return new Promise((resolve, reject) => {
      this.http.get(config.baseURL + '/user', {params: {user_id}} ).subscribe((response: any) => {
        if (response.status === 'success') {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.token);
          resolve(response.data.cart);
          console.log(response);

          // this.router.navigate(['/']);
        } else {
          reject(response);
        }
      });
    });
  }

  addToCart = (foodItem, cart, user_id) => {
    let index = cart['items'].findIndex(item => item._id === foodItem._id);
    if (index === -1) {
      cart['items'].push({...foodItem});
      index = 0;
    }
    cart['items'][index]['quantity']++;

    this
      .http
      .post(`${config.baseURL}/user/cart`,
      {user_id, cart})
      .subscribe((response: any) => {
        if (response.status === 'success') {
          console.log(response);
        }

      });
  }

  removeFromCart = (foodItem, cart, user_id) => {
    let index = cart['items'].findIndex(item => item._id === foodItem._id);
    if (index !== -1) {
      cart['items'][index]['quantity']--;
    }
    if(cart['items'][index]['quantity'] === 0)
    {
      cart['items'].splice(index, 1);
    }

    this
      .http
      .post(`${config.baseURL}/user/cart`,
      {user_id, cart})
      .subscribe((response: any) => {
        if (response.status === 'success') {
          console.log(response);
        }

      });
  }
}
