import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { AnalyticTool } from '../../services/analytic_tool.service';
import { WindowRef } from '../../services/window_ref.service';
import { Case } from '../../models/case';
@Component({
  selector: 'cases',
  templateUrl: './cases.component.pug',
  styles: [require('./cases.component.scss').toString()]
})
export class CasesComponent implements OnInit { 

  private cases: any;
  private searching: boolean;
  private serverError: boolean;
  private search: any;

  constructor(private caseService: CasesService, private analyticTool: AnalyticTool, private windowService: WindowRef) {
    this.cases = [];
    this.search = {};
    this.serverError = false;
  }

  requestWithErrors(): boolean {
    return this.serverError;
  }

  isSearching(): boolean {
    return this.searching || false;
  }
  
  emptyResults(): boolean {
    return this.cases.length == 0 && !this.requestWithErrors();
  }

  searchCases(event: any): void {
    if(event){ event.preventDefault() }
    this.prepareSearch();
    this.analyticTool.trackEvent({eventCategory: 'Search cases'});
    this.caseService.all(this.search).then( (response) => {
      this.cases = (response.json().data || []).map( (element: any) =>  new Case(element) );
      this.searching = false;
    }).catch( () => {
      this.searching = true;
      this.serverError = true;
    });
  }

  prepareSearch(): void {
    this.searching   = true;
    this.serverError = false;
  }  

  deleteCase(caseId: any): void {
    if (this.windowService.nativeWindow.confirm("¿Está seguro? Está a punto de eliminar la pericia") ){
      this.prepareSearch();
      this.caseService.delete(caseId).then( (response: any) => {
        this.searchCases(new Event('Search'));
      }).catch( () => {
        this.searching = false;
        this.serverError = true;
      });
    }
  }

  ngOnInit(): void {
    this.searchCases(new Event('First load'));
  }  

}
