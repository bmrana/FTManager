import { AuthorizationService } from './../../core/services/authorization.service';
import { WebConnectServiceService } from './../../core/web-services/web-connect-service.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router/src/shared';
import { DorFormDataService } from '../../forms/dor/data/dor-form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  currentSection: string;
  authLevel = 0;
  subs: Subscription;
  constructor(private route: ActivatedRoute, private dorData: DorFormDataService, 
    private router: Router, private auth: AuthorizationService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentSection = params['section'];
        }
      );

     this.subs = this.auth.authorization
      .subscribe(
        (authLevel) => this.authLevel = authLevel
      );
      
  }

  onNew(section: string) {
    if (section === 'dors') {
      this.dorData.resetFormData();
      this.router.navigate(['/dor']);
    }
  }
}
