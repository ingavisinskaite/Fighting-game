import { Component, OnInit, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  toolTipPosition = 'above';
  screenHeight: number;
  screenWidth: number;

  constructor(private viewportScroller: ViewportScroller) {
    //this.getScreenSize();
  }

  // @HostListener('mousemove', ['$event'])
  // onMouseMove(e) {
  //   let mousePosition = ((e.clientX / this.screenWidth) * 100);
  //   this.scroll(e.clientX, e.clientY);
  // }

  // @HostListener('window:resize', ['$event'])
  // getScreenSize(event?) {
  //   this.screenHeight = screen.height;
  //   this.screenWidth = screen.width;
  //   console.log(this.screenHeight);
  //   console.log(this.screenWidth);
  // }

  ngOnInit() {
  }

  scroll(x, y) {
    this.viewportScroller.scrollToPosition([x, y]);
  }

}
