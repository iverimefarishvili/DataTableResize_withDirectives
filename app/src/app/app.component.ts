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
      index: 0,
      year:1991,
      model:'Volkswagen',
      color: 'Blue'
    },
    {
      index: 1,
      year: 1992,
      model:'Audi',
      color:'Red'
    },
    {
      index: 2,
      year:1993,
      model:'Volvo',
      color:'Yellow'
    },
    {
      index: 3,
      year:1995,
      model:'Renault',
      color:'Brown'
    },
    {
      index: 4,
      year: 1999,
      model:'Jaguar',
      color: 'Brown'
    },
    {
      index: 5,
      year: 1990,
      model: 'Renault',
      color: 'Brown'
    },
    {
      index: 6,
      year: 1965,
      model: 'Mercedes',
      color:'Brown'
    },
    {
      index: 7,
      year:1965,
      model: 'Mercedes',
      color: 'Brown'
    },
    {
      index:8,
      year:1993,
      model: 'Mercedes',
      color: 'Brown'
    }
  ]
  
  mouseStart = 0;
  mouseEnd = 0;
  isactive = false;
  isselect = false;

  @ViewChildren('body')
  body: QueryList<ElementRef>;

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

  length = this.state.length;

  onAdd() {
    this.state.push(
      {
        index: this.length ++,
        year:1993,
        model: 'Mercedes',
        color: 'Brown'
      }
    )
  }
  last: any;
  num = 1;

  @HostListener('document:keydown', ['$event'])
  @HostListener('document:keyup', ['$event'])
  
  onkeypress(event) {
    if(event.key == 'Control') {
      while(event.ctrlKey == true) {
        console.log("ragac")
      }
    }
  }
  
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

  move = false;
  movement = undefined;
  elem = undefined;
  starty: number;
  endy:number;
  currentindex:number;
  onmove(event, element) {
    this.starty = event.y;
    this.move = true;
    this.body.map(el => {
      this.elem = el.nativeElement.children[element.index+1]
      this.currentindex = element.index;
    })
    this.elem.style.position = 'absolute'
    this.elem.style.width = '100 %'
    
    
  }

  moved(event, element) {
    
    //this.array_move(this.state, this.currentindex , Math.round(event.y-this.starty)/26);
    //console.log(this.elem.index, Math.round((event.y-this.starty)/26))
    //console.log(this.currentindex)
    this.elem.style = 'inline-block'
    this.array_move(this.state, this.currentindex , element.index);
    console.log(element.index)
    this.move = false;
    
  }



  array_move(arr, old_index, new_index) {
    new_index =((new_index % arr.length) + arr.length) % arr.length;
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    let i = 0;
    arr.map(el => {
      el.index = i++;
    })
    console.log(arr)
    return arr;
  }



  
  @HostListener('document:mousemove', ['$event'])
  MouseMove(element) {
    this.movement = element.y;
    if(this.move == true) {
      //this.elem.style.top = element.y;
      //console.log(element.y)
      //this.elem.forEach((th, index) => {
        this.renderer.setStyle(
          this.elem, 
          'top', 
          `${element.y-70}px`
        );
      //}); 
      
      //console.log(element.y)
    }
  }

}
