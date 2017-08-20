import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'comment-form',
  templateUrl: './comment.form.component.pug',
  styles: [require('./comment.form.component.scss').toString()]
})
export class CommentFormComponent implements OnInit { 

  @Input() object: any;
  @Output() created = new EventEmitter();
  public submitted: boolean;
  public formErrors: any;
  public caseStatuses: any;
  public comment: any;

  constructor(private commentService: CommentsService, private router: Router) {
    this.submitted = false;
    this.formErrors = {};
  }

  hasErrors(fieldName: string): boolean {
    return !!this.formErrors[fieldName];
  }

  buildComment(){
    this.comment = { ...(this.object || {}) } ;
  }

  ngOnInit(){
    this.buildComment();
  }

  onSubmit(form: any) {
    let methodName = this.comment.id ? 'update' : 'create';
    this.submitted = true;
    this.commentService[methodName](form.value, this.comment.id).then((response: any)=> {
      this.submitted = false;
      this.buildComment();
      this.formErrors = {};
      this.created.emit();
      //this.router.navigate(['/cases/' + response.json().data.id]);
    }).catch( (response: any) => {
      this.submitted = false;
      this.formErrors = response.json().data.errors;
    });
  }

}