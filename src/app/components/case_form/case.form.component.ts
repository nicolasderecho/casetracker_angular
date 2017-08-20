import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { Router } from '@angular/router';

@Component({
  selector: 'document-form',
  templateUrl: './case.form.component.pug',
  styles: [require('./case.form.component.scss').toString()]
})
export class CaseFormComponent { 

  @Input() case: any;
  public submitted: boolean;
  public formErrors: any;
  public caseStatuses: any;

  constructor(private caseService: CasesService, private router: Router) {
    this.submitted = false;
    this.formErrors = {};
    this.caseStatuses = [{id: 'designation', text: 'Designación'},
                {id: 'removed_citation', text: 'Citación removida'},
                {id: 'in_test', text: 'En prueba'},
                {id: 'in_judgment', text: 'En juicio'},
                {id: 'waiting_payment', text: 'Por cobrar'}];
  }

  hasErrors(fieldName: string): boolean {
    return !!this.formErrors[fieldName];
  }

  onSubmit(form: any) {
    let methodName = this.case.id ? 'update' : 'create';
    this.submitted = true;
    this.caseService[methodName](form.value, this.case.id).then((response: any)=> {
      this.router.navigate(['/cases/' + response.json().data.id]);
    }).catch( (response: any) => {
      this.submitted = false;
      this.formErrors = response.json().data.errors;
    });
  }

}