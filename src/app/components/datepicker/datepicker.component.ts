import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.pug',
  styles: [require('./datepicker.component.scss').toString()]
})
export class DatepickerComponent implements OnInit { 

  @Input() date: any;
  @Output() dateChange = new EventEmitter();
  @Input() formName: any;

  public es: any;

  constructor() {
  }

  ngOnInit(){
    this.es = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
        dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
        monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
        monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ]
    };    
  }

  updateDate(newDate: Date) {
    this.dateChange.emit(newDate);
  }

}