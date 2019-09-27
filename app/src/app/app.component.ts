import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mouseStart = 0;
  mouseEnd = 0;
  isactive = false;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.mouseEnd = e.x;
  }

  onResizeStart(event) {
    this.mouseStart = event.x;
    this.isactive = true;
  }

  onResizeEnd(event) {
    if(this.isactive) {
      console.log(this.mouseEnd - this.mouseStart);
      this.isactive = false;
    }
  }
}
