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

  @ViewChildren('column')
  column: QueryList<ElementRef>;
  
  @ViewChildren('main')
  main: QueryList<ElementRef>;

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

    this.column.forEach((th, index) => {
      this.renderer.setStyle(
        th.nativeElement, 
        'left', 
        `${e.x-100}px`
      );
    });

    
  }
  element = 1;

  onResizeStart(event, element) {
    this.element = element;
    this.mouseStart = event.x;
    this.isactive = true;

    this.column.forEach((th, index) => {
      this.renderer.setStyle(
        th.nativeElement, 
        'display', 
        `${'block'}`
      );
    });

    if(element == 1) {
      this.column.forEach((th, index) => {
        this.renderer.setStyle(
          th.nativeElement, 
          'left', 
          `${this.el1.map(th => th.nativeElement.offsetWidth)[0]}px`
        );
      });
  
    }
  }

  

  ngOnInit(): void {
    
  }
  mai:any;
  el1size:any;
  el2size:any;
  el3size:any;
  

  onResizeEnd(event) {
    this.column.forEach((th, index) => {
      this.renderer.setStyle(
        th.nativeElement, 
        'display', 
        `${'none'}`
      );
    });
    this.mai = this.main.map(th => th.nativeElement.offsetWidth)[0];
    this.el1size = (this.el1.map(th => th.nativeElement.offsetWidth)[0]/this.mai)*100;
    this.el2size = (this.el2.map(th => th.nativeElement.offsetWidth)[0]/this.mai)*100;
    this.el3size = (this.el3.map(th => th.nativeElement.offsetWidth)[0]/this.mai)*100;
    console.log(this.el1.map(th => th.nativeElement.offsetWidth)[0]);
    console.log(this.el2.map(th => th.nativeElement.offsetWidth)[0]);

    
    if(this.isactive) {
      let difference = ((this.mouseEnd - this.mouseStart)/this.mai)*100;
      this.isactive = false;

      if(this.element == 1) {
        
        this.el3.forEach((th, index) => {
          this.renderer.setStyle(
            th.nativeElement, 
            'width', 
            `${this.el3size}%`
          );
        });
       
          this.el1.forEach((th, index) => {
            this.renderer.setStyle(
              th.nativeElement, 
              'width', 
              `${this.el1size + difference}%`
            );
          });
        if((this.el2.map(th => th.nativeElement.offsetWidth)[0]-this.el1.map(th => th.nativeElement.offsetWidth)[0])<100) {
        
        }
        if((this.el1.map(th => th.nativeElement.offsetWidth)[0])<100) {
          this.el2.forEach((th, index) => {
            this.renderer.setStyle(
              th.nativeElement, 
              'width', 
              `${this.el2size - difference}%`
            );
          });
        }
        
      
        
      } else {
        this.el1.forEach((th, index) => {
          this.renderer.setStyle(
            th.nativeElement, 
            'width', 
            `${this.el1size}%`
          );
        });

        
        if((this.el1.map(th => th.nativeElement.offsetWidth)[0])>500) {
          this.el2.forEach((th, index) => {
            this.renderer.setStyle(
              th.nativeElement, 
              'width', 
              `${this.el2size+difference}%`
            );
          });
        }
      

        
          
        this.el3.forEach((th, index) => {
          this.renderer.setStyle(
            th.nativeElement, 
            'width', 
            `${this.el3size - difference}%`
          );
        });
        
        
      }
    }
  }
}
