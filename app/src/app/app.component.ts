import { Component, HostListener, ViewChildren, QueryList, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Model} from './model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit{
  ngOnInit() {
    this.newstate = this.state;
  }
  
  newstate: any;
  state = [
    {
      year:1991,
      model:'Volkswagen',
      color: 'Blue'
    },
    {
      year: 1992,
      model:'Audi',
      color:'Red'
    },
    {
      year:1993,
      model:'Volvo',
      color:'Yellow'
    },
    {
      year:1995,
      model:'Renault',
      color:'Brown'
    },
    {
      year: 1999,
      model:'Jaguar',
      color: 'Brown'
    },
    {
      year: 1990,
      model: 'Renault',
      color: 'Brown'
    },
    {
      year: 1965,
      model: 'Mercedes',
      color:'Brown'
    },
    {
      year:1965,
      model: 'Mercedes',
      color: 'Brown'
    },
    {
      year:1993,
      model: 'Mercedes',
      color: 'Brown'
    }
  ]
  
  mouseStart = 0;
  mouseEnd = 0;
  isactive = false;
  isselect = false;


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
        `${e.x-120}px`
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



  onAdd() {
    this.state.push(
      {
        year:1993,
        model: 'Mercedes',
        color: 'Brown'
      }
    )
  }
  last: any;
  num = 1;
  onSelect(element) {
    if(this.num!=1 && this.last!=element) {
      this.last.isselect = false;
    }
    this.num++ 
    
    element.isselect = !element.isselect;
    this.last = element;
  }

  issort = false;

  sortbyyear(el) {
    el.issort = !el.issort;
    
      
      
      if(el.issort){
      this.newstate = this.state.sort((a,b) => {
        if(a.year>b.year){
          return 1;
        }
        if(a.year<b.year) {
          return -1;
        }
        return 0;
      })
    }else {
      this.newstate = this.state.sort((a,b) => {
        if(a.year<b.year){
          return 1;
        }
        if(a.year>b.year) {
          return -1;
        }
        return 0;
      })
    }
  }
    

    
  

  sortbymodel(el) {
    el.issort = !el.issort;
    if(el.issort) {
      this.newstate = this.state.sort((a,b) => {
        const e1 = a.model.toLowerCase();
        const e2 = b.model.toLowerCase();
        if(e1>e2){
          return 1;
        }
        if(e1<e2) {
          return -1;
        }
        return 0;
      })
    }else {
      this.newstate = this.state.sort((a,b) => {
        const e1 = a.model.toLowerCase();
        const e2 = b.model.toLowerCase();
        if(e1<e2){
          return 1;
        }
        if(e1>e2) {
          return -1;
        }
        return 0;
      })
    }
      
      
  }
    
  
  sortbycolor(el) {
    el.issort = !el.issort;
    if(el.issort){
      this.newstate = this.state.sort((a,b) => {
        const e1 = a.color.toLowerCase();
        const e2 = b.color.toLowerCase();
        if(e1>e2){
          return 1;
        }
        if(e1<e2) {
          return -1;
        }
        return 0;
      })
    }else {
      this.newstate = this.state.sort((a,b) => {
        const e1 = a.color.toLowerCase();
        const e2 = b.color.toLowerCase();
        if(e1<e2){
          return 1;
        }
        if(e1>e2) {
          return -1;
        }
        return 0;
      })
    }
  }

}
