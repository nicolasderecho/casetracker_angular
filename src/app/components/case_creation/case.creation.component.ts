import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CasesService } from '../../services/cases.service';

@Component({
  selector: 'case-creation',
  templateUrl: './case.creation.component.pug',
  styles: [require('./case.creation.component.scss').toString()]
})
export class CaseCreationComponent { 

  private case: any;

  constructor(private caseService: CasesService) {
    this.case = {};
  }

}