import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalyticTool } from '../../services/analytic_tool.service';
import { WindowRef } from '../../services/window_ref.service';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'comment-detail',
  templateUrl: './comment.detail.component.pug',
  styles: [require('./comment.detail.component.scss').toString()]
})
export class CommentDetailComponent { 
  @Input() comment: any;
  
  public deleting: boolean;
  public deleted: boolean;

  constructor(private analyticTool: AnalyticTool, private route: ActivatedRoute, private windowService: WindowRef, private commentsService: CommentsService) {
    this.deleting = false;
    this.deleted = false;
  }

  commentDate(){
    return new Date(this.comment.date);
  }

  commentOwner(){
    return [this.comment.user.first_name || "", this.comment.user.last_name || ""].join(" ");
  }

  deleteComment(commentId: any): void{
    if (this.windowService.nativeWindow.confirm("¿Está seguro? Está a punto de eliminar el comentario") ){
      this.deleting = true;
      this.commentsService.delete(commentId).then( (response: any) => {
        this.deleting = false;
        this.deleted  = true;
      });
    }
  }

}