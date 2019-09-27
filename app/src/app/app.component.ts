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
  
  constructor(private renderer: Renderer2) {};

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.mouseEnd = e.x;
  }
  element = 1;

  onResizeStart(event, element) {
    this.element = element;
    this.mouseStart = event.x;
    this.isactive = true;
  }

  onResizeEnd(event) {
    if(this.isactive) {
      let difference = this.mouseEnd - this.mouseStart;
      this.isactive = false;

      if(this.element == 1) {
        let widths = this.el1.map(th => th.nativeElement.offsetWidth);
        widths = difference + widths[0];
        this.el1.forEach((th, index) => {
          this.renderer.setStyle(
            th.nativeElement, 
            'width', 
            `${widths}px`
          );
        });
      } else {
        let widths = this.el2.map(th => th.nativeElement.offsetWidth);
        widths = difference + widths[0];
        this.el2.forEach((th, index) => {
          this.renderer.setStyle(
            th.nativeElement, 
            'width', 
            `${widths}px`
          );
        });
      }
    }
  }
}
