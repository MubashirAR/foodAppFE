import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { DataSharingService } from '../data-sharing.service';
import { BehaviorSubject } from 'rxjs';
declare var google;
@Component({
  selector: 'restaurant/[id=idname]',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss',  './resume.css']
})

export class RestaurantDetailsComponent {
  // map: any;
  route: ActivatedRoute;
  menu: Array<{name: string, items: Array<{name: string}>}>;
  item: {name: string};

  constructor(
    route: ActivatedRoute,
    ) {
      this.route = route; }

  ngAfterViewInit() {
    console.log("after init")
    var latlng = new google.maps.LatLng(39.305, -76.617);
    var map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 12
    });
    var  mapSource = new BehaviorSubject<any>(map);
    var currentMap = mapSource.asObservable();
    var updateMap = (message: any) => mapSource.next(map);

    this.menu = [
      {
        name: 'chinese',
        items: [
          {name: 'chowmen'},
          {name: 'fried rice'}
        ]
    },
    {
      name: 'Mughlai',
      items: [
        {name: 'mughlai rice'},
        {name: 'Biryani'}
      ]
    }
    ];
    currentMap.subscribe(map => map = map);
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      const placesService = new google.maps.places.PlacesService(map);
      console.log(placesService);
      placesService.getDetails(
        {placeId: id},
        function(results, status, err) {
            console.log(status);
            console.log(err);
        }
      );
  }

}
