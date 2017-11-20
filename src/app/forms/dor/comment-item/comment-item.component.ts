import { FormData } from './../data/dor-form-data.model';
import { DORComment } from './../../../core/data-models/dor-comment.model';
import { Component, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() comment: DORComment;

  constructor() {}

  ngOnInit() {
  }

  getColor() {
    let bgColor;
    switch (this.comment.prefix) {
      case 0: {
        bgColor = '#fcbfbf';
        break;
      }
      case 1: {
        bgColor = '#ffffff';
        break;
      }
      case 2: {
        bgColor = '#8cea94';
        break;
      }
    }

    return bgColor;
  }

}
