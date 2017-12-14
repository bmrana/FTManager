import { Router } from '@angular/router';
import { DORCategory } from './../../../../core/data-models/dor-category.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DorCategoryFormComponent } from '../../dor-category-form/dor-category-form.component';
import { DorFormDataService } from '../../data/dor-form-data.service';
import { CategoryRating } from '../../data/categoryRating.model';

@Component({
  selector: 'app-dor-nav-item',
  templateUrl: './dor-nav-item.component.html',
  styleUrls: ['./dor-nav-item.component.css']
})
export class DorNavItemComponent implements OnInit {
  @Input() category: DORCategory;
  @Input() ratings: CategoryRating[];
  link: string;

  constructor(private router: Router, private dorCatData: DorCategoryFormComponent, private dorData: DorFormDataService) { }

  navigate() {
    this.dorData.saveTrigger.next(1);
  }

  ngOnInit() {
    this.link = ':id/' + this.category.value.toString();
  }

}
