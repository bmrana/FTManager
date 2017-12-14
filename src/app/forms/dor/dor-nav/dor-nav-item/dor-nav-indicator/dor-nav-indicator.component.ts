import { CategoryRating } from './../../../data/categoryRating.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dor-nav-indicator',
  templateUrl: './dor-nav-indicator.component.html',
  styleUrls: ['./dor-nav-indicator.component.css']
})
export class DorNavIndicatorComponent implements OnInit {
  @Input() rating: CategoryRating;
  @Input() category: number;

  constructor() { }

  ngOnInit() {
  }

}
