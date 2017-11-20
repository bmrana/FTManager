import { DORCategory } from './../../../core/data-models/dor-category.model';
import { CannedComment } from './../data/CannedComment.model';
import { DORComment } from './../../../core/data-models/dor-comment.model';
import { DorService } from './../../../core/services/dor.service';
import { DorFormDataService } from './../data/dor-form-data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormData } from './../data/dor-form-data.model';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { DORRating } from './../../../core/data-models/dor-rating.model';
import { UsersService } from './../../../core/services/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dor-category-form',
  templateUrl: './dor-category-form.component.html',
  styleUrls: ['./dor-category-form.component.css']
})
export class DorCategoryFormComponent implements OnInit {
  
  title: string;
  description: string;
  ratings: DORRating[];
  comments: DORComment[];
  categories: DORCategory[];
  public dorForm: FormGroup;
  formbuilder: FormBuilder;
  dorData: FormData;
  currentPage: number;
  commentGroupVisible = false;
  remedialVisible = false;

  constructor(private lookups: DorService,
              private router: Router,
              private route: ActivatedRoute,
              private dorDataService: DorFormDataService) { }

  ngOnInit() {
    this.ratings = this.lookups.ratings;
    this.comments = this.lookups.comments;
    this.categories = this.lookups.categories;

    this.route.params
    .subscribe(
      (params: Params) => {
        this.currentPage = +params['id'];
        window.scrollTo(0, 0);
        this.dorData = this.dorDataService.getDorData();
        this.initForm();
      }
    );
  }

  onRatingSelected(value) {
    this.setVisibility(value);
  }

  setVisibility(value): boolean {
    if (+value === 99) {
      this.remedialVisible = false;
      this.commentGroupVisible = false;
    } else {
      this.commentGroupVisible = true;
      if (value < 4) {
        this.remedialVisible = true;
      } else {
        this.remedialVisible = false;
      }
    }
    return true;
  }

  initForm() {
    let rating = null;
    let otherComments = '';
    let remedial = null;
    let catComments: CannedComment[];
    let commentsArray = new FormArray([]);

    let category: DORCategory;
    category = this.categories.find(c => c.value === this.currentPage);
      this.title = category.name;
      this.description = category.description;

    const dorRating = this.dorData.dorRatings.find(r => r.catID === this.currentPage);
    const dorComments = this.dorData.dorComments.filter(r => r.catID === this.currentPage);
    rating = dorRating ? dorRating.rating : 99;
    this.setVisibility(rating);
    otherComments = dorRating ? dorRating.otherComments : '';
    remedial = dorRating ? dorRating.remedial : 0;
    catComments = dorComments ? dorComments : [];

    for (let comment of this.comments) {
      if (comment.categoryID === this.currentPage) {
        if (dorComments.find(c => c.commentID === comment.id  && c.selected === true)) {
          commentsArray.push(
            new FormGroup({
              'selected': new FormControl(true),
              'commentID': new FormControl(comment.id)
            })
          );
        } else {
          commentsArray.push(
            new FormGroup({
              'selected': new FormControl(false),
              'commentID': new FormControl(comment.id)
            })
          );
        }
      }
    }

    this.dorForm = new FormGroup({
      'rating': new FormControl(rating),
      'otherComments': new FormControl(otherComments),
      'remedial': new FormControl(remedial),
      'commentsArray': commentsArray
    });
  }

  save(): boolean {
    if (!this.dorForm.valid) {
      return false;
    }

    this.dorDataService.setDorCategories(this.dorForm.value, this.currentPage);
    return true;
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate(['../' + ++this.currentPage], { relativeTo: this.route });
    }
  }

  goToPrevious() {
    if (this.save()) {
      this.router.navigate(['../' + --this.currentPage], { relativeTo: this.route });
    }
  }
}
