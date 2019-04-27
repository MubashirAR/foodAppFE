import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { DataSharingService } from '../data-sharing.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var google;
import config from '../../config.js';
import { UserService } from '../user.service';
import { RestaurantService } from '../restaurant.service';
@Component({
  selector: 'restaurant/[id=idname]',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss',  './resume.css']
})

export class RestaurantDetailsComponent {
  item: {name: string};
  restaurant: any;
  cart: any;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private userService: UserService,
    private restaurantService: RestaurantService
    ) {
      this.route = route;
      this.httpClient = httpClient;
      this.cart = {
        restaurant_id: this.route.snapshot.paramMap.get('id'),
        items: []
      };
    }

  ngAfterViewInit() {
    this.getMenu();
    this.getCart();
  }
  getMenu = async () => {
    const id = this.route.snapshot.paramMap.get('id');
    this.restaurant = await this.restaurantService.getMenu(id);
  }
  addToCart = (foodItem) => {
    const { _id } = JSON.parse(localStorage.getItem('user'));
    this.userService.addToCart(foodItem, this.cart, _id);
  }
  removeFromCart = (foodItem) => {
    const { _id } = JSON.parse(localStorage.getItem('user'));
    this.userService.removeFromCart(foodItem, this.cart, _id);
  }
  getCart = async() => {
    const { _id } = JSON.parse(localStorage.getItem('user'));
    this.cart = await this.userService.getCart(_id);
  }

}
