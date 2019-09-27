import { Component, HostListener, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mouseStart = 0;
  mouseEnd = 0;
  isactive = false;

  @ViewChildren('el1')
  el1: QueryList<ElementRef>;

  @ViewChildren('el2')
  el2: QueryList<ElementRef>;

  @ViewChildren('el3')
  el3: QueryList<ElementRef>;
  
  constructor(private renderer: Renderer2) {};

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.mouseEnd = e.x;
  }

  onResizeStart(event) {
    this.mouseStart = event.x;
    this.isactive = true;
  }

  onResizeEnd(event, element) {
    if(this.isactive) {
      let difference = this.mouseEnd - this.mouseStart;
      this.isactive = false;

      let widths = this.el1.map(th => th.nativeElement.offsetWidth);
      console.log(widths[0]);
      widths = difference + widths[0];
      this.el1.forEach((th, index) => {
        this.renderer.setStyle(
          th.nativeElement, 
          'width', 
          `${widths}px`
        );
      });
    }
  }
}
