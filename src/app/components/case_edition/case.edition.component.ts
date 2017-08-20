import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasesService } from '../../services/cases.service';
import { AnalyticTool } from '../../services/analytic_tool.service';
import { Case } from '../../models/case'

@Component({
  selector: 'case-edition',
  templateUrl: './case.edition.component.pug',
  styles: [require('./case.edition.component.scss').toString()]
})
export class CaseEditionComponent implements OnInit, OnDestroy { 

  private case: any;
  private loading: boolean;
  private serverError: boolean;
  private subscription: any;
  private id: number;

  constructor(private caseService: CasesService, private analyticTool: AnalyticTool, private route: ActivatedRoute) {
    this.loading = false;
    this.serverError = false;
  }

  requestWithErrors(): boolean {
    return this.serverError;
  }

  isLoading(): boolean {
    return this.loading;
  }
  
  findCase(): void {
    this.loading = true;
    this.analyticTool.trackEvent({eventCategory: 'Finding case'});
    this.caseService.find(this.id).then( (response) => {
      this.case = new Case(response.json().data || {});
      this.loading = false;
    }).catch( () => {
      this.loading = false;
      this.serverError = true;
    });
  }

  ngOnInit(): void {
    
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.findCase();
    });

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}