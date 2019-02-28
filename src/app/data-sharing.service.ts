import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare var google;
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  // latlng = new google.maps.LatLng(39.305, -76.617);
  // map = new google.maps.Map(document.getElementById('map'), {
  //   center: this.latlng,
  //   zoom: 12
  // });
  // private mapSource = new BehaviorSubject<any>(this.map);
  // currentMap = this.mapSource.asObservable();
  // updateMap = (message: any) => this.mapSource.next(this.map);
  constructor() {
    console.log(document.getElementById('map'));
  }
}
