import { Component ,EventEmitter,Output,OnInit} from '@angular/core';
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit{
  
  constructor(){

  }
  termino : string = '';

  debouncer :Subject<string> = new Subject();

  @Output() onEnter:EventEmitter<string> = new EventEmitter();
  @Output() onDebounce:EventEmitter<string> = new EventEmitter();

  buscar(){
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    this.debouncer.next(this.termino);
  }
  ngOnInit() {
    this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(valor=> {
      this.onDebounce.emit(valor);
    });
  }
 
}
