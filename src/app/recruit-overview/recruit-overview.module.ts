import { ApplicationPipesModule } from './../core/pipes/application-pipes.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverviewService } from './overview.service';
import { OverviewResolverService } from './overview-resolver.service';
import { RecruitOverviewSelectorComponent } from './recruit-overview-selector/recruit-overview-selector.component';
import { RecruitOverviewInfobarComponent } from './recruit-overview-infobar/recruit-overview-infobar.component';
import { DorBadgeBoxComponent } from './dor-badge-box/dor-badge-box.component';
import { RecruitOverviewDetailComponent } from './recruit-overview-detail/recruit-overview-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ApplicationPipesModule
  ],
  exports: [
    RecruitOverviewInfobarComponent,
    RecruitOverviewDetailComponent,
    RecruitOverviewSelectorComponent
  ],
  declarations: [
    RecruitOverviewSelectorComponent,
    RecruitOverviewInfobarComponent,
    DorBadgeBoxComponent,
    RecruitOverviewDetailComponent,
  ],
  providers: [
    OverviewService,
    OverviewResolverService
  ]
})
export class RecruitOverviewModule { }
