import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  toolTipPosition = 'above';

  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event) {
    console.log('Scroll Event');
  }

  constructor() { }

  ngOnInit() {
  }

}
