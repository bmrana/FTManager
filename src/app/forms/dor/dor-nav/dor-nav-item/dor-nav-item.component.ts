import { Router } from '@angular/router';
import { DORCategory } from './../../../../core/data-models/dor-category.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DorCategoryFormComponent } from '../../dor-category-form/dor-category-form.component';

@Component({
  selector: 'app-dor-nav-item',
  templateUrl: './dor-nav-item.component.html',
  styleUrls: ['./dor-nav-item.component.css']
})
export class DorNavItemComponent implements OnInit {
  @Input() category: DORCategory;
  link: string;

  constructor(private router: Router, private dorCatData: DorCategoryFormComponent) { }

  navigate() {
  }

  ngOnInit() {
    this.link = ':id/' + this.category.value.toString();
  }

}
