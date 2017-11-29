import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router/src/shared';
import { DorFormDataService } from '../../forms/dor/data/dor-form-data.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  currentSection: string;

  constructor(private route: ActivatedRoute, private dorData: DorFormDataService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentSection = params['section'];
        }
      );
  }

  onNew(section: string) {
    if (section === 'dors') {
      this.dorData.resetFormData();
    }
  }
}
