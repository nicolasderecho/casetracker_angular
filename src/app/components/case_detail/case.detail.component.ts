import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasesService } from '../../services/cases.service';
import { AnalyticTool } from '../../services/analytic_tool.service';
import { Case } from '../../models/case';
import { Comment } from '../../models/comment';

@Component({
  selector: 'case-detail',
  templateUrl: './case.detail.component.pug',
  styles: [require('./case.detail.component.scss').toString()]
})
export class CaseDetailComponent implements OnInit, OnDestroy { 

  private case: any;
  private loading: boolean;
  private serverError: boolean;
  private subscription: any;
  private id: number;
  public  newComment: Comment;

  constructor(private caseService: CasesService, private analyticTool: AnalyticTool, private route: ActivatedRoute) {
    this.case = {};
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
      console.log(this);
      this.loading = false;
    }).catch( () => {
      this.loading = false;
      this.serverError = true;
    });
  }

  currentStatus(): string {
    if(this.case && this.case.currentStatus){
      return this.case.currentStatus();
    }
    else{
      return "";
    }
  }

  ngOnInit(): void {
    
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.newComment = new Comment({commentable_id: this.id, commentable_type: 'Case'});
      this.findCase();
    });

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  updateComments() :void {
    this.findCase();
  }

}