import config from '../config.js';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getMenu = (restaurant_id) => {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(config.baseURL + '/restaurant', {params: {id: restaurant_id}})
        .subscribe((response: any) =>
        {
          if (response.status === 'success') {
            resolve(response.data);
          } else {
            reject(response);
          }
        });
    })
  }
}
