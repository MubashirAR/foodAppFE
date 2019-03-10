import { Component, OnInit } from '@angular/core';

declare var google: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  title = 'Welcome to the food(ie) app!';
  map: any;
  mapPosition = {lat: 19.0760, lng: 72.8777};
  infoWindow: any;
  request: Object;
  service: any;
  restaurants = [];
  storeCoordinates = data => {
    console.log(data);
    this.mapPosition.lat = data.coords.latitude;
    this.mapPosition.lng = data.coords.longitude;
    this.infoWindow.open(this.map);
    this.map.setCenter(this.mapPosition);
    this.service = new google.maps.places.PlacesService(this.map);
    this.service.nearbySearch(this.request, this.callback);
  }
  errorHandler = error => {
    console.error(error);
    this.service = new google.maps.places.PlacesService(this.map);
    this.service.nearbySearch(this.request, this.callback);
  }
  initMap = () => {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.mapPosition,
      zoom: 12
    });
    this.infoWindow = new google.maps.InfoWindow;
  }
  callback = (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
    console.log(this.restaurants);
    this.map.setZoom(15);
  }
  createMarker = (place) => {
    this.restaurants.push(place);
    return new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: place.geometry.location,
        map: this.map,
        title: 'test'
    });
    // .addListener('click', this.toggleBounce);
  }

  getRestaurantDetails = () => {
    console.log('clicked!');
  }
  // toggleBounce = marker => {
  //   console.log(marker.wa.target);
  //   marker = marker.wa.target;

  //   if (marker.getAnimation() !== null) {
  //     marker.setAnimation(null);
  //   } else {
  //     marker.setAnimation(google.maps.Animation.BOUNCE);
  //   }
  // }
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.initMap();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.storeCoordinates,
        this.errorHandler,
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 });
    } else {
      this.service = new google.maps.places.PlacesService(this.map);
      this.service.nearbySearch(this.request, this.callback);
    }
    this.request = {
      location: this.mapPosition,
      radius: '500',
      type: ['restaurant']
    };
  }

}
